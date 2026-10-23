import Link from 'next/link'
import type { Blog } from '@/types'
import { formatDate, getMetafieldValue, getImageUrl } from '@/lib/cosmic'

export default function PostCard({ post }: { post: Blog }) {
  const imageUrl = getImageUrl(
    post.metadata?.featured_image,
    'w=1200&h=675&fit=crop&auto=format,compress'
  )
  const author = getMetafieldValue(post.metadata?.author)
  const description = getMetafieldValue(post.metadata?.seo_description)
  const date = formatDate(post.metadata?.published_at)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-all hover:border-white/20 hover:bg-white/[0.04]"
    >
      <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-white/5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={post.title}
            width={600}
            height={338}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-600">
            <span className="font-mono text-xs">resend</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 font-mono text-xs uppercase tracking-wider text-gray-500">
          {date || 'Undated'}
        </div>
        <h3 className="mb-2 text-lg font-semibold tracking-tight text-white line-clamp-2">
          {post.title}
        </h3>
        {description && (
          <p className="mb-4 flex-1 text-sm text-gray-400 line-clamp-3">{description}</p>
        )}
        {author && <p className="mt-auto text-xs text-gray-500">By {author}</p>}
      </div>
    </Link>
  )
}