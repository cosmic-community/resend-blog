# Resend Blog

![App Preview](https://imgix.cosmicjs.com/8a18b160-cc9a-11f1-b967-415684f3dcc2-design-email-for-humans-and-agents.jpg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, minimal, dark-first blog for Resend — the email API for developers — built with Next.js App Router, React Server Components, TypeScript, and Tailwind CSS, powered entirely by Cosmic.

## Features

- ✍️ Homepage with hero, large featured post, and a responsive "Load more" post grid
- 📄 Individual post pages with beautifully styled markdown content
- 🖤 Resend-inspired dark aesthetic: subtle borders, radial glows, grain texture, monospace metadata
- 🔗 Related posts on every article
- 🖼️ Imgix-optimized images with graceful fallback for missing images
- 🔍 Full SEO via `generateMetadata`, Open Graph, Twitter cards, and sitemap.xml
- ⚡ Server Components for fast, cache-friendly data fetching
- 🛡️ Strict TypeScript throughout with complete Cosmic type definitions

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6ad787929e60c6e89e97f136&clone_repository=6adb8626193949a4350e5657)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> A modern, minimal blog website for Resend (the email API for developers), built with the latest Next.js (App Router, React Server Components, TypeScript, Tailwind CSS) using the existing Cosmic "blog" object type (91 published posts). Fields: title, slug, seo_description (textarea), featured_image (file/image), published_at (date), author (text), content (rich-text markdown).
>
> Design style inspired by resend.com: dark-first aesthetic with near-black background (#000 / #0a0a0a), crisp white and soft gray typography, subtle 1px borders (white at ~10% opacity), refined spacing, large elegant display headings (Inter / Geist style sans with tight letter-spacing, optional serif accent for hero), subtle radial gradient glows and grain, smooth hover transitions, rounded cards, monospace accents for dates/metadata. Clean, developer-focused, premium feel.
>
> Pages:
> 1. Home / blog index (/): hero section with headline and short intro, a featured latest post displayed large with image, then a responsive grid of post cards (featured image, title, short SEO description, author, formatted date), sorted by published_at descending, with pagination or load more.
> 2. Post detail (/blog/[slug]): large title, author and date metadata, featured image, beautifully styled markdown/rich-text content (prose typography tuned for dark mode, code blocks styled), related/more posts at the bottom, back link. Use seo_description for meta description and featured image for Open Graph.
> 3. Responsive header with Resend-style wordmark and nav, plus minimal footer.
>
> Include sitemap, generateMetadata for SEO, image optimization via imgix URLs, and graceful handling of missing images/fields.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) — App Router, React Server Components
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) with `@tailwindcss/typography`
- [Cosmic](https://www.cosmicjs.com) via `@cosmicjs/sdk`
- [marked](https://marked.js.org) for markdown rendering

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- A Cosmic account with a bucket containing a `blog` object type

### Installation

```bash
bun install
```

Set up your environment variables (see Cosmic CMS Integration below), then run:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cosmic SDK Examples

```typescript
// Fetch all posts, sorted by published date
const response = await cosmic.objects
  .find({ type: 'blog' })
  .props(['id', 'title', 'slug', 'metadata.featured_image', 'metadata.published_at'])

const posts = response.objects.sort((a, b) => {
  const dateA = new Date(a.metadata?.published_at || '').getTime()
  const dateB = new Date(b.metadata?.published_at || '').getTime()
  return dateB - dateA
})
```

```typescript
// Fetch a single post by slug
const response = await cosmic.objects
  .findOne({ type: 'blog', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])

const post = response.object
```

## Cosmic CMS Integration

This app reads from the `blog` object type in your Cosmic bucket with the following metadata fields:

| Field | Type | Description |
|---|---|---|
| `seo_description` | textarea | Used for card excerpts and meta description |
| `featured_image` | file | Hero/card image, optimized with imgix |
| `published_at` | date | Used for sorting and display |
| `author` | text | Byline |
| `content` | rich-text (markdown) | Rendered as styled HTML |

Environment variables (automatically configured):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Deployment Options

### Vercel

1. Push this repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add the `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables
4. Deploy

### Netlify

1. Push this repo to GitHub
2. Import at [app.netlify.com](https://app.netlify.com)
3. Build command: `bun run build` — Publish directory: `.next`
4. Add the same environment variables in Site settings → Environment variables
<!-- README_END -->