// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

export interface BlogImage {
  url: string
  imgix_url: string
}

export interface BlogMetadata {
  seo_description?: string
  featured_image?: BlogImage
  published_at?: string
  author?: string
  content?: string
}

export interface Blog extends CosmicObject {
  type: 'blog'
  metadata: BlogMetadata
}

export function isBlog(obj: CosmicObject): obj is Blog {
  return obj.type === 'blog'
}