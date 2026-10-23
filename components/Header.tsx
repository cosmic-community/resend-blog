'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <span>resend</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-gray-400">
            blog
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
          <a href="https://www.cosmicjs.com" className="transition-colors hover:text-white">
            Home
          </a>
          <a href="https://www.cosmicjs.com/docs" className="transition-colors hover:text-white">
            Docs
          </a>
          <Link href="/" className="transition-colors hover:text-white">
            Blog
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md border border-white/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`h-px w-4 bg-gray-300 transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
          <span className={`h-px w-4 bg-gray-300 transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm text-gray-400">
            <a href="https://www.cosmicjs.com" onClick={() => setOpen(false)}>
              Home
            </a>
            <a href="https://www.cosmicjs.com/docs" onClick={() => setOpen(false)}>
              Docs
            </a>
            <Link href="/" onClick={() => setOpen(false)}>
              Blog
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}