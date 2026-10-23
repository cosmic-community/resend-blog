'use client'

import { useState } from 'react'
import type { Blog } from '@/types'
import PostCard from './PostCard'

const PAGE_SIZE = 9

export default function PostGrid({ posts }: { posts: Blog[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  if (!posts || posts.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 text-center text-gray-500">
        No posts published yet. Check back soon.
      </div>
    )
  }

  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">All posts</h2>
        <span className="font-mono text-xs text-gray-600">{posts.length} articles</span>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/10"
          >
            Load more posts
          </button>
        </div>
      )}
    </section>
  )
}