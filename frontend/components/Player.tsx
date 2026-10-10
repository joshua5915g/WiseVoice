"use client";

import React, { useState, useRef, useEffect } from 'react';
import { generateAudioBlob } from '@/lib/api';

interface PlayerProps {
  textToRead: string;
  selectedVoice: string;
  selectedRate: string;
  onNext?: () => void;
  onPrev?: () => void;
  currentChunkIndex: number;
  totalChunks: number;
}

export default function Player({
  textToRead,
  selectedVoice,
  selectedRate,
  onNext,
  onPrev,
  currentChunkIndex,
  totalChunks,
}: PlayerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = async () => {
    if (!textToRead) return;

    try {
      setIsLoading(true);
      const blob = await generateAudioBlob(textToRead, selectedVoice, selectedRate);

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      const newUrl = URL.createObjectURL(blob);
      setAudioUrl(newUrl);

      if (audioRef.current) {
        audioRef.current.src = newUrl;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioUrl) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        handlePlayAudio();
      }
    }
  };

  useEffect(() => {
    if (textToRead) {
      handlePlayAudio();
    }
  }, [textToRead, selectedVoice, selectedRate]);

  return (
    <div className="flex flex-col gap-4 p-6 bg-slate-900 border border-slate-800 text-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">
          Chunk {currentChunkIndex + 1} of {totalChunks}
        </span>
        <span className="text-xs px-2 py-1 bg-violet-950 text-violet-300 rounded border border-violet-800 font-mono">
          {selectedVoice} @ {selectedRate}
        </span>
      </div>

      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
          if (onNext) onNext();
        }}
        className="hidden"
      />

      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          onClick={onPrev}
          disabled={currentChunkIndex === 0 || isLoading}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-sm font-medium transition"
        >
          Previous
        </button>

        <button
          onClick={togglePlayPause}
          disabled={isLoading || !textToRead}
          className="px-8 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-xl font-bold text-white shadow-md shadow-violet-900/40 transition"
        >
          {isLoading ? 'Generating Speech...' : isPlaying ? 'Pause' : 'Play Speech'}
        </button>

        <button
          onClick={onNext}
          disabled={currentChunkIndex >= totalChunks - 1 || isLoading}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-sm font-medium transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
