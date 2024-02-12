import { UpstashVectorStore } from "../vectorstore/UpstashVectorStore";
import { OpenAIEmbeddings } from "@langchain/openai";

export class VectorStoreError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VectorStoreError";
  }
}

export function createVectorStore(vectorStoreChoice: string): UpstashVectorStore {
  let vectorUrl: string | undefined;
  let vectorToken: string | undefined;

  switch (vectorStoreChoice) {
    case "MIT":
      vectorUrl = process.env.UPSTASH_VECTOR_REST_URL_MIT;
      vectorToken = process.env.UPSTASH_VECTOR_REST_TOKEN_MIT;
      break;
    case "Stanford":
      vectorUrl = process.env.UPSTASH_VECTOR_REST_URL_STANFORD;
      vectorToken = process.env.UPSTASH_VECTOR_REST_TOKEN_STANFORD;
      break;
    case "Harvard":
      vectorUrl = process.env.UPSTASH_VECTOR_REST_URL_HARVARD;
      vectorToken = process.env.UPSTASH_VECTOR_REST_TOKEN_HARVARD;
      break;
    default:
      throw new VectorStoreError(`Invalid vector store choice: ${vectorStoreChoice}`);
  }

  if (!vectorUrl || !vectorToken) {
    throw new Error(`Missing environment variables for vector store: ${vectorStoreChoice}`);
  }

  return new UpstashVectorStore(new OpenAIEmbeddings(), vectorUrl, vectorToken);
}
