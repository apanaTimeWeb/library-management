# admin_expense-categories Module — Forbidden Patterns

> **Rule 40 compliance.** Every pattern listed here is explicitly NOT allowed in this module.

## Server / Client Boundaries (Rule 8)
- **NEVER** add `'use client'` directly to `page.tsx`. Pages must be Server Components.
- All client interactivity must live in `admin_expense-categories_components/AdminExpenseCategoriesClient.tsx`.

## TypeScript (Rules 27, 60)
- **NEVER** use the `any` type (`data.map((c: any) => ...)`). Use strict types (`ExpenseCategoryRecord`).
- **NEVER** use `@ts-ignore` or `@ts-nocheck`.
- **NEVER** define interfaces inside component `.tsx` files — put them in `admin_expense-categories_types.ts`.

## Form Handling & Validation (Rule 16, 48)
- **NEVER** use manual validation and individual `useState` for category forms.
- **ALWAYS** use React Hook Form + Zod schema validation.
- **ALWAYS** intercept `beforeunload` when form is modified (`Rule 48`).

## State & Performance (Rules 44, 26, 50)
- **NEVER** use boolean flags (`isLoading`). Use `FetchState = 'idle' | 'loading' | 'success' | 'error'`.
- **ALWAYS** implement dedicated skeleton loaders and empty states.
