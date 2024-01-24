
import uuid
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

from ..utils.config import config, text_splitter_config
from ..utils.text_splitter import LinkInjectingTextSplitter
from ..utils.db import collection

text_splitter = LinkInjectingTextSplitter(**text_splitter_config)

class ConfigurableCrawler(CrawlSpider):

    name = "configurable"
    start_urls = config["crawler"]["start_urls"]
    rules = (Rule(
        LinkExtractor(
            **config["crawler"]["link_extractor"]
        ),
        callback="parse_page"
    ),)

    def parse_page(self, response):

        # extract text content
        text_content = response.xpath('//p').getall()
        text_content = '\n'.join(text_content)

        link = response.url
        documents = text_splitter.split_text(text_content, link)

        if len(documents) == 0:
            return

        collection.add(
            ids=[str(uuid.uuid4())[:8] for doc in documents],
            documents = documents,
        )
