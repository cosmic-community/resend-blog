import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-32 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-wider text-gray-500">404</p>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight text-white">Page not found</h1>
      <p className="mb-8 text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/10"
      >
        Back to blog
      </Link>
    </div>
  )
}