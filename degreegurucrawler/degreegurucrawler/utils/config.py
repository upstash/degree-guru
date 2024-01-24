import os
import yaml

config_path = "degreegurucrawler/utils/crawler.yaml"
with open(config_path, 'r') as file:
    config = yaml.load(file, Loader=yaml.FullLoader)

client_config = config["index"]["chroma_client"]
embedding_function_config = {
    "api_key": os.environ.get('OPENAI_API_KEY'),
    "model_name": config["index"]["openAI_embedding_model"]
}

crawler_config = config["crawler"]
text_splitter_config = config["index"]["text_splitter"]
