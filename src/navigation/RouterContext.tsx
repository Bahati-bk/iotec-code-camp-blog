import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { PATHS, type AppPath } from './paths'

interface NavigateOptions {
  replace?: boolean
}

interface RouterContextValue {
  pathname: string
  navigate: (to: AppPath, options?: NavigateOptions) => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '/') return PATHS.LANDING
  return rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : PATHS.LANDING,
  )

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePath(window.location.pathname))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((to: AppPath, options?: NavigateOptions) => {
    const normalizedTarget = normalizePath(to)
    if (window.location.pathname !== normalizedTarget) {
      if (options?.replace) {
        window.history.replaceState({}, '', normalizedTarget)
      } else {
        window.history.pushState({}, '', normalizedTarget)
      }
    }
    setPathname(normalizedTarget)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const value = useMemo(() => ({ pathname, navigate }), [pathname, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useLocation() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useLocation must be used within a RouterProvider')
  }
  return { pathname: context.pathname }
}

export function useNavigate() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useNavigate must be used within a RouterProvider')
  }
  return context.navigate
}

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: AppPath
  replace?: boolean
}

export function Link({ to, replace, onClick, children, ...rest }: LinkProps) {
  const navigate = useNavigate()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }
    event.preventDefault()
    navigate(to, { replace })
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

export interface NavLinkProps extends Omit<LinkProps, 'className' | 'children'> {
  to: AppPath
  className?: string | ((state: { isActive: boolean }) => string)
  children?: ReactNode | ((state: { isActive: boolean }) => ReactNode)
}

export function NavLink({ to, className, children, ...rest }: NavLinkProps) {
  const { pathname } = useLocation()
  const isActive = pathname === to

  const resolvedClassName =
    typeof className === 'function' ? className({ isActive }) : className

  const resolvedChildren =
    typeof children === 'function' ? children({ isActive }) : children

  return (
    <Link
      to={to}
      aria-current={isActive ? 'page' : undefined}
      className={resolvedClassName}
      {...rest}
    >
      {resolvedChildren}
    </Link>
  )
}

