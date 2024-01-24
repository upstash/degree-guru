export class UpstashVectorStore extends VectorStore {
    constructor(embeddings: any);
    index: Index;
    similaritySearchVectorWithScore(query: any, k: any, filter: any): Promise<any[][]>;
}
import { VectorStore } from "@langchain/core/vectorstores";
import { Index } from "@upstash/vector";
