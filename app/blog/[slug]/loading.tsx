// app/blog/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-6 pt-16">
      <div className="mb-8 h-4 w-24 rounded bg-white/10" />
      <div className="mb-4 h-4 w-40 rounded bg-white/10" />
      <div className="mb-10 h-12 w-full rounded bg-white/10" />
      <div className="mb-12 h-80 w-full rounded-2xl bg-white/5" />
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-full rounded bg-white/10" />
        ))}
      </div>
    </div>
  )
}