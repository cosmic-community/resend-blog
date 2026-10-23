import Link from 'next/link'
import type { Blog } from '@/types'
import { formatDate, getMetafieldValue, getImageUrl } from '@/lib/cosmic'

export default function FeaturedPost({ post }: { post: Blog }) {
  const imageUrl = getImageUrl(
    post.metadata?.featured_image,
    'w=2400&h=1350&fit=crop&auto=format,compress'
  )
  const author = getMetafieldValue(post.metadata?.author)
  const description = getMetafieldValue(post.metadata?.seo_description)
  const date = formatDate(post.metadata?.published_at)

  return (
    <section className="mx-auto max-w-5xl px-6 pb-16">
      <Link
        href={`/blog/${post.slug}`}
        className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/20"
      >
        {imageUrl && (
          <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/10">
            <img
              src={imageUrl}
              alt={post.title}
              width={1200}
              height={675}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <div className="p-8 md:p-10">
          <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-gray-500">
            <span>Featured</span>
            {date && (
              <>
                <span>·</span>
                <span>{date}</span>
              </>
            )}
          </div>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white md:text-4xl">
            {post.title}
          </h2>
          {description && (
            <p className="mb-6 max-w-2xl text-base text-gray-400 md:text-lg">{description}</p>
          )}
          {author && <p className="text-sm text-gray-500">By {author}</p>}
        </div>
      </Link>
    </section>
  )
}