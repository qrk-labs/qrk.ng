# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

QRK.NG is a Next.js 15 marketing website for QRK, a tech research startup. It features a static blog system powered by MDX and uses the T3 Stack foundation.

## Commands

```bash
bun run dev          # Start development server
bun run build        # Build production application
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint issues
bun run typecheck    # Run TypeScript type checking
bun run check        # Run both lint and typecheck
bun run format:check # Check Prettier formatting
bun run format:write # Fix formatting with Prettier
```

## Architecture

### App Router Structure
- `/src/app/` - Next.js 15 App Router pages (Server Components by default)
- `/src/app/blog/[slug]/` - Dynamic blog post routes
- `/src/app/about-us/` - Team and mission page

### Key Directories
- `/src/components/ui/` - Radix UI-based reusable components with CVA variants
- `/src/lib/` - Utilities: theme context, blog loading, PostHog analytics
- `/src/content/blog/` - MDX blog posts with YAML frontmatter
- `/src/types/` - TypeScript type definitions

### Blog System
Blog posts are MDX files in `/src/content/blog/` with frontmatter:
```yaml
---
title: "Post Title"
description: "Description"
publishedAt: "2024-01-01"
author: "Author Name"
---
```

Posts are loaded via `/src/lib/blog.ts` which extracts metadata using `gray-matter`.

### Theme System
Light/dark mode managed via React Context (`/src/lib/theme.tsx`) with localStorage persistence. Only components needing theme state use "use client".

## Code Style

### Imports
- Use `@/*` path aliases for imports from `src/*`
- Use inline type imports: `import type { X } from "y"`

### TypeScript
- Strict mode with `noUncheckedIndexedAccess` enabled
- Unused variables with `_` prefix are allowed

### Components
- Use class-variance-authority (CVA) for component variants
- Use Radix UI primitives for accessible components
- Minimize "use client" directives - prefer Server Components

### Validation
- Use Zod for schema validation
- Environment variables validated in `/src/env.js`

## Environment Variables
Required variables (see `.env.example`):
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog analytics key
- `NEXT_PUBLIC_SERVER_URL` - Server URL for API calls
