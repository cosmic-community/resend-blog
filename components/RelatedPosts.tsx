import type { Blog } from '@/types'
import PostCard from './PostCard'

export default function RelatedPosts({ posts }: { posts: Blog[] }) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="border-t border-white/10 bg-white/[0.01] py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-8 text-sm font-medium uppercase tracking-wider text-gray-500">
          More from the blog
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}