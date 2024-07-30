"use server";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Message as VercelChatMessage } from "ai";
import { Redis } from "@upstash/redis"
import { Index } from "@upstash/vector";
import { PrepareChatResult, RAGChat, upstash } from "@upstash/rag-chat/base/index.mjs";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs/rsc-server.mjs";

const redis = new Redis({
  url: 'https://fit-moth-42559.upstash.io',
  token: 'AaY_AAIncDFhMWUwNjViNDEyNTM0NzFkYjJlMmRkMTBkN2Y2ODZhNXAxNDI1NTk',
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, "10 s"),
});

const ragChat = new RAGChat({
  ratelimit,
  debug: true,
  model: upstash("mistralai/Mistral-7B-Instruct-v0.2", {apiKey: "eyJVc2VySUQiOiIwZDk3MTgxMC1kNDBlLTRhYWUtOTkyNi03ZjU2YWI2YzFhNzEiLCJQYXNzd29yZCI6Ijk0NTM1NGZiZDY5MDRkNTI5OWRkYTE3OGI0YWIyNWI3In0="}),
  vector: new Index({
    url: "https://thankful-gorilla-71414-eu1-vector.upstash.io",
    token: "ABoFMHRoYW5rZnVsLWdvcmlsbGEtNzE0MTQtZXUxYWRtaW5PVFUxTkROaU5UQXRPRE5qTWkwMFltSTFMVGt6TVRVdFpqQTRZakJoTnpRd01XSXo=",
  }),
  redis,
  prompt: ({ question, chatHistory, context }) => `
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
        onContextFetched: (context: PrepareChatResult["context"]) => {
          const result: PrepareChatResult["context"] = context.map(contextBit => {
            return {
              id: contextBit.id,
              data: JSON.stringify({
                text: contextBit.data,
                url: contextBit.metadata.url
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
