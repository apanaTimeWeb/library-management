# Auth Module - Forbidden Patterns

To strictly adhere to the AI-Friendly, Enterprise-Grade architecture, the following patterns are explicitly forbidden within the `auth` module:

## 1. Forbidden Imports
- **No Relative Imports**: Never use `../` or `./` to import internal module dependencies. ALL imports within `auth` must use the absolute path `@/app/auth/...`.
- **No Cross-Module Domain Leakage**: Do not import components, hooks, or types directly from other features (like `dashboard` or `user_profile`) without going through a designated shared module if necessary.

## 2. Forbidden State Patterns
- **No Redux / Global State for UI**: Never use Redux, Zustand, or Context for ephemeral UI states (e.g., `isSubmitting`, `showPassword`, `countdown`). These must be managed locally within `auth_hooks`.
- **No Side Effects in Components**: Do not call `fetchApi`, `setTimeout`, or perform heavy business logic directly in `.tsx` files. All logic must reside in `auth_hooks`.

## 3. Forbidden UI Patterns
- **No Inline Styles**: Do not use `style={{ ... }}`. All styling must use Tailwind classes mapping to `global_design_system.md` variables (e.g., `text-[var(--text-primary)]`) or predefined component classes (e.g., `auth-card`).
- **No Untyped Error Handling**: Never use `catch (err: any)`. Always cast to `unknown` or `Error`, or use the `ApiResponse` structure.
- **No Generic Fallbacks**: The module must render a typed `AuthErrorBoundary`, never relying on the global app root error without first catching auth-specific context.

## 4. Forbidden Naming Conventions
- **No Unprefixed Files**: Every single file within this directory MUST start with `auth_` (except standard Next.js routing files like `page.tsx`, `layout.tsx`, `error.tsx`).
- **No Ambiguous Component Names**: Components must be explicitly descriptive (e.g., `AuthLoginForm.tsx`, not `Form.tsx`).
