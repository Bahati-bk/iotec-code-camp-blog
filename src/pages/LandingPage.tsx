import { useState, useEffect } from 'react'
import { ArrowRight, ArrowLeft, Mail, Globe, AtSign, MessageCircle, Clock, Loader2 } from 'lucide-react'
//import { Button } from '@/components/ui/button'
//import { useNavigate } from '../navigation/RouterContext'
import { PATHS } from '../navigation/paths'
import { getPosts } from '../lib/hashnode'

export function LandingPage() {
  //State for real data
  const [allPosts, setAllPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  //const [error, setError] = useState<string | null>(null)

  //state for filters and pagination
  const [activeFilter, setActiveFilter] = useState<'All' | 'Architecture' | 'Technology' | 'Development'>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const POSTS_PER_PAGE = 3

  // 1. Fetch data when the page loads
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      //setError(null)
      try {
        const data = await getPosts()
        setAllPosts(data)
      } catch (err: any) {
        //setError(err.message || 'An error occurred while fetching posts.')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // 2. Filter the posts based on the active filter
  const filteredPosts = activeFilter === 'All' 
    ? allPosts 
    : allPosts.filter(post => 
        post.tags.some((tag: string) => tag.toLowerCase().includes(activeFilter.toLowerCase()))
      )

  // 3. Calculate pagination (This now comes AFTER filteredPosts is created)
  const indexOfLastPost = currentPage * POSTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  //This uses the custom router to go to the blog details page
  const handleReadMore = (slug: string) => {
    window.location.href = `${PATHS.BLOG_DETAILS}?slug=${slug}`
  }


  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      
      {/* --- HERO SECTION --- */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
        
        {/* Left: Image & Author */}
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-[4/5] bg-secondary rounded-lg overflow-hidden relative">
            <img 
              src="public\me.jpeg" 
              alt="Bahati Brenda Kizito" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-foreground">Bahati Brenda Kizito</h3>
            <p className="text-xs text-muted-foreground">Software Engineer & Community Buider, Passionate About Building AI Solutions</p>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-col justify-center pt-8">
          <span className="text-[10px] font-bold text-orange-600 tracking-widest uppercase mb-4">Authorial Focus</span>
          <h1 className="text-4xl md:text-5xl font-serif leading-[1.1] mb-8 text-foreground">
            Exploring the intersection of <span className="italic">artificial intelligence</span>, software engineering, and technology's real impact on the world.
          </h1>
          <div className="space-y-6 text-sm leading-relaxed max-w-xl text-muted-foreground">
            <p>
              I'm Bahati Brenda Kizito, a Software Engineer and technology researcher interested in how intelligent systems are built, how software evolves, and how emerging technologies reshape the way we live and work. My work and writing explore artificial intelligence, machine learning, software architecture, MLOps, developer tools, and the evolving relationship between people and technology. I'm particularly interested in moving beyond experimentation to understand what it takes to build reliable, useful, and production-ready systems.
            </p>
            <p>
              Based in Kampala, Uganda, I build, experiment, research, and document my journey through technology. I believe some of the most interesting innovations happen when global technological advancements meet local problems and real human needs. The Tech Report is my space for thinking out loud, sharing technical explorations, documenting discoveries, and examining the ideas shaping our digital future.Less noise. More understanding. Technology worth thinking about.
            </p>
          </div>
          
          {/* Social Buttons */}
          <div className="mt-10">
            <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">Direct Inquiries & Collaboration</span>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <button className="flex items-center gap-1.5 bg-background border border-border text-[11px] px-2.5 py-1.5 rounded-md text-foreground hover:bg-muted transition-colors">
                <Mail size={12} /> bahatibk72@gmail.com
              </button>
              <button className="flex items-center gap-1.5 bg-background border border-border text-[11px] px-2.5 py-1.5 rounded-md text-foreground hover:bg-muted transition-colors">
                <Globe size={12} /> LinkedIn - Bahati Brenda Kizito
              </button>
              <button className="flex items-center gap-1.5 bg-background border border-border text-[11px] px-2.5 py-1.5 rounded-md text-foreground hover:bg-muted transition-colors">
                <AtSign size={12} /> X @kizyto74479
              </button>
              <button className="flex items-center gap-1.5 bg-background border border-border text-[11px] px-2.5 py-1.5 rounded-md text-foreground hover:bg-muted transition-colors">
                <MessageCircle size={12} /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

            {/* --- RECENT BLOGS SECTION --- */}
      <section className="border-t border-border pt-12">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">The Tech Report Archive</span>
            </div>
            <h2 className="text-3xl font-serif text-foreground">Recent Blogs</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Filter Buttons */}
            <div className="flex bg-secondary p-1 rounded-lg">
              {['All', 'Architecture', 'Technology'].map((filter) => (
                <button 
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter as any);
                    setCurrentPage(1); // Reset page on filter change
                  }}
                  className={`text-xs px-3 py-1.5 rounded-md transition-colors ${activeFilter === filter ? 'bg-blue-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            {/* Pagination Controls (Removed because RSS loads all posts at once) */}
            {/* <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium">
              <button onClick={handlePreviousPage} disabled={pageHistory.length === 0} className="p-1 hover:bg-secondary rounded disabled:opacity-50">
                <ArrowLeft size={16} />
              </button>
              <span className="text-xs px-2">01 / 04</span>
              <button onClick={handleNextPage} disabled={!hasNextPage} className="p-1 hover:bg-secondary rounded disabled:opacity-50">
                <ArrowRight size={16} />
              </button>
            </div> */}

            <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1}
                className="p-1 hover:bg-secondary rounded disabled:opacity-50 transition-colors"
              >
                <ArrowLeft size={16} />
              </button>
              
              <span className="text-xs px-2 w-12 text-center">
                {String(currentPage).padStart(2, '0')} / {String(totalPages || 1).padStart(2, '0')}
              </span>
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1 hover:bg-secondary rounded disabled:opacity-50 transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={32} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentPosts.map((post: any) => (
              <article key={post.id} className="bg-background rounded-xl border border-border p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                
                {/* Cover Image */}
                <div className="w-full h-40 rounded-lg overflow-hidden mb-4 bg-secondary">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Meta info (Tags & Read time) */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] bg-secondary text-muted-foreground font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {post.tags[0] || 'Tech'}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock size={12} />
                    <span>{post.readTimeInMinutes} min</span>
                  </div>
                </div>

                {/* Title & Brief */}
                <h3 className="font-serif text-lg font-medium leading-snug mb-2 text-foreground">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {post.brief}
                </p>

                {/* Read Button */}
                <button 
                  onClick={() => handleReadMore(post.slug)}
                  className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit"
                >
                  Read <ArrowRight size={14} />
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
