export function VoiceMappingPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-obsidian p-6">
      <h2 className="mb-4 text-xl font-semibold">Voice mapping</h2>

      <div className="space-y-3">
        {[
          ['Narrator', 'Warm neutral narrator'],
          ['Male Character', 'Low, grounded voice'],
          ['Female Character', 'Bright, expressive voice']
        ].map(([label, description]) => (
          <div key={label} className="rounded-xl bg-[#101827] p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{label}</span>
              <span className="rounded bg-amber/15 px-2 py-1 text-xs text-amber">Assigned</span>
            </div>
            <p className="mt-1 text-sm text-white/60">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
