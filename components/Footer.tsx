export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-gray-500 md:flex-row">
        <p>&copy; {new Date().getFullYear()} Resend. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="https://www.cosmicjs.com" className="transition-colors hover:text-white">
            Home
          </a>
          <a href="https://www.cosmicjs.com/docs" className="transition-colors hover:text-white">
            Docs
          </a>
          <a href="https://twitter.com" className="transition-colors hover:text-white">
            Twitter
          </a>
          <a href="https://github.com" className="transition-colors hover:text-white">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}