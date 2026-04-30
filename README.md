# Taskr — Frontend

A focused task management app built with Nuxt 4, Pinia, and TailwindCSS.

## Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 4 |
| UI | Vue 3 Composition API |
| State | Pinia |
| Styling | TailwindCSS v3 + custom theme tokens |
| Type safety | TypeScript (strict) |
| Icons | Lucide Vue Next |
| Drag & drop | vuedraggable |

## Getting Started

```bash
pnpm install
cp .env.copy .env   # then set NUXT_PUBLIC_API_BASE
pnpm dev            # http://localhost:3000
```

### Environment

```env
NUXT_PUBLIC_API_BASE=http://localhost:8000/api
```

## Project Structure

```
app/
├── assets/css/main.css        # Tailwind + Google Fonts
├── components/
│   ├── layout/
│   │   ├── Header.vue         # Search + user menu
│   │   └── Sidebar.vue        # Date navigation + progress
│   └── task/
│       ├── TaskInput.vue      # Add-task input
│       ├── TaskList.vue       # Drag/search orchestration
│       └── TaskRow.vue        # Shared task row component
├── composables/
│   └── useApi.ts              # Authenticated $fetch wrapper
├── layouts/
│   ├── auth.vue               # Login shell
│   └── default.vue            # App shell (sidebar + header)
├── middleware/
│   ├── auth.ts                # Guard: requires login
│   └── guest.ts               # Guard: redirects if logged in
├── pages/
│   ├── index.vue              # Task list + empty state
│   └── login.vue              # Split-panel login page
├── stores/
│   ├── auth.ts                # Authentication store
│   └── task.ts                # Task CRUD + filters
├── types/
│   └── task.ts                # Task interface
└── utils/
    └── date.ts                # getLocalDate() helper
tailwind.config.ts             # Design tokens
nuxt.config.ts                 # Nuxt configuration
```

## Features

- Create, edit, delete, and complete tasks
- Drag-and-drop reordering (persisted to backend)
- Date navigation — browse tasks by day
- Live search with 300 ms debounce
- "Getting Started" illustrated empty state
- Split-panel login with loading and error states
- Cookie-based authentication with middleware guards
- Progress tracker in sidebar

## Data Flow

```
UI Component
    ↓  calls store action
Pinia Store
    ↓  calls useApi()
Backend REST API
    ↓  response
State Update
    ↓  Vue reactivity
UI re-renders
```

## Design System

Fonts: **Playfair Display** (headings) + **Outfit** (body)

Custom color tokens defined in `tailwind.config.ts`:

- `canvas` — page background (`#FAFAF7`)
- `ink` / `ink-soft` / `ink-muted` — text hierarchy
- `cream` / `cream-dark` — surfaces and borders
- `amber-accent` — brand accent and interactive focus

## Architecture Notes

- All HTTP calls go through `useApi()` — never raw `$fetch`
- Store actions own all API logic; components stay thin
- `TaskRow.vue` is the single task row component — used in both drag and search modes
- Auth token lives in the `token` cookie (read by middleware) and `authStore.token` (reactive UI)
- `vuedraggable` is wrapped in `<client-only>` since it requires DOM access
