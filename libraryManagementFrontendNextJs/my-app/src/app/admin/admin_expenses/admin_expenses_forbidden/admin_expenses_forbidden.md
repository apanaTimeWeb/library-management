# admin_expenses Module — Forbidden Patterns

> **Rule 40 compliance.** Every pattern listed here is explicitly NOT allowed in this module.

## Server / Client Boundaries (Rule 8)
- **NEVER** add `'use client'` directly to `page.tsx`. Pages must be Server Components.
- All client interactivity must live in `admin_expenses_components/AdminExpensesClient.tsx`.

## TypeScript (Rules 27, 60)
- **NEVER** use the `any` type (`data.map((e: any) => ...)`). Use strict types (`ExpenseRecord`).
- **NEVER** use `@ts-ignore` or `@ts-nocheck`.
- **NEVER** define interfaces inside component `.tsx` files — put them in `admin_expenses_types.ts`.

## Form Handling & Validation (Rule 16, 48)
- **NEVER** use manual validation and raw `useState` for expense forms (`Rule 16`).
- **ALWAYS** use React Hook Form + Zod schema validation.
- **ALWAYS** intercept `beforeunload` when form is modified (`Rule 48`).

## UI & Styling (Rules 4, 36, 14, 15)
- **NEVER** use inline style properties or hardcoded colors.
- **NEVER** hardcode toast messages (`toast.success('Expense recorded.')`). Use `response.message`.
- **NEVER** filter search input without debounce (`300ms`, `Rule 15`).

## State & Performance (Rules 44, 26, 50)
- **NEVER** use boolean flags (`isLoading`). Use `FetchState = 'idle' | 'loading' | 'success' | 'error'`.
- **ALWAYS** implement dedicated skeleton loaders and empty states.
