# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality (uses Biome)
npm run biome:check          # Run Biome checks
npm run biome:format         # Format all code with Biome
npm run biome:format:changed # Format only changed files (vs default branch)
npm run biome:format:staged  # Format only staged files
npm run biome:fix            # Fix code issues with Biome (--write --unsafe)
npm run lint                 # Run Next.js ESLint

# Database
npm run db:start     # Start MongoDB via docker-compose
```

## Architecture

### Tech Stack
- **Next.js 15** with App Router and React Server Components
- **TypeScript** with strict mode
- **MongoDB** with typed collections
- **Better Auth** for Google OAuth authentication
- **AWS S3** for image storage
- **Tailwind CSS** with shadcn/ui components
- **Biome** for linting and formatting

### Route Structure
- `src/app/(main)/[lang]/` - Public website with i18n support (vi, en)
- `src/app/admin/` - Admin panel (protected, no i18n)
- `src/app/api/` - API routes

### Component Architecture Pattern
Complex components follow this structure:
- `component.tsx` - Server component (main entry point)
- `component.ui.tsx` - Client display components (`'use client'`)
- `component.state.tsx` - State management with `createReducerContext`
- `component.type.ts` - Shared types

### Server/Client Component Separation
- Server components handle: data fetching, authentication, content composition
- Client components handle: interactivity, state, event handlers
- Pass content as `children` to client components; server composes, client renders

### Database Types
- Document types use `Document` suffix (e.g., `ProductDocument`)
- Client-facing interfaces are clean (e.g., `Product`)
- Always convert database documents to client interfaces before returning

### Path Alias
Use `src/*` for imports (configured in tsconfig.json).

## Code Style Rules

### File Editing
- **Always format files after editing**: After making changes to any file, run `npm run biome:format:changed` to format only the changed files according to project standards

### TypeScript
- Use `interface` over `type` (except for unions/mapped types)
- Use `enum` for fixed value sets, not string literal unions
- Hoist type/interface definitions to top of file
- Every function requires JSDoc with purpose, params, and return description
- Never use inline imports like `import("path").TypeName`

### Tailwind CSS
- Use `size-x` instead of `w-x h-x`
- Use `pile` class instead of `absolute` positioning
- Prefer `grid` for layout; use `flex` only when grid cannot solve it
- Use tokenized colors (`bg-primary`, `text-muted`) not palette values (`bg-blue-800`)
- Separate semantic, layout, and breakpoint classes into different strings with `cn()`

### React Patterns
- Never use `useCallback`/`useMemo` unless passing to memoized children
- Never use `useEffect` except for syncing with external resources
- Use `useReducer` over `useState` for complex state
- Use `createReducerContext` for state management
- Transform raw context hooks into domain-specific hooks
