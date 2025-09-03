# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Vietnamese air duct company website for Công ty TNHH Nghiệp Hưng, built with Next.js 15 and TypeScript. The project uses the modern App Router architecture, Tailwind CSS v4 for styling, and shadcn/ui components based on Radix UI primitives. The website is automatically synced with v0.app and deployed on Vercel, featuring a responsive design with Vietnamese content for air duct manufacturing and installation services.

## Development Commands

The project uses npm as the package manager. Available commands:

- `npm dev` - Start development server on http://localhost:3000
- `npm build` - Create production build
- `npm start` - Start production server (after build)
- `npm lint` - Run Next.js ESLint linting

## Architecture & Structure

### App Router Layout

- Uses Next.js 15 App Router with TypeScript
- Single-page application with sections: Hero, About, Products, Projects, Contact
- Splash screen animation on initial load (3.5s duration)
- Hash-based navigation for smooth scrolling between sections

### Component Structure

```
app/
  layout.tsx          # Root layout with fonts and metadata
  page.tsx           # Main page with all sections
  globals.css        # Global styles and Tailwind imports

components/
  about-section.tsx
  contact-dialog.tsx
  contact-section.tsx
  footer.tsx
  header.tsx
  hero-section.tsx
  product-gallery-dialog.tsx
  products-section.tsx
  projects-section.tsx
  splash-screen.tsx
  theme-provider.tsx
  ui/               # shadcn/ui components

lib/
  utils.ts          # cn() utility and other helpers

public/
  *.png, *.svg      # Images and assets
```

### Key Design Patterns

- Modal dialogs for product galleries using Radix Dialog primitives
- Form handling with react-hook-form and Zod validation
- Responsive grid layouts with Tailwind CSS
- Image optimization disabled (`unoptimized: true`)
- Vietnamese language content throughout

## Technical Configuration

### TypeScript & Path Aliases

- TypeScript strict mode enabled
- Path alias: `@/*` maps to project root
- Build errors ignored in production (`ignoreBuildErrors: true`)

### Styling & UI

- Tailwind CSS v4 with PostCSS integration
- shadcn/ui component library (New York style)
- Custom fonts: Montserrat (headings) and Open Sans (body text)
- CSS variables for theming
- Responsive design with mobile-first approach

### Form Handling

- react-hook-form for form state management
- Zod for schema validation
- @hookform/resolvers for integration

### Key Dependencies

- Next.js 15.2.4
- React 19
- Tailwind CSS 4.1.9
- Radix UI primitives
- Framer Motion for animations
- Lucide React for icons

## Development Workflow

### v0.app Integration

This project is automatically synced with v0.app. Changes made in v0.app are automatically pushed to this repository and deployed via Vercel.

### Local Development

1. Install dependencies: `npm install`
2. Start development server: `npm dev`
3. Components can be modified locally, but be aware of v0.app sync

### Component Development

- Use the existing component patterns for consistency
- Leverage the `cn()` utility from `lib/utils.ts` for conditional classes
- Follow shadcn/ui conventions for new components
- Maintain Vietnamese language content

### Build Configuration

- ESLint and TypeScript errors are ignored during build
- Image optimization is disabled for faster builds
- Development builds include source maps

## Utility Functions

### cn() Helper

Located in `lib/utils.ts`, this utility combines clsx and tailwind-merge:

```typescript path=/Users/quanvo/Documents/git-repos/personal/nghiep-hung-website/lib/utils.ts start=1
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Use this for conditional className combinations with proper Tailwind class merging.

## Key Features

### Splash Screen

- Animated company logo display on initial load
- 3.5 second duration with smooth transitions
- Handles hash navigation after completion

### Product Gallery

- Modal dialogs for product image galleries
- Responsive image grids
- Touch/swipe support for mobile

### Contact Forms

- Integrated contact dialog with form validation
- Phone number and email validation
- Vietnamese form labels and messages

### Responsive Design

- Mobile-first approach
- Breakpoint system: sm, md, lg, xl
- Optimized layouts for all screen sizes

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Next.js 15 App Router](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [v0.app](https://v0.app/) - UI component generator
