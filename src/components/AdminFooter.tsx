import { MapPin } from 'lucide-react'

export function AdminFooter() {
  return (
    <footer className="mt-auto w-full border-t border-border bg-sidebar">
      <div className="flex flex-col gap-6 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded bg-primary font-serif text-xs font-semibold tracking-wider text-primary-foreground"
          >
            TR
          </span>
          <div>
            <p className="font-serif text-[15px] leading-tight font-semibold tracking-tight text-foreground">
              The Tech Report
              <sup className="ml-0.5 font-sans text-[8px] font-normal tracking-normal text-muted-foreground">
                TM
              </sup>
            </p>
            <p className="mt-0.5 max-w-xs text-[11px] leading-snug text-muted-foreground">
              Archival explorations in technology, architectural restraint, and culture.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] leading-snug text-muted-foreground">
          <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
          <span>
            Kampala &middot;
            <br className="hidden sm:inline" /> Uganda
          </span>
        </div>

        <p className="max-w-50 text-[11px] leading-snug text-muted-foreground">
          &copy; 2026 The Tech Report. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
