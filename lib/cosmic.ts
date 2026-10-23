import { createBucketClient } from '@cosmicjs/sdk'
import type { Blog, BlogImage } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

/**
 * Safely stringifies a metadata value that may occasionally be
 * returned as an object like { key, value } instead of a plain string.
 */
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

/**
 * Returns a sortable timestamp for a Cosmic object, preferring
 * published_at, then falling back to modified_at / created_at.
 */
export function getDateValue(item: {
  metadata?: { published_at?: string }
  modified_at?: string
  created_at?: string
}): number {
  const raw = item.metadata?.published_at || item.modified_at || item.created_at
  const time = raw ? Date.parse(raw) : NaN
  return Number.isNaN(time) ? 0 : time
}

export function formatDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getImageUrl(image: BlogImage | undefined, params: string): string | null {
  if (!image?.imgix_url) return null
  return `${image.imgix_url}?${params}`
}

const LIST_PROPS = [
  'id',
  'title',
  'slug',
  'metadata.seo_description',
  'metadata.featured_image',
  'metadata.published_at',
  'metadata.author',
  'created_at',
  'modified_at',
]

const DETAIL_PROPS = ['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at']

export async function getAllBlogPostsList(): Promise<Blog[]> {
  try {
    const response = await cosmic.objects.find({ type: 'blog' }).props(LIST_PROPS)

    const posts = response.objects as Blog[]
    return posts.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog posts')
  }
}

export async function getBlogPostBySlug(slug: string): Promise<Blog | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog', slug })
      .props(DETAIL_PROPS)

    return response.object as Blog
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch blog post')
  }
}

export async function getRelatedBlogPosts(excludeId: string, limit = 3): Promise<Blog[]> {
  const all = await getAllBlogPostsList()
  return all.filter((post) => post.id !== excludeId).slice(0, limit)
}