import fitz  # PyMuPDF
import re
from pathlib import Path
from typing import Dict, Any


def clean_text(text: str) -> str:
    # Rejoin hyphenated words across line breaks
    text = re.sub(r'(\w+)-\n(\w+)', r'\1\2', text)
    # Replace multiple whitespace/newlines with a single space
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def extract_and_clean_pdf(file_bytes: bytes, max_chunk_length: int = 800) -> Dict:
    doc = fitz.open(stream=file_bytes, filetype='pdf')
    total_pages = len(doc)
    full_text = []

    for page_num in range(total_pages):
        page = doc[page_num]
        text = page.get_text('text')
        cleaned = clean_text(text)
        if cleaned:
            full_text.append(cleaned)

    combined_text = ' '.join(full_text)

    # Sentence-preserving chunker
    sentences = re.split(r'(?<=[.!?]) +', combined_text)
    chunks = []
    current_chunk = []
    current_length = 0
    chunk_id = 1

    for sentence in sentences:
        if current_length + len(sentence) > max_chunk_length and current_chunk:
            chunks.append({'id': chunk_id, 'text': ' '.join(current_chunk)})
            chunk_id += 1
            current_chunk = [sentence]
            current_length = len(sentence)
        else:
            current_chunk.append(sentence)
            current_length += len(sentence)

    if current_chunk:
        chunks.append({'id': chunk_id, 'text': ' '.join(current_chunk)})

    return {
        'total_pages': total_pages,
        'total_chunks': len(chunks),
        'chunks': chunks,
    }


class PDFService:
    def __init__(self, storage_dir: str = './uploads') -> None:
        self.storage_dir = Path(storage_dir)
        self.storage_dir.mkdir(exist_ok=True, parents=True)

    def clean_text(self, text: str) -> str:
        return clean_text(text)

    def parse_pdf(self, file_bytes: bytes) -> list[dict[str, Any]]:
        result = extract_and_clean_pdf(file_bytes)
        return [{
            'id': f'chapter-{index + 1}',
            'title': f'Chapter {index + 1}',
            'paragraphs': [chunk['text'] for chunk in result['chunks'][index:index + 1]],
            'pages': 1,
            'status': 'ready',
        } for index in range(len(result['chunks']))]

    def extract_and_clean_pdf(self, file_bytes: bytes) -> dict[str, Any]:
        return extract_and_clean_pdf(file_bytes)


__all__ = ['clean_text', 'extract_and_clean_pdf', 'PDFService']
