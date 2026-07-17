# Forbidden Patterns in Manager Dashboard

> This file explicitly lists architectural and coding patterns that are **BANNED** within the `manager_dashboard` module.

## 1. Type Sprawl (Rule 7)
- **FORBIDDEN:** Defining inline prop types for functional components (e.g., `function SmartIdCell({ value }: { value: string })`).
- **MANDATORY:** All interfaces, types, and prop definitions (such as `CellRendererProps`) must be centralized in `manager_dashboard_types.ts`.

## 2. Un-Themed UI Tokens & Arbitrary Values (Rule 4, Rule 36)
- **FORBIDDEN:** Using arbitrary pixel or hex values in Tailwind classes like `text-[11px]`, `text-[13px]`, `text-[22px]`, or `h-[120px]`.
- **FORBIDDEN:** Creating arbitrary compound classes like `min-h-screen-header` without defining them in the theme contract.
- **MANDATORY:** Always use standard Tailwind scales (`text-xs`, `text-sm`, `text-2xl`, `h-32`) and semantic classes from the global design system (`text-text-secondary`, `bg-bg-card`, `bg-bg-page`).

## 3. Module Bleeding
- **FORBIDDEN:** Do NOT add module-specific operations (like student admission forms) directly into the dashboard. Link to the respective modules instead.
- **FORBIDDEN:** Do NOT bypass `manager_dashboard_api.ts` to fetch data inline.

## 4. Generic Loaders
- **FORBIDDEN:** Do NOT use full-page generic spinners; use skeleton loaders (or localized pulse animations) for the dashboard KPI cards and tables.

## 5. Client State in Root Layout
- **FORBIDDEN:** Do NOT place any `useState` or `"use client"` in the root `page.tsx` file.
