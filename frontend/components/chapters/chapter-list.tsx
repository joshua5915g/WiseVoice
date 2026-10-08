import type { ChapterSummary } from '@/lib/types';

const chapters: ChapterSummary[] = [
  { id: 'ch-1', title: 'Chapter 1', status: 'parsed', pages: 8 },
  { id: 'ch-2', title: 'Chapter 2', status: 'ready', pages: 12 },
  { id: 'ch-3', title: 'Chapter 3', status: 'generated', pages: 9 }
];

export function ChapterList() {
  return (
    <div className="rounded-2xl border border-white/10 bg-obsidian p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Chapters</h2>
        <span className="text-sm text-white/60">{chapters.length} sections</span>
      </div>

      <div className="space-y-3">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="flex items-center justify-between rounded-xl bg-[#101827] p-4">
            <div>
              <p className="font-medium">{chapter.title}</p>
              <p className="text-sm text-white/55">{chapter.pages} pages</p>
            </div>

            <span className="rounded-full border border-amber/40 bg-amber/10 px-2 py-1 text-xs uppercase tracking-wide text-amber">
              {chapter.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
