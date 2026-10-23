import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resend-blog.example.com'

export const metadata: Metadata = {
  title: {
    default: 'Resend Blog — Insights for developers',
    template: '%s | Resend Blog',
  },
  description:
    'Product updates, engineering deep dives, and best practices for building with Resend, the email API for developers.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Resend Blog',
    description:
      'Product updates, engineering deep dives, and best practices for building with Resend, the email API for developers.',
    type: 'website',
    siteName: 'Resend Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resend Blog',
    description:
      'Product updates, engineering deep dives, and best practices for building with Resend, the email API for developers.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✉️</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6ad787929e60c6e89e97f134"></script>
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <div className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.03]" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
        {/* Cosmic agent chat widget */}
        <Script
          src="https://www.cosmicjs.com/agent.js"
          data-key="pk_49b038141ac1f2745ed7f28cce90a435"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}