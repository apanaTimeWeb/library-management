# admin_audit-logs Module — Forbidden Patterns

> **Rule 40 compliance.** Every pattern listed here is explicitly NOT allowed in this module.

## Server / Client Boundaries (Rule 8)
- **NEVER** add `'use client'` directly to `page.tsx`. Pages must be Server Components.
- All client interactivity must live in `admin_audit-logs_components/AdminAuditLogsClient.tsx`.

## TypeScript (Rules 27, 60)
- **NEVER** use the `any` type (e.g., `data.map((l: any) => ...)`). Use `AuditLogRecord` and validate with Zod/TS.
- **NEVER** use `@ts-ignore` or `@ts-nocheck`.
- **NEVER** define interfaces inside component `.tsx` files — put them in `admin_audit-logs_types.ts`.

## Logging & Console (Rule 46)
- **NEVER** use `console.log` or `console.error` in error boundaries (`error.tsx`) or components. Use `logger.error` / `logger.info` from `@/lib/logger`.

## UI & Styling (Rules 4, 36, 19, 49)
- **NEVER** use arbitrary or hardcoded inline styles.
- **NEVER** leave `onRowClicked` as a no-op `() => {}`. Rows must be clickable with `cursor-pointer` navigating to log details.
- **NEVER** display log IDs without a copy-to-clipboard button (`Rule 49`).

## State & Performance (Rules 15, 42, 44)
- **NEVER** filter search input without debounce (`300ms`).
- **NEVER** store filter/search state locally only. Sync state to URL parameters via `useSearchParams`.
- **NEVER** use boolean flags for async states (`isLoading`). Use `FetchState = 'idle' | 'loading' | 'success' | 'error'`.

## Magic Strings (Rule 35)
- **NEVER** hardcode `severity: 'info'` or `module: 'Finance'` inline. Use enums/constants from `admin_audit-logs_constants.ts`.
