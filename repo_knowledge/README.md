# Repository Knowledge Base

This folder contains comprehensive documentation about the Nghiep Hung website codebase, its architecture, patterns, and conventions.

## Document Index

### 01. Architecture Overview
**[01-architecture.md](./01-architecture.md)**

Overview of the tech stack, project structure, and system design:
- Next.js 15 with App Router
- MongoDB with Better Auth
- AWS S3 for file storage
- Route architecture (public vs admin)
- Server/client component strategy

**Read this first** to understand the overall system.

### 02. Data Layer Patterns
**[02-data-patterns.md](./02-data-patterns.md)**

Database and data fetching patterns:
- MongoDB singleton pattern
- Document types vs client types
- Server queries with React cache()
- Server mutations with revalidation
- Cache management
- Domain organization

**Essential for** working with database queries and mutations.

### 03. Authentication & Authorization
**[03-auth-patterns.md](./03-auth-patterns.md)**

Authentication and authorization implementation:
- Better Auth with Google OAuth
- Admin authorization with email whitelist
- Server-side protection with `requireAdminAuth()`
- Client-side auth state
- Session management

**Required reading** before working on admin features.

### 04. File Upload & S3 Storage
**[04-file-upload.md](./04-file-upload.md)**

Image storage and upload patterns:
- AWS S3 client configuration
- Upload/delete utilities
- Image gallery component
- Database storage patterns
- S3 bucket configuration

**Reference this** when implementing file upload features.

### 05. Internationalization (i18n)
**[05-i18n-patterns.md](./05-i18n-patterns.md)**

Multi-language support patterns:
- Vietnamese and English support
- Dictionary system
- URL structure with language prefix
- Server vs client component translations
- Database content i18n with MultilingualText

**Important for** public-facing features (admin has no i18n).

### 06. Component Architecture
**[06-component-patterns.md](./06-component-patterns.md)**

Component organization and state management:
- Three-file component pattern (`.tsx`, `.ui.tsx`, `.state.tsx`)
- Server vs client component separation
- `createReducerContext` pattern
- Domain-specific hooks
- Component composition strategies

**Master this** to write components consistently.

### 07. Coding Conventions
**[07-coding-conventions.md](./07-coding-conventions.md)**

Code style and best practices:
- TypeScript conventions (interface vs type, enums, JSDoc)
- React patterns (hooks, state management)
- Tailwind CSS conventions
- File organization and naming
- Anti-over-engineering principles
- Biome formatting

**Follow these rules** for all code contributions.

## Quick Reference

### Starting a New Feature

1. Read [01-architecture.md](./01-architecture.md) for system overview
2. Check [02-data-patterns.md](./02-data-patterns.md) if working with database
3. Review [06-component-patterns.md](./06-component-patterns.md) for component structure
4. Follow [07-coding-conventions.md](./07-coding-conventions.md) for code style
5. Run `npm run biome:format:changed` after editing

### Common Tasks

**Adding a new page:**
- Public page: `src/app/(main)/[lang]/your-page/page.tsx`
- Admin page: `src/app/admin/your-page/page.tsx`
- See: [01-architecture.md](./01-architecture.md#route-architecture)

**Creating a server query:**
- Location: `src/server/[domain]/get-*.query.ts`
- Wrap with React `cache()`
- See: [02-data-patterns.md](./02-data-patterns.md#server-queries)

**Protecting an admin route:**
- Use `requireAdminAuth()` at page level
- See: [03-auth-patterns.md](./03-auth-patterns.md#admin-authorization)

**Adding translations:**
- Edit `src/lib/i18n/dictionaries.ts`
- Update both `vi` and `en` sections
- See: [05-i18n-patterns.md](./05-i18n-patterns.md#dictionary-system)

**Creating a stateful component:**
- Use three-file pattern
- Implement with `createReducerContext`
- See: [06-component-patterns.md](./06-component-patterns.md#state-management-pattern)

**Uploading images:**
- Use `uploadToS3(file, key)` utility
- Store result in MongoDB
- See: [04-file-upload.md](./04-file-upload.md#s3-utilities)

## File Cross-References

Documents reference each other to avoid duplication:

```
01-architecture.md
  ├─> references 02-data-patterns.md (data layer)
  ├─> references 03-auth-patterns.md (authentication)
  ├─> references 04-file-upload.md (image storage)
  ├─> references 05-i18n-patterns.md (internationalization)
  └─> references 06-component-patterns.md (components)

06-component-patterns.md
  └─> references 07-coding-conventions.md (TypeScript rules)

07-coding-conventions.md
  ├─> references 02-data-patterns.md (data fetching)
  └─> references 03-auth-patterns.md (authentication)
```

## Keeping Documentation Updated

When making significant changes to patterns or architecture:

1. Update the relevant documentation file
2. Update cross-references if structure changes
3. Keep code examples in sync with implementation
4. Add new sections for new patterns

## Additional Resources

- **Project README:** `/README.md` - Setup and deployment
- **CLAUDE.md:** `/CLAUDE.md` - Claude-specific instructions
- **Biome Config:** `/biome.json` - Code formatting rules
- **TypeScript Config:** `/tsconfig.json` - TS configuration
