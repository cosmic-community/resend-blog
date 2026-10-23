import type { MetadataRoute } from 'next'

// Block all crawlers from indexing the site.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
