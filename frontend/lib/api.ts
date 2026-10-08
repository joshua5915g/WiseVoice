export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function uploadPdf(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/upload-pdf`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('PDF upload failed');
  }

  return response.json();
}

export async function parseDialogue(chapterId: string) {
  const response = await fetch(`${API_BASE_URL}/api/parse-dialogue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ chapter_id: chapterId })
  });

  if (!response.ok) {
    throw new Error('Dialogue parsing failed');
  }

  return response.json();
}

export async function generateAudio(chapterId: string) {
  const response = await fetch(`${API_BASE_URL}/api/generate-audio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ chapter_id: chapterId })
  });

  if (!response.ok) {
    throw new Error('Audio generation failed');
  }

  return response.json();
}
