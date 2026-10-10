"use client";

import React, { useState } from 'react';
import { parsePdf, Chunk } from '@/lib/api';
import Player from '@/components/Player';

export default function Home() {
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [voice, setVoice] = useState<string>('male_us');
  const [rate, setRate] = useState<string>('+0%');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const data = await parsePdf(file);
      setChunks(data.chunks);
      setCurrentChunkIndex(0);
    } catch (error) {
      console.error('Failed to parse PDF:', error);
      alert('Failed to parse PDF. Please verify backend connection.');
    } finally {
      setIsUploading(false);
    }
  };

  const currentChunk = chunks[currentChunkIndex];

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-slate-100 flex flex-col items-center p-6 md:p-12">
      <header className="max-w-4xl w-full flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-violet-900/30">
            W
          </div>
          <h1 className="text-2xl font-bold tracking-tight">WiseVoice</h1>
        </div>
        <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
          100% Free Edge-TTS Engine
        </span>
      </header>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">1. Upload Book PDF</h2>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-500 cursor-pointer"
            />
            {isUploading && <p className="text-xs text-violet-400 animate-pulse">Extracting and cleaning text...</p>}
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">2. Voice Settings</h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-300">Select Voice Profile</label>
              <select
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-sm rounded-lg p-2.5 text-white focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="male_us">Deep Male Narrator (US)</option>
                <option value="female_us">Aria Expressive Female (US)</option>
                <option value="male_uk">Ryan Smooth Male (UK)</option>
                <option value="female_uk">Sonia Articulate Female (UK)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-300">Reading Speed</label>
              <select
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-sm rounded-lg p-2.5 text-white focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="+0%">1.0x Normal Speed</option>
                <option value="+25%">1.25x Speed</option>
                <option value="+50%">1.5x Speed</option>
                <option value="+100%">2.0x Double Speed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex-1 flex flex-col min-h-[350px]">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Reading Reader Canvas</h2>

            {chunks.length > 0 ? (
              <div className="flex-1 overflow-y-auto max-h-[380px] pr-2 text-slate-200 leading-relaxed text-base font-serif">
                <p className="bg-violet-950/30 p-4 border-l-4 border-violet-500 rounded">
                  {currentChunk?.text}
                </p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-sm text-center">
                <p>No PDF loaded yet.</p>
                <p className="text-xs text-slate-600 mt-1">Upload a PDF on the left to start generating speech.</p>
              </div>
            )}
          </div>

          {chunks.length > 0 && (
            <Player
              textToRead={currentChunk?.text || ''}
              selectedVoice={voice}
              selectedRate={rate}
              currentChunkIndex={currentChunkIndex}
              totalChunks={chunks.length}
              onNext={() => setCurrentChunkIndex((prev) => Math.min(prev + 1, chunks.length - 1))}
              onPrev={() => setCurrentChunkIndex((prev) => Math.max(prev - 1, 0))}
            />
          )}
        </div>
      </div>
    </main>
  );
}
