
import uuid
import logging

from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

from langchain.text_splitter import RecursiveCharacterTextSplitter

from ..utils.config import config, text_splitter_config
from ..utils.db import collection

text_splitter = RecursiveCharacterTextSplitter(**text_splitter_config)


class ConfigurableCrawler(CrawlSpider):

    def __init__(self, *a, **kw):
        super().__init__(*a, **kw)
        
        disable_loggers = [
            "scrapy.spidermiddlewares.depth",
            "protego",
            "httpcore.http11",
            "httpx",
            "openai._base_client",
            "urllib3.connectionpool"
        ]
        for logger in disable_loggers:
            logging.getLogger(logger).setLevel(logging.WARNING)

    name = "configurable"
    start_urls = config["crawler"]["start_urls"]
    rules = (Rule(
        LinkExtractor(
            **config["crawler"]["link_extractor"]
        ),
        callback="parse_page",
        follow=True # to enable following links on each page when callback is provided
    ),)

    def parse_page(self, response):

        # extract text content
        text_content = response.xpath('//p').getall()
        text_content = '\n'.join(text_content)

        link = response.url
        documents = text_splitter.split_text(text_content)

        if len(documents) == 0:
            return

        collection.add(
            ids=[str(uuid.uuid4())[:8] for doc in documents],
            documents=documents,
            link=link
        )
