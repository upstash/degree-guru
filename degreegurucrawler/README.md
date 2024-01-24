To run the crawler, first set the `OPENAI_API_KEY` environment variable. Then run:
```
scrapy crawl configurable --logfile degreegurucrawl.log
```

To run the chrome db server locally:

```
chroma run --path ./degreegurudb
```