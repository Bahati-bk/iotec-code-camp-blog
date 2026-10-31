import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminBlogsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground">
          Articles &amp; Essays
        </h1>
        <Button
          type="button"
          className="self-start px-4 py-2 text-xs font-medium shadow-2xs sm:self-auto"
        >
          <Plus aria-hidden="true" className="size-3.5" />
          <span>Create New Blog</span>
        </Button>
      </div>

      <div className="my-auto py-16">
        <p className="text-sm text-muted-foreground">
          Articles and essays management content will appear here.
        </p>
      </div>
    </div>
  )
}
