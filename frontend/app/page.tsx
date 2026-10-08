import { PDFUploader } from '@/components/upload/pdf-uploader';
import { ChapterList } from '@/components/chapters/chapter-list';
import { AudiobookPlayer } from '@/components/player/audiobook-player';
import { VoiceMappingPanel } from '@/components/voices/voice-mapping-panel';

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber">WiseVoice</p>
            <h1 className="mt-2 text-4xl font-bold">AI Book to Audiobook Studio</h1>
          </div>
          <div className="rounded-full border border-white/10 bg-obsidian px-4 py-2 text-sm text-white/80">
            PDF to voice narration
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <PDFUploader />
          <VoiceMappingPanel />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ChapterList />
          <AudiobookPlayer />
        </section>
      </div>
    </main>
  );
}
