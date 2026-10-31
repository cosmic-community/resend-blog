import type { MetadataRoute } from 'next'
import { getAllBlogPostsList } from '@/lib/cosmic'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resend-blog.example.com'
  const posts = await getAllBlogPostsList()

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modified_at || post.created_at),
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postUrls,
  ]
}