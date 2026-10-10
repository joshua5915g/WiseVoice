export interface Chunk {
  id: number;
  text: string;
}

export interface ParseResponse {
  total_pages: number;
  total_chunks: number;
  chunks: Chunk[];
}

const API_BASE_URL = 'http://localhost:8000';

export async function parsePdf(file: File): Promise<ParseResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/pdf/parse`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`PDF upload failed with status ${response.status}`);
  }

  return await response.json();
}

export async function generateAudioBlob(text: string, voice: string, rate: string = '+0%'): Promise<Blob> {
  const response = await fetch(`${API_BASE_URL}/api/tts/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice, rate }),
  });

  if (!response.ok) {
    throw new Error(`Audio generation failed with status ${response.status}`);
  }

  return await response.blob();
}
