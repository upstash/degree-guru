
FROM python:3.8-slim

# copy directory into dockerfile
COPY . crawler
WORKDIR crawler

# install requirements
RUN pip install -r requirements.txt

CMD ["scrapy", "crawl", "configurable"]
