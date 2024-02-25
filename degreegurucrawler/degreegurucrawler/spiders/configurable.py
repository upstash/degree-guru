
import os
import uuid
import logging

from ..utils.upstash_vector_store import UpstashVectorStore
from ..utils.config import text_splitter_config, crawler_config

from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

from langchain.text_splitter import RecursiveCharacterTextSplitter


class ConfigurableSpider(CrawlSpider):

    name = "configurable"
    start_urls = crawler_config["start_urls"]
    rules = (
        Rule(
            LinkExtractor(
                **crawler_config["link_extractor"]
            ),
            callback="parse_page",
            follow=True # to enable following links on each page when callback is provided
        ),
    )

    def __init__(self, *a, **kw):
        super().__init__(*a, **kw)

        self.vectorstore = UpstashVectorStore(
            url=os.environ.get("UPSTASH_VECTOR_REST_URL"),
            token=os.environ.get("UPSTASH_VECTOR_REST_TOKEN")
        )

        print(
            f"Creating a vector index at {os.environ.get('UPSTASH_VECTOR_REST_URL')}.\n"
            f" Vector store info before crawl: {self.vectorstore.index.info()}"
        )

        self.text_splitter = RecursiveCharacterTextSplitter(
            **text_splitter_config
        )

        self._disable_loggers()

    def _disable_loggers(self):
        """
        disables some of the loggers to keep the log clean
        """

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

    def parse_page(self, response):
        """
        Creates chunks out of the crawled webpage and adds them to the vector
        store.
        """

        # extract text content
        text_content = response.xpath('//p').getall()
        text_content = '\n'.join(text_content)

        # split documents
        documents = self.text_splitter.split_text(text_content)

        if len(documents) == 0:
            return

        # get source url
        link = response.url

        # add documents to vector store
        self.vectorstore.add(
            ids=[str(uuid.uuid4())[:8] for doc in documents],
            documents=documents,
            link=link
        )
