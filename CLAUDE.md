# CLAUDE.md — Taskr Frontend

## Project Overview

Nuxt 4 task management app (SPA). Connects to a Laravel/REST backend via `useApi()`. Auth is cookie-based (`token` cookie). Uses Pinia for state, TailwindCSS v3 for styling.

## Commands

```bash
pnpm dev          # start dev server (localhost:3000)
pnpm build        # production build
pnpm generate     # static generation
```

## Environment

```bash
cp .env.copy .env
# Set NUXT_PUBLIC_API_BASE=http://localhost:8000/api
```

## Architecture

### Directory layout

```
app/
  assets/css/main.css        # Tailwind directives + Google Fonts import
  components/
    layout/
      Header.vue             # Search bar + user menu
      Sidebar.vue            # Date nav + progress bar
    task/
      TaskInput.vue          # Add-task input, sticky when tasks exist
      TaskList.vue           # Orchestrates drag/search modes
      TaskRow.vue            # Single task row (shared by drag + search)
  composables/
    useApi.ts                # $fetch wrapper with auth header
  layouts/
    auth.vue                 # Bare shell for login page
    default.vue              # Sidebar + Header + slot
  middleware/
    auth.ts                  # Redirect unauthenticated users → /login
    guest.ts                 # Redirect authenticated users → /
  pages/
    index.vue                # Task list page with empty state
    login.vue                # Split-panel login
  stores/
    auth.ts                  # Token storage, login/logout
    task.ts                  # Task CRUD, date selection, search
  types/
    task.ts                  # Task interface
  utils/
    date.ts                  # getLocalDate() helper
tailwind.config.ts           # Custom theme tokens (colors, fonts, shadows)
nuxt.config.ts               # Modules: @nuxtjs/tailwindcss, @pinia/nuxt
```

### Data flow

```
UI component → Pinia store action → useApi() → backend → state update → reactive UI
```

### Key conventions

- All API calls go through `useApi()` — never call `$fetch` directly
- Store actions own all API logic; components call store methods only
- `TaskRow.vue` is the single source of truth for task row markup — do not duplicate it in `TaskList.vue`
- Types live in `app/types/`; avoid `any` — use typed generics on `useApi<T>()`
- Auth token lives in both the `token` cookie (for SSR/middleware) and `authStore.token` (reactive)

## Design System

**Fonts**: Playfair Display (headings/display) + Outfit (body) — loaded via Google Fonts in `main.css`

**Color tokens** (defined in `tailwind.config.ts`):

| Token | Value | Usage |
|---|---|---|
| `canvas` | `#FAFAF7` | Page background |
| `ink` | `#0F1117` | Primary text, buttons |
| `ink-soft` | `#1C2133` | Hover state for dark elements |
| `ink-muted` | `#6B7280` | Secondary text, icons |
| `cream` | `#F5F0E8` | Light surfaces |
| `cream-dark` | `#E8E0D0` | Borders |
| `amber-accent` | `#E8A838` | Brand accent, focus rings |
| `amber-light` | `#FDF3DC` | Hover tints |

**Tailwind version**: v3.4.x via `@nuxtjs/tailwindcss`. The `@tailwindcss/vite` and `@tailwindcss/postcss` packages in devDependencies are v4 orphans — do not rely on them.

## Common Patterns

### Adding a new store action

```ts
// In app/stores/task.ts
async myAction(payload: MyType) {
  const api = useApi()
  await api<ExpectedResponse>('/endpoint', { method: 'POST', body: payload })
  await this.fetchTasks() // or mutate state directly for optimistic updates
}
```

### Typed API call

```ts
interface MyResponse { data: { id: number } }
const res = await api<MyResponse>('/endpoint')
// res.data.id is typed
```

### Adding a new page

1. Create `app/pages/my-page.vue`
2. Add `definePageMeta({ middleware: 'auth' })` if it requires login
3. Nuxt auto-registers the route as `/my-page`

## Known Issues / Watch-outs

- `vuedraggable` must be used inside `<client-only>` — it accesses the DOM directly
- `useCookie` returns a reactive ref; read `.value` to get the string, not the ref
- The backend returns tokens at `res.data.token` (not `res.token`) — see `authStore.login`
- Search debounce (300 ms) is handled in `TaskList.vue`; the store's `search` field is the source of truth watched by the sidebar date nav too
