import { LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, NavLink, useNavigate } from '../navigation/RouterContext'
import { ADMIN_NAV_ITEMS, PATHS } from '../navigation/paths'

export function AdminSidebar() {
  const navigate = useNavigate()

  return (
    <aside className="sticky top-0 flex h-dvh w-60 shrink-0 flex-col justify-between border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div>
        <div className="px-5 pt-6 pb-5">
          <Link
            to={PATHS.LANDING}
            className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring"
          >
            <span className="block font-serif text-[17px] leading-snug font-medium tracking-tight text-sidebar-foreground">
              The Tech Report
            </span>
            <span className="mt-0.5 block text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
              Admin Dashboard
            </span>
          </Link>
        </div>

        <nav aria-label="Admin" className="mt-1 px-3">
          <ul className="space-y-1">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring ${
                        isActive
                          ? 'bg-sidebar-primary font-medium text-sidebar-primary-foreground shadow-2xs'
                          : 'font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          aria-hidden="true"
                          className={`size-4 shrink-0 ${
                            isActive
                              ? 'text-sidebar-primary-foreground/90'
                              : 'text-muted-foreground'
                          }`}
                        />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between gap-2.5 rounded-lg border border-sidebar-border bg-sidebar-accent px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <User aria-hidden="true" className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs leading-tight font-semibold text-sidebar-foreground">
                Admin
              </p>
              <p className="truncate text-[11px] leading-tight text-muted-foreground">
                editor@thetechreport.journal
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate(PATHS.LANDING)}
            aria-label="Exit Admin Dashboard to Landing Page"
            className="shrink-0 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <LogOut aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
