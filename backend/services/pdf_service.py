import re
from pathlib import Path
from typing import Any

import fitz

MAX_CHUNK_SIZE = 1000


def normalize_pdf_text(raw_text: str) -> str:
    text = raw_text.replace('\r\n', '\n').replace('\r', '\n')
    text = text.replace('\u00a0', ' ')

    text = re.sub(r'(?m)^\s*\d+\s*$', '', text)
    text = re.sub(r'(?im)^(?:chapter|section|notes|summary|copyright|page)\s*[:\-]?\s*.*$', '', text)
    text = re.sub(r'(?im)^(?:[A-Z0-9][A-Za-z0-9\'’&.,:;()\- ]{0,40})\s{2,}\d{1,3}\s*$', '', text)
    text = re.sub(r'(?m)^\s*[_•●◦*#-]+\s*$', '', text)
    text = re.sub(r'(\w)-\s*\n\s*(\w)', r'\1\2', text)
    text = re.sub(r'(?<=\w)-\s*\n\s*(?=\w)', '', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'[ \t]+\n', '\n', text)
    text = re.sub(r'\n[ \t]+', '\n', text)
    text = re.sub(r'\s+([,.;:!?])', r'\1', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def chunk_text_preserving_sentences(text: str, max_chars: int = MAX_CHUNK_SIZE) -> list[str]:
    if not text:
        return []

    cleaned = re.sub(r'\s+', ' ', text).strip()
    sentences = re.split(r'(?<=[.!?])\s+', cleaned)

    chunks: list[str] = []
    current = ''

    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue

        if not current:
            current = sentence
            continue

        if len(current) + 1 + len(sentence) <= max_chars:
            current = f'{current} {sentence}'
        else:
            chunks.append(current.strip())
            current = sentence

    if current.strip():
        chunks.append(current.strip())

    return [chunk for chunk in chunks if chunk]


def extract_and_clean_pdf(file_bytes: bytes) -> dict[str, Any]:
    doc = fitz.open(stream=file_bytes, filetype='pdf')

    chunks: list[dict[str, str | int]] = []
    page_count = doc.page_count

    for page_index in range(page_count):
        raw_text = doc[page_index].get_text('text')
        clean_text = normalize_pdf_text(raw_text)
        if not clean_text:
            continue

        segments = [segment.strip() for segment in re.split(r'\n{2,}', clean_text) if segment.strip()]
        for segment in segments:
            for chunk_text in chunk_text_preserving_sentences(segment):
                chunks.append({'id': len(chunks) + 1, 'text': chunk_text})

    doc.close()

    if not chunks:
        chunks.append({'id': 1, 'text': 'No readable text was detected in this PDF.'})

    return {
        'total_pages': page_count,
        'total_chunks': len(chunks),
        'chunks': chunks,
    }


class PDFService:
    def __init__(self, storage_dir: str = './uploads') -> None:
        self.storage_dir = Path(storage_dir)
        self.storage_dir.mkdir(exist_ok=True, parents=True)

    def clean_text(self, text: str) -> str:
        return normalize_pdf_text(text)

    def parse_pdf(self, file_bytes: bytes) -> list[dict[str, Any]]:
        result = extract_and_clean_pdf(file_bytes)
        return [{
            'id': f'chapter-{index + 1}',
            'title': f'Chapter {index + 1}',
            'paragraphs': [chunk['text'] for chunk in result['chunks'][index:index + 1]],
            'pages': 1,
            'status': 'ready'
        } for index in range(len(result['chunks']))]

    def extract_and_clean_pdf(self, file_bytes: bytes) -> dict[str, Any]:
        return extract_and_clean_pdf(file_bytes)
