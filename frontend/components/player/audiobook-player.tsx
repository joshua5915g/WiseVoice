export function AudiobookPlayer() {
  return (
    <div className="rounded-2xl border border-white/10 bg-obsidian p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">Now playing</p>
          <h2 className="mt-2 text-2xl font-semibold">Chapter 3</h2>
        </div>
        <div className="rounded-full bg-amber/15 px-3 py-1 text-sm text-amber">Ready</div>
      </div>

      <div className="mb-4 h-24 rounded-xl bg-[#0d1522] p-4">
        <div className="flex h-full items-end gap-1">
          {[40, 55, 65, 35, 75, 50, 80, 70, 90, 58, 48, 62].map((height, index) => (
            <div
              key={index}
              className="w-full rounded-t-sm bg-gradient-to-t from-amber to-yellow-300"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between text-sm text-white/60">
        <span>00:42</span>
        <span>06:18</span>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button className="h-12 w-12 rounded-full bg-white/10 text-xl">⏮</button>
        <button className="h-16 w-16 rounded-full bg-amber text-xl font-bold text-midnight">▶</button>
        <button className="h-12 w-12 rounded-full bg-white/10 text-xl">⏭</button>
      </div>
    </div>
  );
}
