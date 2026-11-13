// src/pages/BlogDetailsPage.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from '../navigation/RouterContext'
import { PATHS } from '../navigation/paths'
import { getPosts } from '../lib/hashnode'
import { ArrowLeft, Loader2, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BlogDetailsPage() {
  const navigate = useNavigate()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      // 1. Get the slug from the URL (e.g., /blog?slug=my-post)
      const searchParams = new URLSearchParams(window.location.search)
      const slug = searchParams.get('slug')

      if (!slug) {
        setLoading(false)
        return
      }

      try {
        // 2. Fetch all posts (since the RSS feed gives us everything at once)
        const allPosts = await getPosts()
        
        // 3. Find the specific post that matches the slug
        const foundPost = allPosts.find((p: any) => p.slug === slug)
        setPost(foundPost)
      } catch (err) {
        console.error("Failed to fetch post", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-serif mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-8">The article you are looking for does not exist or was removed.</p>
        <Button onClick={() => navigate(PATHS.LANDING)}>Back to Landing</Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={() => navigate(PATHS.LANDING)}
        className="mb-10 text-xs font-medium"
      >
        <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Back to Landing
      </Button>

      {/* Post Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
          <span className="font-bold tracking-wider uppercase text-blue-600">
            {post.tags[0] || 'Tech'}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1"><Calendar size={12} /> {post.publishedAt}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {post.readTimeInMinutes} min read</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif leading-tight text-foreground mb-8">
          {post.title}
        </h1>

        {post.coverImage && (
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-secondary mb-8">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
      </div>

      {/* 
        Post Content
        We use dangerouslySetInnerHTML because Hashnode provides the content as raw HTML.
        We add Tailwind classes to style the raw HTML tags (headings, paragraphs, lists, etc.)
      */}
      <div 
        className="text-foreground leading-relaxed text-[15px] sm:text-base
                   [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:font-semibold [&>h2]:mt-10 [&>h2]:mb-4 
                   [&>h3]:text-xl [&>h3]:font-serif [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3
                   [&>p]:mb-6 [&>p]:text-muted-foreground
                   [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:text-muted-foreground
                   [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:text-muted-foreground
                   [&>li]:mb-2
                   [&>a]:text-blue-600 [&>a]:underline [&>a]:underline-offset-4 hover:[&>a]:text-blue-700
                   [&>pre]:bg-secondary [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:mb-6
                   [&>code]:bg-secondary [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
                   [&>img]:rounded-lg [&>img]:my-8 [&>img]:mx-auto
                   [&>blockquote]:border-l-4 [&>blockquote]:border-blue-600 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: post.html }} 
      />
      
      <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Thanks for reading!</p>
        <Button onClick={() => navigate(PATHS.LANDING)} variant="outline" size="sm">
          Back to Home
        </Button>
      </div>

    </div>
  )
}