// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
  formatDate,
  getMetafieldValue,
  getImageUrl,
} from '@/lib/cosmic'
import MarkdownContent from '@/components/MarkdownContent'
import RelatedPosts from '@/components/RelatedPosts'

// Re-fetch content from Cosmic at most every 60 seconds.
export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Post not found' }
  }

  const description = getMetafieldValue(post.metadata?.seo_description) || post.title
  const imageUrl = getImageUrl(
    post.metadata?.featured_image,
    'w=1200&h=630&fit=crop&auto=format,compress'
  )

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const related = await getRelatedBlogPosts(post.id, 3)
  const author = getMetafieldValue(post.metadata?.author)
  const date = formatDate(post.metadata?.published_at)
  const imageUrl = getImageUrl(
    post.metadata?.featured_image,
    'w=2400&h=1260&fit=crop&auto=format,compress'
  )
  const content = getMetafieldValue(post.metadata?.content)

  return (
    <article>
      <div className="mx-auto max-w-3xl px-6 pt-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
        >
          ← Back to blog
        </Link>
        <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-gray-500">
          {date && <span>{date}</span>}
          {author && date && <span>·</span>}
          {author && <span>{author}</span>}
        </div>
        <h1 className="mb-10 text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {post.title}
        </h1>
      </div>

      {imageUrl && (
        <div className="mx-auto mb-12 max-w-5xl px-6">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img
              src={imageUrl}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 pb-20">
        {content ? (
          <MarkdownContent content={content} />
        ) : (
          <p className="text-gray-500">This post has no content yet.</p>
        )}
      </div>

      <RelatedPosts posts={related} />
    </article>
  )
}