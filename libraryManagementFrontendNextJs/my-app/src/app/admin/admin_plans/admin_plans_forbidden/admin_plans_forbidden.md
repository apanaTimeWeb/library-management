# admin_plans Module — Forbidden Patterns

> **Rule 40 compliance.** Every pattern listed here is explicitly NOT allowed in this module.

## Server / Client Boundaries (Rule 8)
- **NEVER** add `'use client'` directly to `page.tsx`. Pages must be Server Components.
- All client interactivity must live in `admin_plans_components/AdminPlansClient.tsx`.

## TypeScript & React Keys (Rules 27, 57, 60)
- **NEVER** use the `any` type (`data.map((p: any) => ...)`). Use strict types (`PlanRecord`).
- **NEVER** use `key={index}` when mapping lists (e.g., `plan.features.map((feat, i) => <li key={i}>`). Always use unique feature strings or stable IDs.
- **NEVER** use `@ts-ignore` or `@ts-nocheck`.
- **NEVER** define interfaces inside component `.tsx` files — put them in `admin_plans_types.ts`.

## Form Handling & Validation (Rule 16, 48)
- **NEVER** use manual validation and individual `useState` (`FormState`).
- **ALWAYS** use React Hook Form + Zod schema validation.
- **ALWAYS** intercept `beforeunload` when form is modified (`Rule 48`).

## UI & Styling (Rules 4, 36, 14)
- **NEVER** use arbitrary inline styles or hardcoded colors.
- **NEVER** hardcode toast messages or UI alerts. Use `response.message`.

## State & Performance (Rules 44, 26, 50)
- **NEVER** use boolean flags (`isLoading`). Use `FetchState = 'idle' | 'loading' | 'success' | 'error'`.
- **ALWAYS** implement dedicated skeleton loaders (`AdminPlansSkeleton.tsx`) and empty states (`AdminPlansEmptyState.tsx`).
