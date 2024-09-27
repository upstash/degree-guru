import { NextRequest, NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { AIMessage, ChatMessage, HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createRetrieverTool } from "langchain/tools/retriever";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

import { UpstashVectorStore } from "@/app/vectorstore/UpstashVectorStore";

export const runtime = "edge";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, "10 s"),
});

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};

export async function POST(req: NextRequest) {
  try {
    const ip = req.ip ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      const textEncoder = new TextEncoder();
      const customString =
        "Oops! It seems you've reached the rate limit. Please try again later.";

      const transformStream = new ReadableStream({
        async start(controller) {
          controller.enqueue(textEncoder.encode(customString));
          controller.close();
        },
      });
      return new StreamingTextResponse(transformStream);
    }

    const body = await req.json();

    /**
     * We represent intermediate steps as system messages for display purposes,
     * but don't want them in the chat history.
     */
    const messages = (body.messages ?? []).filter(
      (message: VercelChatMessage) =>
        message.role === "user" || message.role === "assistant",
    );
    const returnIntermediateSteps = false;
    const previousMessages = messages
      .slice(0, -1)
      .map(convertVercelMessageToLangChainMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    const chatModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo-1106",
      temperature: 0.2,
      // IMPORTANT: Must "streaming: true" on OpenAI to enable final output streaming below.
      streaming: true,
    }, {
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION
    });

    /**
     * Create vector store and retriever
     */
    const vectorstore = await new UpstashVectorStore(new OpenAIEmbeddings());
    const retriever = vectorstore.asRetriever(
      {
        k: 6,
        searchType: "mmr",
        searchKwargs: {
          fetchK: 20,
          lambda: 0.5
        },
        verbose: false
      },
    );

    /**
     * Wrap the retriever in a tool to present it to the agent in a
     * usable form.
     */
    const tool = createRetrieverTool(retriever, {
      name: "search_latest_knowledge",
      description: "Searches and returns up-to-date general information.",
    });

    /**
     * Based on https://smith.langchain.com/hub/hwchase17/openai-functions-agent
     *
     * This default prompt for the OpenAI functions agent has a placeholder
     * where chat messages get inserted as "chat_history".
     *
     * You can customize this prompt yourself!
     */

    const AGENT_SYSTEM_TEMPLATE = `
    You are an artificial intelligence university bot named DegreeGuru, programmed to respond to inquiries about Stanford in a highly systematic and data-driven manner.

    Begin your answers with a formal greeting and sign off with a closing statement about promoting knowledge.

    Your responses should be precise and factual, with an emphasis on using the context provided and providing links from the context whenever posible. If some link does not look like it belongs to stanford, don't use the link and the information in your response.

    Don't repeat yourself in your responses even if some information is repeated in the context.
    
    Reply with apologies and tell the user that you don't know the answer only when you are faced with a question whose answer is not available in the context.
    `;

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", AGENT_SYSTEM_TEMPLATE],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
      new MessagesPlaceholder("agent_scratchpad"),
    ]);

    const agent = await createOpenAIFunctionsAgent({
      llm: chatModel,
      tools: [tool],
      prompt,
    });

    const agentExecutor = new AgentExecutor({
      agent,
      tools: [tool],
      // Set this if you want to receive all intermediate steps in the output of .invoke().
      returnIntermediateSteps,
    });

    if (!returnIntermediateSteps) {
      /**
       * Agent executors also allow you to stream back all generated tokens and steps
       * from their runs.
       *
       * This contains a lot of data, so we do some filtering of the generated log chunks
       * and only stream back the final response.
       *
       * This filtering is easiest with the OpenAI functions or tools agents, since final outputs
       * are log chunk values from the model that contain a string instead of a function call object.
       *
       * See: https://js.langchain.com/docs/modules/agents/how_to/streaming#streaming-tokens
       */
      const logStream = await agentExecutor.streamLog({
        input: currentMessageContent,
        chat_history: previousMessages,
      });

      const textEncoder = new TextEncoder();
      const transformStream = new ReadableStream({
        async start(controller) {
          for await (const chunk of logStream) {
            if (chunk.ops?.length > 0 && chunk.ops[0].op === "add") {
              const addOp = chunk.ops[0];
              if (
                addOp.path.startsWith("/logs/ChatOpenAI") &&
                typeof addOp.value === "string" &&
                addOp.value.length
              ) {
                controller.enqueue(textEncoder.encode(addOp.value));
              }
            }
          }
          controller.close();
        },
      });

      return new StreamingTextResponse(transformStream);
    } else {
      /**
       * Intermediate steps are the default outputs with the executor's `.stream()` method.
       * We could also pick them out from `streamLog` chunks.
       * They are generated as JSON objects, so streaming them is a bit more complicated.
       */
      const result = await agentExecutor.invoke({
        input: currentMessageContent,
        chat_history: previousMessages,
      });

      const urls = JSON.parse(
        `[${result.intermediateSteps[0]?.observation.replaceAll("}\n\n{", "}, {")}]`,
      ).map((source: { url: any }) => source.url);

      return NextResponse.json(
        {
          _no_streaming_response_: true,
          output: result.output,
          sources: urls,
        },
        { status: 200 },
      );
    }
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
