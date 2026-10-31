import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '../navigation/RouterContext'
import { PATHS } from '../navigation/paths'

export function BlogDetailsPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 flex-col items-start py-12">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => navigate(PATHS.LANDING)}
        className="px-3.5 py-1.5 text-xs font-medium shadow-2xs"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5 text-muted-foreground" />
        <span>Back to Landing</span>
      </Button>

      <div className="my-auto py-16">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground">
          Blog Details
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Blog post content will appear here.
        </p>
      </div>
    </div>
  )
}
