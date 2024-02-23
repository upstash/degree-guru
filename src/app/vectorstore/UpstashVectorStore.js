import { VectorStore } from "@langchain/core/vectorstores";
import { Document } from "@langchain/core/documents";
import { Index } from "@upstash/vector";

export class UpstashVectorStore extends VectorStore {
  _vectorstoreType() {
    return "upstash";
  }

  constructor(embeddings) {
    super(embeddings);

    this.index = new Index({
      url: process.env.UPSTASH_VECTOR_URL,
      token: process.env.UPSTASH_VECTOR_TOKEN,
    });
  }

  async similaritySearchVectorWithScore(query, k, filter) {
    const result = await this.index.query({
      vector: query,
      topK: k,
      includeVectors: true,
      includeMetadata: true,
    });

    const results = [];
    for (let i = 0; i < result.length; i++) {
      results.push([
        new Document({
          pageContent: JSON.stringify(result[i]?.metadata) || "",
        }),
      ]);
    }

    return results;
  }
}
