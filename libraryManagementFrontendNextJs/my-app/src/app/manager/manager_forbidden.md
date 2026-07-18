# Manager Module — Forbidden Patterns

> **Rule 40 compliance.** Every pattern listed here is explicitly NOT allowed in this module.

## Imports & Module Boundaries (Rule 67)
- **NEVER** import anything from another feature module (e.g., `admin`, `superadmin`, `student`).
- **NEVER** hardcode routes to other modules. Use `MANAGER_ROUTES` from `manager_url_config.ts`.
- **NEVER** use barrel files (`index.ts`). Always import directly from the named file.
- **NEVER** use relative imports (`../../`). Always use `@/app/manager/...`.

## TypeScript (Rules 27, 60)
- **NEVER** use the `any` type. Use `unknown` and validate with Zod.
- **NEVER** use `@ts-ignore` or `@ts-nocheck`.
- **NEVER** define interfaces inside component `.tsx` files — put them in `_types.ts`.

## Logging & Console (Rule 46)
- **NEVER** use `console.log`, `console.error`, or `console.warn` in committed code.
- Use the centralized `src/lib/logger.ts` utility instead.

## URLs & API Routes (Rule 11)
- **NEVER** hardcode URL strings in components or hooks.
- All routes must be imported from `manager_url_config.ts`.

## UI & Styling (Rules 4, 36)
- **NEVER** use arbitrary Tailwind values (e.g., `bg-[#1A1A2E]`, `w-[325px]`).
- **NEVER** use `bg-[var(--bg-card)]` — map the variable in `tailwind.config.ts` and use the token class.
- **NEVER** use inline `style={{ color: '#...' }}` for theme colors.
- **NEVER** use hardcoded hex values in `.tsx` files — all hex lives in `manager.css` or `globals.css`.

## State Management (Rules 44, 16)
- **NEVER** use multiple boolean flags for async state (`isLoading`, `isError`). Use `FetchState` enum.
- **NEVER** use individual `useState` for forms with 3+ fields. Use React Hook Form + Zod.

## Server / Client Boundaries (Rule 8)
- **NEVER** add `'use client'` directly to `page.tsx`. Pages must be Server Components.
- All client interactivity must live in a `*Client.tsx` component.

## Data & Messages (Rules 14, 35)
- **NEVER** hardcode toast/alert messages (e.g., `'User created successfully'`). Display `response.message` from the backend.
- **NEVER** use raw magic strings or numbers in logic. Use TypeScript enums or `const` objects.

## Navigation (Rule 42)
- **NEVER** store filterable/searchable/paginated state in local `useState` only. Sync to URL via `useSearchParams`.

## Components (Rules 19, 32, 52)
- **NEVER** add a View/Eye button to tables — clicking the row navigates to the detail page.
- **NEVER** create `index.ts` barrel files.
- **NEVER** use prop spreading (`<Component {...props} />`).
