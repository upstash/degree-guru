from typing import List
from langchain.text_splitter import RecursiveCharacterTextSplitter

class LinkInjectingTextSplitter(RecursiveCharacterTextSplitter):

    def _inject_link(self, chunk: str, link: str) -> str:
        return f"Source Link: ${link}$, {chunk}"

    def split_text(self, text: str, link: str) -> List[str]:
        chunks = self._split_text(text, self._separators)
        return [self._inject_link(chunk, link) for chunk in chunks]
