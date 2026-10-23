export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-6 pt-24">
      <div className="mx-auto mb-6 h-3 w-32 rounded bg-white/10" />
      <div className="mx-auto mb-4 h-10 w-2/3 rounded bg-white/10" />
      <div className="mx-auto mb-16 h-4 w-1/2 rounded bg-white/10" />
      <div className="mb-16 h-96 w-full rounded-2xl bg-white/5" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 rounded-xl border border-white/10 bg-white/[0.02]" />
        ))}
      </div>
    </div>
  )
}