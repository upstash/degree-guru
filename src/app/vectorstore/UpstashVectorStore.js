import { VectorStore } from "@langchain/core/vectorstores";
import { Document } from "@langchain/core/documents";
import { Index } from "@upstash/vector";
import { maximalMarginalRelevance } from "@langchain/core/utils/math";


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
      includeVectors: false,
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

  async maxMarginalRelevanceSearch(query, options) {
    const queryEmbedding = await this.embeddings.embedQuery(query);
    const result = await this.index.query({
      vector: queryEmbedding,
      topK: options.fetchK ?? 20,
      includeVectors: true,
      includeMetadata: true,
    });
    const embeddingList = result.map((r) => r.vector)

    const mmrIndexes = maximalMarginalRelevance(
      queryEmbedding,
      embeddingList,
      options.lambda,
      options.k
    );
    const topMmrMatches = mmrIndexes.map((idx) => result[idx]);

    const results = [];
    for (let i = 0; i < topMmrMatches.length; i++) {
      results.push(
        new Document({
          pageContent: JSON.stringify(topMmrMatches[i]?.metadata) || "",
        }),
      );
    }

    return results;
  }
}
