# admin_coupons Module — Forbidden Patterns

> **Rule 40 compliance.** Every pattern listed here is explicitly NOT allowed in this module.

## Server / Client Boundaries (Rule 8)
- **NEVER** add `'use client'` directly to `page.tsx`. Pages must be Server Components.
- All client interactivity must live in `admin_coupons_components/AdminCouponsClient.tsx`.

## TypeScript (Rules 27, 60)
- **NEVER** use the `any` type (`data.map((c: any) => ...)`). Use strict types (`CouponRecord`).
- **NEVER** use `@ts-ignore` or `@ts-nocheck`.
- **NEVER** define interfaces inside component `.tsx` files — put them in `admin_coupons_types.ts`.

## Form Handling & Validation (Rule 16, 48)
- **NEVER** use manual validation (`validate()`) and individual `useState` for coupon fields.
- **ALWAYS** use React Hook Form + Zod schema validation.
- **ALWAYS** intercept `beforeunload` when form is modified (`Rule 48`).

## UI & Styling (Rules 4, 36, 14, 49)
- **NEVER** use inline style properties like `style={{ fontFamily: 'monospace' }}`. Use Tailwind token classes.
- **NEVER** hardcode toast messages or UI feedback. Use `response.message`.
- **NEVER** display coupon codes or IDs without a copy-to-clipboard icon (`Rule 49`).

## State & Performance (Rules 42, 44, 26, 50)
- **NEVER** store search/filter state locally only. Sync to URL query params (`useSearchParams`).
- **NEVER** use boolean flags (`isLoading`). Use `FetchState = 'idle' | 'loading' | 'success' | 'error'`.
- **ALWAYS** implement dedicated skeleton loaders (`AdminCouponsSkeleton.tsx`) and empty states (`AdminCouponsEmptyState.tsx`).
