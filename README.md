# 📝 Todo App (Nuxt 4 + Pinia)

## Overview

This is a task management frontend built with **Nuxt 4**, **Pinia**, and **TailwindCSS**.
It interacts with a backend API to perform CRUD operations on tasks.

The app is designed with scalability and maintainability in mind, using modular architecture and clear separation of concerns.

---

## Tech Stack

* **Nuxt 4** – Application framework
* **Vue 3 (Composition API)** – UI layer
* **Pinia** – State management
* **TailwindCSS** – Styling
* **TypeScript** – Type safety

---

## Project Structure

```
app/
  components/
    layout/
    task/
  composables/
    useApi.ts
  pages/
    index.vue
    login.vue
  stores/
    auth.ts
    task.ts
```

---

## Architecture

### State Management

We use **Pinia** for centralized state.

* `taskStore` handles:

  * Task list state
  * Filtering (search/date)
  * CRUD operations

### API Handling

All API calls go through:

```
useApi()
```

This ensures:

* Consistent request handling
* Centralized headers/auth logic

---

## Data Flow

```
UI Component
   ↓
Pinia Store Action
   ↓
API Request (useApi)
   ↓
State Update
   ↓
Reactive UI Update
```

---

## Key Features

* Create, update, delete tasks
* Toggle completion state
* Filter by date
* Search tasks
* Optimistic UI updates (partial)

---

## Design Decisions

### Why Pinia?

* Lightweight and simple
* Native Vue 3 support
* Easy debugging

### Why Composables?

* Promote reuse
* Decouple logic from components

### Why Component Segmentation?

* Improves readability
* Enables independent testing

---

## Areas for Improvement (Future Work)

* Add centralized error handling
* Introduce request caching (Vue Query or custom)
* Improve loading state granularity
* Add unit and integration tests
* Implement debounce for search

---

## Setup

```bash
pnpm install
pnpm dev
```

---

## Environment

Create `.env`:

```
NUXT_PUBLIC_API_BASE=http://localhost:8000/api
```

---

## Notes for Handoff

* Business logic is primarily in `taskStore`
* API abstraction is handled via `useApi`
* Components are intentionally lightweight
* Safe to extend with additional features like tagging, priorities, etc.

