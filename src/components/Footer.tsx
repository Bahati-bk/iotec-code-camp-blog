import { ArrowRight, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '../navigation/RouterContext'
import { PATHS } from '../navigation/paths'

export function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="mt-auto w-full border-t border-border bg-sidebar">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-secondary font-serif text-xs font-semibold tracking-wider text-secondary-foreground"
            >
              TR
            </span>
            <div>
              <p className="font-serif text-base leading-tight font-medium tracking-tight text-foreground">
                The Tech Report
                <sup className="ml-0.5 font-sans text-[8px] font-normal tracking-normal text-muted-foreground">
                  TM
                </sup>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Archival explorations in technology, architectural restraint, and culture.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate(PATHS.ADMIN_BLOGS)}
            className="self-start px-3.5 py-1.5 text-xs font-medium shadow-2xs sm:self-auto"
          >
            <Lock aria-hidden="true" className="size-3.5 text-muted-foreground" />
            <span>Admin Portal</span>
            <ArrowRight aria-hidden="true" className="size-3 text-muted-foreground" />
          </Button>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-4 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 The Tech Report. All rights reserved.</p>
          <p>Kampala &middot; Uganda</p>
        </div>
      </div>
    </footer>
  )
}
