import { useEffect, type ComponentType } from 'react'
import { PublicLayout } from '../layouts/PublicLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import { LandingPage } from '../pages/LandingPage'
import { BlogDetailsPage } from '../pages/BlogDetailsPage'
import { AdminBlogsPage } from '../pages/admin/AdminBlogsPage'
import { AdminTransactionsPage } from '../pages/admin/AdminTransactionsPage'
import { AdminUsersPage } from '../pages/admin/AdminUsersPage'
import { useLocation, useNavigate } from './RouterContext'
import { PATHS, type AppPath } from './paths'

export type RouteLayout = 'public' | 'admin'

export interface RouteConfig {
  path: AppPath
  title: string
  layout: RouteLayout
  component?: ComponentType
  redirectTo?: AppPath
}

export const ROUTES: readonly RouteConfig[] = [
  {
    path: PATHS.LANDING,
    title: 'The Tech Report — Notes on Technology, Architecture & Culture',
    layout: 'public',
    component: LandingPage,
  },
  {
    path: PATHS.BLOG_DETAILS,
    title: 'Blog Details | The Tech Report',
    layout: 'public',
    component: BlogDetailsPage,
  },
  {
    path: PATHS.ADMIN,
    title: 'Articles & Essays | Admin Dashboard — The Tech Report',
    layout: 'admin',
    redirectTo: PATHS.ADMIN_BLOGS,
  },
  {
    path: PATHS.ADMIN_BLOGS,
    title: 'Articles & Essays | Admin Dashboard — The Tech Report',
    layout: 'admin',
    component: AdminBlogsPage,
  },
  {
    path: PATHS.ADMIN_TRANSACTIONS,
    title: 'Transactions | Admin Dashboard — The Tech Report',
    layout: 'admin',
    component: AdminTransactionsPage,
  },
  {
    path: PATHS.ADMIN_USERS,
    title: 'Users | Admin Dashboard — The Tech Report',
    layout: 'admin',
    component: AdminUsersPage,
  },
] as const

const DEFAULT_ROUTE = ROUTES[0]

export function AppRouter() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const matchedRoute = ROUTES.find((route) => route.path === pathname) ?? DEFAULT_ROUTE

  useEffect(() => {
    if (matchedRoute.redirectTo) {
      navigate(matchedRoute.redirectTo, { replace: true })
      return
    }
    document.title = matchedRoute.title
  }, [matchedRoute, navigate])

  const ResolvedRoute = matchedRoute.redirectTo
    ? (ROUTES.find((route) => route.path === matchedRoute.redirectTo) ?? DEFAULT_ROUTE)
    : matchedRoute

  const PageComponent = ResolvedRoute.component ?? LandingPage

  if (ResolvedRoute.layout === 'admin') {
    return (
      <AdminLayout>
        <PageComponent />
      </AdminLayout>
    )
  }

  return (
    <PublicLayout>
      <PageComponent />
    </PublicLayout>
  )
}

