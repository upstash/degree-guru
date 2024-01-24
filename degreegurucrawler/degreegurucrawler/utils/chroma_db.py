import chromadb
from chromadb.utils.embedding_functions import OpenAIEmbeddingFunction

from .config import client_config, embedding_function_config, config

client = chromadb.HttpClient(**client_config)
embedding_function = OpenAIEmbeddingFunction(**embedding_function_config)

try:
    collection = client.create_collection(
        name=config["index"]["collection_name"],
        embedding_function=embedding_function
    )
except:
    collection = client.get_collection(
        name=config["index"]["collection_name"],
        embedding_function=embedding_function
    )
