# admin_blacklist Module — Forbidden Patterns

> **Rule 40 compliance.** Every pattern listed here is explicitly NOT allowed in this module.

## Server / Client Boundaries (Rule 8)
- **NEVER** add `'use client'` directly to `page.tsx`. Pages must be Server Components.
- All client interactivity must live in `admin_blacklist_components/AdminBlacklistClient.tsx`.

## TypeScript (Rules 27, 60)
- **NEVER** use the `any` type (`data.map((b: any) => ...)`). Use strict types (`BlacklistedStudent`).
- **NEVER** use `@ts-ignore` or `@ts-nocheck`.
- **NEVER** define interfaces inside component `.tsx` files — put them in `admin_blacklist_types.ts`.

## Form Handling & Validation (Rule 16, 48)
- **NEVER** use manual validation (`validate()`) and individual `useState` for blacklist form fields.
- **ALWAYS** use React Hook Form + Zod schema validation.
- **ALWAYS** intercept `beforeunload` when form is modified (`Rule 48`).

## UI & Styling (Rules 4, 36, 14, 45, 19, 49)
- **NEVER** use inline style variables like `style={{ color: 'var(--danger)' }}` or `style={{ background: 'var(--danger-bg)' }}`. Use Tailwind token classes.
- **NEVER** hardcode toast messages (`toast.success('Student blacklisted successfully.')`). Use `response.message`.
- **NEVER** display plain phone numbers (`9876501234`). ALWAYS mask via `maskSensitiveData()` (`98****1234`).
- **NEVER** leave `onRowClicked` as a no-op `() => {}`. Rows must be clickable.
- **NEVER** display student IDs without a copy-to-clipboard icon.

## State & Performance (Rules 42, 44, 26, 50)
- **NEVER** store search/filter state locally only. Sync to URL query params (`useSearchParams`).
- **NEVER** use boolean flags (`isLoading`). Use `FetchState = 'idle' | 'loading' | 'success' | 'error'`.
- **ALWAYS** implement dedicated skeleton loaders (`AdminBlacklistSkeleton.tsx`) and empty states (`AdminBlacklistEmptyState.tsx`).
