'use client';

import { useRef, useState } from 'react';

export function PDFUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('No file selected');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) {
      setFileName(selected.name);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-obsidian p-6 shadow-glow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Upload manuscript</h2>
        <span className="rounded-full bg-amber/15 px-2 py-1 text-xs font-medium text-amber">MVP</span>
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border border-dashed border-amber/60 bg-[#111827] p-8 text-center transition hover:border-amber hover:bg-[#162234]"
      >
        <p className="text-lg font-medium">Drag and drop a PDF here</p>
        <p className="mt-2 text-sm text-white/60">or click to browse</p>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="mt-4 rounded-xl bg-[#0d1522] p-3 text-sm text-white/70">
        Selected file: <span className="font-medium text-white">{fileName}</span>
      </div>
    </div>
  );
}
