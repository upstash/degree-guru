"use server";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Message as VercelChatMessage } from "ai";
import { Redis } from "@upstash/redis"
import { Index } from "@upstash/vector";
import { RAGChat, openai } from "@upstash/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";

const redis = Redis.fromEnv()

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, "10 s"),
});

const ragChat = new RAGChat({
  ratelimit,
  debug: false,
  model: openai("gpt-3.5-turbo", { organization: process.env.OPENAI_ORGANIZATION }),
  vector: new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  }),
  redis,
  promptFn: ({ question, chatHistory, context }) => `
You are an artificial intelligence university bot named DegreeGuru, programmed to respond to inquiries about Stanford in a highly systematic and data-driven manner.

Begin your answers with a formal greeting and sign off with a closing statement about promoting knowledge.

Your responses should be precise and factual, with an emphasis on using the context provided and providing links from the context whenever posible. If some link does not look like it belongs to stanford, don't use the link and the information in your response.

Don't repeat yourself in your responses even if some information is repeated in the context.

Reply with apologies and tell the user that you don't know the answer only when you are faced with a question whose answer is not available in the context.

---
chat history:
${chatHistory}
---
context:
${context}
---
question:
${question}
`,
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.ip ?? "127.0.0.1";

    const body = await req.json() as {messages: VercelChatMessage[]};
    const question = body.messages.at(-1)

    if (!question) {
      return new NextResponse("question not found", {status: 400})
    }

    const response = await ragChat.chat(question.content,
      {
        streaming: true,
        onContextFetched: (context) => {
          const result = context.map(contextBit => {
            const metadata = contextBit.metadata as { url: string }
            return {
              id: contextBit.id,
              data: JSON.stringify({
                text: contextBit.data,
                url: metadata.url
              }),
              metadata: contextBit.metadata
            }
          })
          return result
        }
      }
    );

    return aiUseChatAdapter(response);

  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
