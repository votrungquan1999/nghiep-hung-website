# Architecture Overview

## Tech Stack

### Core Framework
- **Next.js 15** with App Router and React Server Components
- **TypeScript** with strict mode enabled
- **React 19** for UI components

### Backend & Data
- **MongoDB** with typed collections using singleton pattern
- **Better Auth** for Google OAuth authentication
- **AWS S3** for image storage with presigned URLs

### Styling & UI
- **Tailwind CSS** with custom configuration
- **Radix UI** primitives for accessible components
- **Framer Motion** for animations
- **shadcn/ui** component patterns

### Code Quality
- **Biome** for linting and formatting (primary tool)
- **ESLint** for Next.js specific rules
- **Vitest** for testing

## Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (main)/[lang]/     # Public routes with i18n (vi, en)
│   ├── admin/             # Admin panel (protected, no i18n)
│   ├── api/               # API routes
│   ├── login/             # Login page
│   └── unauthorized/      # Unauthorized access page
├── components/            # Reusable React components
├── contexts/              # React context utilities
├── lib/                   # Core utilities and configurations
│   ├── i18n/             # Internationalization config
│   ├── auth.ts           # Better Auth configuration
│   ├── database.ts       # MongoDB singleton client
│   └── s3.ts             # AWS S3 utilities
└── server/                # Server-side business logic
    ├── products/          # Product domain queries/mutations
    ├── services/          # Services domain
    ├── projects/          # Projects domain
    └── contact/           # Contact info domain
```

## Route Architecture

### Public Routes (`(main)/[lang]/`)
- Supports Vietnamese (vi) and English (en)
- Server components by default
- Pages: home, about, products, services, projects, contact, privacy-policy

### Admin Routes (`admin/`)
- Protected with Better Auth + email whitelist
- No internationalization
- Pages: dashboard, products, services, projects, contact management

### API Routes (`api/`)
- `/api/auth/[...all]` - Better Auth endpoints

## Server/Client Component Strategy

### Server Components (Default)
**Responsibilities:**
- Data fetching from MongoDB
- Authentication checks
- Content composition
- Passing data as props to client components

**Example:** `src/app/admin/products/page.tsx`

### Client Components (`'use client'`)
**Responsibilities:**
- Interactivity and event handlers
- State management
- Animations and transitions
- Browser APIs

**Pattern:** Server components compose and pass content as `children` to client components

## Data Layer

### Server Queries & Mutations
Located in `src/server/[domain]/`

**Naming conventions:**
- `get-*.query.ts` - Data fetching (wrapped with React `cache()`)
- `*-mutation.ts` - Data modifications (not cached)
- `*.type.ts` - Shared types

**Example structure:**
```
src/server/products/
├── get-product-by-id.query.ts
├── get-product-counts.query.ts
├── product.type.ts
└── index.ts (exports)
```

See [02-data-patterns.md](./02-data-patterns.md) for details.

## Authentication Flow

1. User clicks "Sign in with Google"
2. Better Auth handles OAuth flow
3. On success, checks email against `ADMIN_EMAILS` env var
4. Authorized users access admin panel
5. Unauthorized users redirected to `/unauthorized`

See [03-auth-patterns.md](./03-auth-patterns.md) for implementation details.

## Image Storage

- All product/project images stored in AWS S3
- Upload handled by server actions
- Presigned URLs for temporary access
- Image cleanup on deletion

See [04-file-upload.md](./04-file-upload.md) for implementation.

## Internationalization

- Two languages: Vietnamese (vi - default) and English (en)
- Dictionary-based translations in `src/lib/i18n/dictionaries/`
- Language code in URL: `/[lang]/page`
- Admin panel uses no i18n

See [05-i18n-patterns.md](./05-i18n-patterns.md) for usage.

## Component Architecture

Complex components follow a three-file pattern:
- `component.tsx` - Server component (entry point)
- `component.ui.tsx` - Client display component
- `component.state.tsx` - State management with `createReducerContext`
- `component.type.ts` - Shared types

See [06-component-patterns.md](./06-component-patterns.md) for details.
