# Forbidden Patterns for Superadmin Libraries Module

This file explicitly lists patterns that are **NOT ALLOWED** in the `superadmin_libraries` module to enforce the strict architectural rules.

## State Management
- ❌ **No Multiple Boolean Flags**: Do not use `loading`, `isError`, `isSuccess` booleans.
- ✅ **Use FetchState Enum**: Always use `SuperadminLibrariesFetchState` (`'idle' | 'loading' | 'success' | 'error'`).

## UI & CSS
- ❌ **No Hardcoded Tailwind Values**: Do not use arbitrary values like `w-[325px]`, `bg-[#1A1A2E]`, `text-[10px]`, or `text-[11px]`.
- ✅ **Use Design System Tokens**: Always use semantic variables like `bg-bg-card` and strict framework scales like `w-72`, `text-xs`, or `text-sm`.

## Component Responsibilities
- ❌ **No Inline Interfaces**: Do not define `interface Props` in `.tsx` files.
- ✅ **Use `_types.ts`**: All props and data types must be centralized and exported from `superadmin_libraries_types/SuperadminLibrariesTypes.ts`.

## Form Handling
- ❌ **No Manual `useState` for Complex Forms**: Do not use `useState` for editing the library details.
- ✅ **Use RHF + Zod**: All forms must utilize `react-hook-form` with `zod` schema validation.

## Data Display
- ❌ **No Unmasked Sensitive Data**: Do not show plain phone numbers or emails in lists.
- ✅ **Use Masking Utils**: Phone numbers must be masked using `maskSuperadminLibraryPhone()` before display.
