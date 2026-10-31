import { Link } from '../navigation/RouterContext'
import { PATHS } from '../navigation/paths'

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-8 py-3.5">
        <Link
          to={PATHS.LANDING}
          aria-label="The Tech Report Home"
          className="inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded bg-primary font-serif text-xs font-semibold tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
          >
            TR
          </span>
        </Link>
      </div>
    </header>
  )
}
