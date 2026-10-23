import type { MetadataRoute } from 'next'

// Block all crawlers from indexing the site, except the CAP front door
// (/agent.txt), which AI agents must be able to fetch per the
// Concierge Agent Protocol: https://conciergeprotocol.org/spec
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/agent.txt',
      disallow: '/',
    },
  }
}
