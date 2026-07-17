# Forbidden Patterns for Superadmin Finance Module

This file strictly dictates what is banned from the `superadmin_finance` module to prevent regressions and maintain type safety.

## 1. Type Safety Bypasses (Rule 27)
- ❌ **No `eslint-disable` for Types**: You must NEVER use `/* eslint-disable @typescript-eslint/no-explicit-any */`.
- ❌ **No Explicit `any` Types**: Do NOT type event handlers or input values as `any` (e.g., `(e: any) => ...`).
- ✅ **Use Standard Types**: Always use `React.ChangeEvent<HTMLInputElement>` or `React.ChangeEvent<HTMLTextAreaElement>` for form inputs.

## 2. Inline Definitions (Rule 7)
- ❌ **No Inline `useState` Typing**: Do NOT use complex inline object types in `useState` (e.g., `useState<{ id: number; name: string }>`).
- ✅ **Use Centralized Types**: Import and use types like `SuperadminFinanceDialogState` from `superadmin_finance_types/SuperadminFinanceTypes.ts`.

## 3. Styling Violations (Rule 36)
- ❌ **No Arbitrary Tailwind Values**: Do NOT use arbitrary bracket notation (e.g., `text-[10px]`, `w-[300px]`, `bg-[#FF0000]`).
- ✅ **Use Finance Theme Variables**: Only use the standardized `fin-` variables defined in `finance.css` (e.g., `fin-badge--warning`, `fin-text-danger`).

## 4. State Management
- ❌ **No Multiple Booleans**: Do NOT use separate `isLoading`, `isError`, `isSuccess` variables for data fetching.
- ✅ **Use Enums**: Use a unified state machine or enum for data fetching status.
