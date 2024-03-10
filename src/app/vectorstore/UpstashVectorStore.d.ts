import { Index } from "@upstash/vector";
import { Document } from "@langchain/core/documents";
import {
  MaxMarginalRelevanceSearchOptions,
  VectorStore,
} from "@langchain/core/vectorstores";


type UpstashMetadata = Record<string, any>;


export class UpstashVectorStore extends VectorStore {
  declare FilterType: PineconeMetadata;

  constructor(embeddings: any);
  index: Index;
  similaritySearchVectorWithScore(
    query: any,
    k: any,
    filter: any,
  ): Promise<any[][]>;

  maxMarginalRelevanceSearch(
    query: string,
    options: MaxMarginalRelevanceSearchOptions<this["FilterType"]>
  ): Promise<Document[]>
}
