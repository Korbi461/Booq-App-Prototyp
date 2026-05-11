# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build
```

No test runner or linter is configured.

## Architecture

**booq** is a mobile-first book discovery SPA. The UI is constrained to `max-w-lg` and designed to feel like a native mobile app.

### Routing & Layout

All routes share a single `Layout` wrapper defined in [src/app/routes.tsx](src/app/routes.tsx) that provides the global header and `<BottomNav>`. Routes are flat — no nested layouts. Each screen is a full-height flex column inside `<main className="flex-1 overflow-hidden">`.

### State & Persistence

There is no global state manager. Each screen owns its state via `useState`. Cross-screen persistence uses `localStorage` directly (keys: `likedBooks`, `superLikedBooks`, `cart`). The Discover screen writes to localStorage on every swipe; Bookshelf and Cart read from it on mount.

### Swipe Mechanics

[SwipeCard.tsx](src/app/components/SwipeCard.tsx) uses `motion` (imported from `motion/react`) with `useMotionValue` + `useTransform` for drag-driven rotation, opacity, and color overlays. Swipe thresholds are `±100px` horizontal / `-100px` vertical. The `onSwipe` callback fires immediately; the card exits via `animate={{ x: exitX, y: exitY }}` with a spring transition.

### Styling

- **Tailwind CSS v4** — configured via `@tailwindcss/vite` plugin (no `tailwind.config.js`).
- Design tokens live in [src/styles/theme.css](src/styles/theme.css) as CSS custom properties (`--primary`, `--radius`, etc.) and are mapped into Tailwind via `@theme inline`.
- shadcn/ui components are in [src/app/components/ui/](src/app/components/ui/) — these wrap Radix UI primitives with the token-based classes.
- Prefer Lucide React for icons; MUI icons are present but secondary.

### Vite Config

A custom `figmaAssetResolver()` plugin maps `figma:asset/<filename>` virtual imports to `src/assets/<filename>`. The comment in [vite.config.ts](vite.config.ts) notes that both `react()` and `tailwindcss()` plugins must remain even if Tailwind is unused.

### Mock Data

All book data is hardcoded in [src/app/data/books.ts](src/app/data/books.ts) (8 entries). The `Book` interface (`id`, `title`, `author`, `summary`, `price`, `coverUrl`, `genre`) is the core domain type used everywhere. There is no backend.
