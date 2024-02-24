from typing import List
from openai import OpenAI
from upstash_vector import Index

class UpstashVectorStore:

    def __init__(
            self,
            url: str,
            token: str
    ):
        self.client = OpenAI()
        self.index = Index(url=url, token=token)

    def get_embeddings(
            self,
            documents: List[str],
            model: str = "text-embedding-ada-002"
    ) -> List[List[float]]:
        """
        Given a list of documents, generates and returns a list of embeddings
        """
        documents = [document.replace("\n", " ") for document in documents]
        embeddings = self.client.embeddings.create(
            input = documents,
            model=model
        )
        return [data.embedding for data in embeddings.data]

    def add(
            self,
            ids: List[str],
            documents: List[str],
            link: str
    ) -> None:
        """
        Adds a list of documents to the Upstash Vector Store
        """
        embeddings = self.get_embeddings(documents)
        self.index.upsert(
            vectors=[
                (
                    id,
                    embedding,
                    {
                        "text": document,
                        "url": link
                    }
                )
                for id, embedding, document
                in zip(ids, embeddings, documents)
            ]
        )
