# The Tech Report (`iotec-code-camp-blog`)

**The Tech Report** is a full-stack editorial publication and content management platform built with React, TypeScript, Vite, Convex, Tailwind CSS v4, and shadcn/ui. It provides both a public reader experience (Landing Page & Blog Details) and an Admin Dashboard (Blogs, Transactions, and Users management).

---

## Tech Stack & Documentation

If you are new to any of the tools in this repository, consult their official documentation:

- **[React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)** — UI library and static type checking.
- **[Vite](https://vite.dev/guide/)** — Frontend build tool and development server.
- **[Convex](https://docs.convex.dev/)** — Reactive, end-to-end type-safe backend-as-a-service (database, server functions, and real-time sync).
  - [Convex React Quickstart](https://docs.convex.dev/quickstart/react)
  - [Convex Schema & Database Docs](https://docs.convex.dev/database/schemas)
- **[Tailwind CSS v4](https://tailwindcss.com/docs)** — Utility-first CSS framework integrated via `@tailwindcss/vite`.
- **[shadcn/ui](https://ui.shadcn.com/docs)** — Reusable, accessible UI primitives located in `src/components/ui/`.
- **[Lucide Icons (`lucide-react`)](https://lucide.dev/guide/packages/lucide-react)** — Standardized icon library used across all components and navigation configs.

---

## Project Structure

```text
iotec-code-camp-blog/
├── convex/                        # Convex backend schema and server functions
│   ├── _generated/                # Auto-generated Convex types & API bindings
│   └── schema.ts                  # Database table definitions
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components (e.g., button.tsx)
│   │   ├── Header.tsx             # Public sticky top header
│   │   ├── Footer.tsx             # Public footer with Admin Portal entry
│   │   ├── AdminHeader.tsx        # Admin dashboard sticky top header
│   │   ├── AdminFooter.tsx        # Admin dashboard footer
│   │   └── AdminSidebar.tsx       # Admin dashboard sticky left navigation sidebar
│   ├── layouts/
│   │   ├── PublicLayout.tsx       # Wraps public pages with Header + Footer
│   │   └── AdminLayout.tsx        # Wraps admin pages with AdminSidebar + AdminHeader + AdminFooter
│   ├── lib/
│   │   └── utils.ts               # Class-name merging utility (`cn`)
│   ├── navigation/
│   │   ├── paths.ts               # Central route paths (`PATHS`) & sidebar items (`ADMIN_NAV_ITEMS`)
│   │   ├── RouterContext.tsx      # History API router provider, hooks (`useNavigate`, `useLocation`), `<Link>`, `<NavLink>`
│   │   └── routes.tsx             # Declarative route table (`ROUTES`) & `<AppRouter />`
│   ├── pages/
│   │   ├── LandingPage.tsx        # Default public screen (`/`)
│   │   ├── BlogDetailsPage.tsx    # Public blog post screen (`/blog`)
│   │   └── admin/
│   │       ├── AdminBlogsPage.tsx         # Admin blogs screen (`/admin/blogs`)
│   │       ├── AdminTransactionsPage.tsx  # Admin transactions screen (`/admin/transactions`)
│   │       └── AdminUsersPage.tsx         # Admin users screen (`/admin/users`)
│   ├── App.tsx                    # Mounts RouterProvider and AppRouter
│   ├── index.css                  # Tailwind CSS v4 imports, theme tokens & typography
│   └── main.tsx                   # App entry point with ConvexProvider
└── package.json
```

---

## How Navigation & Layouts Work

Routing is centrally managed inside `src/navigation/` so that `src/App.tsx` never needs to be manually edited when adding new screens.

### 1. Route Paths & Sidebar Config (`src/navigation/paths.ts`)
- **`PATHS`**: A `const` object containing every route path in the application (`LANDING`, `BLOG_DETAILS`, `ADMIN`, `ADMIN_BLOGS`, `ADMIN_TRANSACTIONS`, `ADMIN_USERS`).
- **`AppPath`**: A union type derived from `PATHS`. TypeScript enforces that `navigate(...)`, `<Link to={...}>`, and `<NavLink to={...}>` only accept valid `AppPath` values.
- **`ADMIN_NAV_ITEMS`**: An array of `{ label, path, icon }` objects (using `LucideIcon` components from `lucide-react`) that automatically populates the menu items in `AdminSidebar.tsx`.

### 2. Declarative Route Registry (`src/navigation/routes.tsx`)
- **`ROUTES`**: Maps each `AppPath` to:
  - `title`: Automatically updates `document.title` when the user navigates.
  - `layout`: Either `'public'` (wrapped in `PublicLayout`) or `'admin'` (wrapped in `AdminLayout`).
  - `component`: The React page component to render (or `redirectTo` for route aliases such as `/admin` -> `/admin/blogs`).
- **`AppRouter`**: Reads the current pathname, resolves the matching entry in `ROUTES`, and wraps the page in its assigned layout.

### 3. Navigating Between Pages (`src/navigation/RouterContext.tsx`)
- **With shadcn `<Button />`**: Use the `useNavigate()` hook together with `PATHS`:
  ```tsx
  import { useNavigate } from '@/navigation/RouterContext'
  import { PATHS } from '@/navigation/paths'
  import { Button } from '@/components/ui/button'

  const navigate = useNavigate()
  <Button onClick={() => navigate(PATHS.BLOG_DETAILS)}>Read Dispatch</Button>
  ```
- **With `<Link />` or `<NavLink />`**: Use `<Link to={PATHS.LANDING}>` for standard anchor links or `<NavLink to={item.path}>` for navigation menus that need active-state styling and `aria-current="page"`.

### 4. How to Add a New Page
1. **Add the path** to `PATHS` in `src/navigation/paths.ts` (and add an entry to `ADMIN_NAV_ITEMS` if it should appear in the Admin Sidebar).
2. **Create the page component** in `src/pages/` (or `src/pages/admin/`).
3. **Register the route** in `ROUTES` inside `src/navigation/routes.tsx` with `layout: 'public'` or `layout: 'admin'`.

---

## Getting Started (Local Development)

### Prerequisites
- **[Node.js](https://nodejs.org/)** (v20+ recommended)
- **[pnpm](https://pnpm.io/installation)** (Package manager used in this workspace)
- A free **[Convex](https://www.convex.dev/)** account for the backend deployment

### Step 1: Clone the Repository & Install Dependencies
```bash
git clone <repository-url>
cd iotec-code-camp-blog
pnpm install
```

### Step 2: Configure Convex Backend & Environment Variables
The application connects to Convex in `src/main.tsx` using the `VITE_CONVEX_URL` environment variable stored in `.env.local`.

If `.env.local` is not yet present on your machine, initialize/link your Convex development deployment by running:
```bash
pnpm run dev:backend
```
This command will prompt you to log in to Convex, link or create a project, generate files in `convex/_generated/`, and automatically write `VITE_CONVEX_URL` to `.env.local`.

### Step 3: Start the Application
Once dependencies are installed, start both the Vite frontend server and the Convex backend watcher in parallel:
```bash
pnpm run dev
```
Open the local URL printed by Vite (typically `http://localhost:5173`) in your browser.

---

## Available Scripts (`package.json`)

| Command | Description |
| :--- | :--- |
| `pnpm run dev` | Runs `dev:frontend` and `dev:backend` in parallel (`pnpm run --parallel /dev:/`). Use this for normal daily development. |
| `pnpm run dev:frontend` | Starts only the [Vite](https://vite.dev/) frontend development server with Hot Module Replacement (HMR). |
| `pnpm run dev:backend` | Starts `convex dev`, watching the `convex/` folder and syncing schema/functions with your Convex dev deployment. |
| `pnpm run build` | Runs TypeScript project-reference type checking (`tsc -b`) followed by a production Vite bundle (`vite build`) into `dist/`. |
| `pnpm run lint` | Runs [ESLint](https://eslint.org/) across the project to catch code quality and formatting issues. |
| `pnpm run preview` | Locally previews the production build generated in `dist/` via `vite preview`. |

---

## UI & Icon Conventions

- **Buttons & UI Primitives**: Always use components from `src/components/ui/` (such as `Button` from `@/components/ui/button`) rather than unstyled native `<button>` elements. To add more [shadcn/ui](https://ui.shadcn.com/docs/cli) components, run:
  ```bash
  pnpx shadcn@latest add <component-name>
  ```
- **Icons**: Do not hardcode inline `<svg>` elements inside components. Import icons from [`lucide-react`](https://lucide.dev/icons/) instead (e.g., `import { Plus, ArrowLeft } from 'lucide-react'`).
- **Convex Guidelines**: Before writing or modifying backend code under `convex/`, review `convex/_generated/ai/guidelines.md` for project-specific Convex conventions.
