# Auth Module - Feature Architecture

This document serves as the AI-Context map for the frontend authentication module (`auth`). It strictly follows the architectural guidelines from `frontend_development_instruction.md` and `global_design_system.md` to maintain Enterprise-Grade scalability.

## 1. Module Overview
The `auth` module is responsible for managing user authentication, including login, signup, password recovery, and secure routing. It interfaces strictly with the backend endpoints defined in the NestJS application and uses standard Tailwind tokens for all styling.

## 2. Directory Structure & Responsibilities

- **`login/`**: Handles the user sign-in process.
  - `auth_components/AuthLoginForm.tsx`: The UI component using strict Tailwind utility classes mapped to standard tokens.
  - `auth_hooks/useAuthLogin.ts`: The state and side-effect manager for login (integrates with `auth_store`).
  - `page.tsx`: The Next.js Server Component route entry point.

- **`signup/`**: Handles new user registration.
  - `auth_components/AuthSignupForm.tsx`: The UI component.
  - `auth_hooks/useAuthSignup.ts`: Manages the registration form state, password strength, and connects to `auth_store`.

- **`forgot-password/`**: Handles initiating password recovery via OTP.
  - `auth_components/AuthForgotPasswordForm.tsx`: UI for requesting an OTP.
  - `auth_hooks/useAuthForgotPassword.ts`: Manages the OTP request lifecycle.

- **`reset-password/`**: Handles the OTP verification and password update.
  - `auth_components/AuthResetPasswordForm.tsx`: UI for entering OTP and new password.
  - `auth_hooks/useAuthResetPassword.ts`: Manages OTP input, countdown timer, and connects to `auth_store`.

- **`auth_shared_components/`**: Components shared across the auth module.
  - `AuthRoute.tsx`: A wrapper to enforce auth layout logic without proprietary CSS.
  - `AuthPasswordStrengthMeter.tsx`: Reusable component to visualize password strength.

- **`auth_store/auth_store.ts`**: The Zustand module-scoped store for all asynchronous authentication operations (`login`, `signup`, `forgotPassword`, `resetPassword`, `logout`). Ensures centralized API loading states.

- **`auth_api/auth_api.ts`**: The exclusive API client for the auth module. All network requests go through this file to ensure strict payload mapping and centralized error handling using `ApiResponse`.

- **`auth_types/auth_types.ts`**: Centralized TypeScript definitions for the auth module.

- **`auth_utils/auth_validation.ts`**: Zod schemas for strict client-side validation (integrated with React Hook Form).

- **`auth_constants.ts` & `auth_url_config.ts`**: Stores magic numbers, preset values, and routing variables.

## 3. Key Design Patterns
- **Strict Separation of Concerns**: UI components handle DOM and Tailwind layout; hooks handle React Hook Form logic and connect to the Zustand store.
- **Zustand State Management**: All async state (`fetchState`, `errorMessage`) resides in `auth_store.ts`.
- **Pure Tailwind Styling**: `auth.css` is removed entirely. UI relies on tokens from `globals.css` (e.g., `bg-page`, `text-primary`, `bg-card`).
- **Absolute Imports Only**: All imports use `@/app/auth/...`. No relative paths.
- **Uniform Error Handling**: Uses standard `ApiResponse` format `{ success, message, data, statusCode }`.
- **Strict Naming Prefix**: Every file begins with `auth_` or its submodule prefix (except Next.js standard files).
