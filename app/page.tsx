import type { Metadata } from 'next'
import { getAllBlogPostsList } from '@/lib/cosmic'
import FeaturedPost from '@/components/FeaturedPost'
import PostGrid from '@/components/PostGrid'

// Re-fetch content from Cosmic at most every 60 seconds so newly
// published or edited posts show up without a rebuild.
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Resend Blog — Insights for developers',
  description:
    'Product updates, engineering deep dives, and best practices for building with Resend, the email API for developers.',
}

export default async function HomePage() {
  const posts = await getAllBlogPostsList()
  const [featured, ...rest] = posts

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-24 md:pt-32">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
            The Resend Blog
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Email, built for <span className="italic text-gray-300">developers.</span>
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-400 md:text-lg">
            Product updates, engineering deep dives, and best practices from the team
            building the modern email API.
          </p>
        </div>
      </section>

      {featured && <FeaturedPost post={featured} />}

      <PostGrid posts={rest} />
    </>
  )
}