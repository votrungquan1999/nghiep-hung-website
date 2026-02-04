# Authentication & Authorization Patterns

## Overview

The application uses **Better Auth** with Google OAuth for admin authentication. Only whitelisted email addresses can access the admin panel.

## Better Auth Configuration

**Location:** `src/lib/auth.ts`

**Key features:**
- Google OAuth only (no email/password)
- MongoDB adapter for session storage
- Session expires after 7 days
- Session updates every 24 hours

**Configuration:**
```typescript
export const auth = betterAuth({
  database: mongodbAdapter(await getDatabase()),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectURI: "https://your-domain.com/api/auth/callback/google",
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 1 week
    updateAge: 60 * 60 * 24, // 1 day
  },
});
```

**Required Environment Variables:**
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `BETTER_AUTH_URL` - Base URL (e.g., http://localhost:3000)
- `ADMIN_EMAILS` - Comma-separated list of authorized admin emails

## Admin Authorization

### Server-Side Protection

**Location:** `src/lib/admin-auth.ts`

**Function:** `requireAdminAuth()`

Use this function in admin server components to protect routes:

```typescript
import { requireAdminAuth } from "src/lib/admin-auth";

export default async function AdminPage() {
  // This will redirect to /login if not authenticated
  // or /unauthorized if email is not in ADMIN_EMAILS
  const session = await requireAdminAuth();

  // User is authenticated and authorized
  return <div>Welcome {session.user.name}</div>;
}
```

**Flow:**
1. Check if user has valid session
2. If no session → redirect to `/login`
3. If session exists, check email against `ADMIN_EMAILS`
4. If not authorized → redirect to `/unauthorized`
5. If authorized → return session

### Client-Side Permission Check

**Function:** `checkAdminPermission(email)`

Use for conditional rendering:

```typescript
import { checkAdminPermission } from "src/lib/admin-auth";

if (checkAdminPermission(user?.email)) {
  // Show admin features
}
```

## Authentication API Routes

**Location:** `src/app/api/auth/[...all]/route.ts`

Better Auth automatically handles:
- `/api/auth/sign-in/social` - Initiate OAuth flow
- `/api/auth/callback/google` - OAuth callback
- `/api/auth/sign-out` - Sign out
- `/api/auth/session` - Get current session

## Client-Side Auth

**Location:** `src/lib/auth-client.ts`

For client components that need auth state:

```typescript
import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
```

**Usage in components:**
```typescript
"use client";
import { useSession, signIn, signOut } from "src/lib/auth-client";

export function AuthButton() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;

  if (session) {
    return <button onClick={() => signOut()}>Sign out</button>;
  }

  return <button onClick={() => signIn.social({ provider: "google" })}>
    Sign in with Google
  </button>;
}
```

## Protected Routes

### Admin Pages Pattern

All pages under `src/app/admin/` should call `requireAdminAuth()`:

```typescript
// src/app/admin/products/page.tsx
import { requireAdminAuth } from "src/lib/admin-auth";

export default async function AdminProductsPage() {
  await requireAdminAuth();

  // Rest of page implementation
}
```

### Public Pages

Public pages in `src/app/(main)/[lang]/` do NOT require authentication.

## Login Flow

1. User navigates to `/admin`
2. `requireAdminAuth()` detects no session
3. Redirects to `/login`
4. User clicks "Sign in with Google"
5. Better Auth OAuth flow completes
6. Callback to `/api/auth/callback/google`
7. If email in `ADMIN_EMAILS` → redirect to `/admin`
8. If email NOT in `ADMIN_EMAILS` → redirect to `/unauthorized`

## Session Management

### MongoDB Collections

Better Auth creates these collections:
- `user` - User profiles from OAuth
- `session` - Active sessions
- `account` - OAuth provider accounts

### Session Data

```typescript
interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  session: {
    id: string;
    expiresAt: Date;
  };
}
```

## Environment Setup

### Local Development

```bash
# .env.local
BETTER_AUTH_SECRET=your-random-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

ADMIN_EMAILS=admin@example.com,your-email@gmail.com
```

### Production

Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` to production domain:

```bash
BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_BETTER_AUTH_URL=https://yourdomain.com
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://yourdomain.com/api/auth/callback/google`
4. Copy client ID and secret to environment variables
