import os
import uuid
from typing import List
from upstash_vector import Index

from openai import OpenAI
client = OpenAI()

def get_embeddings(
        documents: List[str],
        model: str = "text-embedding-ada-002"
):
    documents = [document.replace("\n", " ") for document in documents]
    embeddings = client.embeddings.create(input = documents, model=model)
    return [data.embedding for data in embeddings.data]

import pdb; pdb.set_trace()
class UpstashCollection:

    def __init__(
            self,
            url: str,
            token: str
    ):
        self.index = Index(url=url, token=token)

    def add(
        self,
        ids: List[str],
        documents: List[str]
    ):
        embeddings = get_embeddings(documents)
        self.index.upsert(
            vectors=[
                (
                    id,
                    embedding,
                    {
                        "text": document
                    }
                )
                for id, embedding, document
                in zip(ids, embeddings, documents)
            ]
        )

collection = UpstashCollection(
    url=os.environ["UPSTASH_VECTOR_REST_URL"],
    token=os.environ["UPSTASH_VECTOR_REST_TOKEN"]
)
