# Admin Students — Forbidden Patterns

> This file explicitly lists architectural and coding patterns that are **BANNED** within the `admin_students` module.

## 1. Type Sprawl (Rule 7, Rule 27)
- **FORBIDDEN:** Defining component props or data interfaces inline within `.tsx` or hook files (e.g., `export interface AdminStudentsClientProps { ... }` inside `AdminStudentsClient.tsx`).
- **MANDATORY:** All interfaces and types must be defined centrally in and exported from `admin_students_types.ts`.

## 2. Un-Themed UI Tokens (Rule 4, Rule 36)
- **FORBIDDEN:** Using generic Shadcn tokens such as `text-muted-foreground`, `bg-card`, `bg-muted`, or `bg-background`.
- **FORBIDDEN:** Using arbitrary pixel or hex values like `w-[250px]`, `text-[#000000]`.
- **MANDATORY:** Always use the precise semantic classes defined in the global design system: `text-text-secondary`, `bg-bg-card`, `bg-bg-page`, `bg-bg-input`, etc.

## 3. Inline Component State (Rule 5)
- **FORBIDDEN:** Defining `useState` for search and filtering directly inside `AdminStudentsClient.tsx`.
- **MANDATORY:** Complex UI state and filtering logic must remain abstracted inside the `useAdminStudents.ts` hook.

## 4. Bypassing Error Boundaries (Rule 9)
- **FORBIDDEN:** Using untyped or missing error boundaries.
- **MANDATORY:** The module must contain an `error.tsx` using `AdminStudentsErrorBoundaryProps` from `_types.ts`, and styled with proper theme tokens.
