import { ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '../navigation/RouterContext'
import { PATHS } from '../navigation/paths'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="my-auto flex flex-col items-start py-16">
      <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground">
        Landing Page
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Select a destination below to navigate to the blog details or the admin dashboard.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={() => navigate(PATHS.BLOG_DETAILS)}
          className="px-4 py-2 text-xs font-medium shadow-2xs"
        >
          <span>Read Dispatch</span>
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(PATHS.ADMIN_BLOGS)}
          className="px-4 py-2 text-xs font-medium shadow-2xs"
        >
          <Lock aria-hidden="true" className="size-3.5 text-muted-foreground" />
          <span>Admin Dashboard</span>
          <ArrowRight aria-hidden="true" className="size-3 text-muted-foreground" />
        </Button>
      </div>
    </div>
  )
}
