# Admin Dashboard — Forbidden Patterns

> This file explicitly lists architectural and coding patterns that are **BANNED** within the `admin_dashboard` module.

## 1. Type Casting & Inline Interfaces (Rule 7, Rule 27)
- **FORBIDDEN:** Casting API responses or complex objects using `as unknown[]`, `Record<string, unknown>`, or `any`.
- **FORBIDDEN:** Defining component props inline within `.tsx` files (e.g., `export interface AdminDashboardKpiCardProps { ... }` inside `AdminDashboardKpiCard.tsx`).
- **MANDATORY:** All interfaces and types must be defined in and exported from `admin_dashboard_types.ts`.

## 2. Shadcn / Generic Tailwind Tokens (Rule 4, Rule 36)
- **FORBIDDEN:** Using un-themed Shadcn tokens such as `text-muted-foreground`, `bg-card`, `bg-muted`, or `bg-background`.
- **FORBIDDEN:** Using arbitrary pixel or hex values like `w-[320px]`, `text-[#FF0000]`, or `shadow-[-10px_0_30px_...]`.
- **MANDATORY:** Use the design system's exact semantic classes: `text-text-secondary`, `bg-bg-card`, `bg-bg-page`, `bg-bg-input`, etc.

## 3. Direct State in Layout Components (Rule 5)
- **FORBIDDEN:** Using `useState` directly inside `AdminDashboardClient.tsx` or `AdminDashboardSeatMatrixGrid.tsx` for complex filtering logic.
- **MANDATORY:** State must be extracted into the `useAdminDashboard.ts` hook to separate logic from presentation.

## 4. Bypassing Error Boundaries (Rule 9)
- **FORBIDDEN:** Allowing nested client errors to bubble up to the root layout and crash the app.
- **MANDATORY:** The module must contain a strongly typed `error.tsx` using `AdminDashboardErrorBoundaryProps` from `_types.ts`.
