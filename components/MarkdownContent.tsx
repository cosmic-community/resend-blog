import { marked } from 'marked'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const html = marked.parse(content, { breaks: true, gfm: true }) as string

  return (
    <div
      className="prose prose-invert prose-lg max-w-none prose-headings:tracking-tight prose-a:text-white prose-a:underline prose-a:underline-offset-4 prose-img:rounded-xl prose-img:border prose-img:border-white/10"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}