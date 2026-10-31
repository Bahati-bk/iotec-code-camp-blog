import { Link } from '../navigation/RouterContext'
import { PATHS } from '../navigation/paths'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          to={PATHS.LANDING}
          className="group flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded bg-primary font-serif text-xs font-semibold tracking-wider text-primary-foreground transition-opacity group-hover:opacity-90"
          >
            TR
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-[15px] leading-tight font-medium tracking-tight text-foreground">
              The Tech Report
              <sup className="ml-0.5 font-sans text-[8px] font-normal tracking-normal text-muted-foreground">
                TM
              </sup>
            </span>
            <span className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
              Notes on Technology, Architecture &amp; Culture
            </span>
          </span>
        </Link>
      </div>
    </header>
  )
}
