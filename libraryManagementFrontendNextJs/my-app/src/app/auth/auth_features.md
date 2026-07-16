# Auth Module - Feature Architecture

This document serves as the AI-Context map for the frontend authentication module (`auth`). It strictly follows the architectural guidelines from `frontend_development_instruction.md` to maintain Enterprise-Grade scalability.

## 1. Module Overview
The `auth` module is responsible for managing user authentication, including login, signup, password recovery, and secure routing. It interfaces strictly with the backend endpoints defined in the NestJS application.

## 2. Directory Structure & Responsibilities

- **`login/`**: Handles the user sign-in process.
  - `auth_components/AuthLoginForm.tsx`: The UI component. No heavy logic.
  - `auth_hooks/useAuthLogin.ts`: The state and side-effect manager for login.
  - `page.tsx`: The Next.js route entry point.

- **`signup/`**: Handles new user registration (defaulting to 'owner' role per backend requirements).
  - `auth_components/AuthSignupForm.tsx`: The UI component.
  - `auth_hooks/useAuthSignup.ts`: Manages the registration form state, password strength, and API call.

- **`forgot-password/`**: Handles initiating password recovery via OTP.
  - `auth_components/AuthForgotPasswordForm.tsx`: UI for requesting an OTP.
  - `auth_hooks/useAuthForgotPassword.ts`: Manages the OTP request lifecycle.

- **`reset-password/`**: Handles the OTP verification and password update.
  - `auth_components/AuthResetPasswordForm.tsx`: UI for entering OTP and new password.
  - `auth_hooks/useAuthResetPassword.ts`: Manages OTP input, countdown timer, and password update logic.

- **`auth_shared_components/`**: Components shared across the auth module.
  - `AuthRoute.tsx`: A wrapper to enforce auth-specific themes and layout logic.
  - `AuthPasswordStrengthMeter.tsx`: Reusable component to visualize password strength.
  - `AuthErrorBoundary.tsx`: The typed error boundary to isolate crashes in the auth module.

- **`auth_api/auth_api.ts`**: The exclusive API client for the auth module. All network requests (login, signup, getMe) go through this file to ensure strict payload mapping and centralized error handling using `ApiResponse`.

- **`auth_types/auth_types.ts`**: Centralized TypeScript definitions for the auth module, including `ApiResponse`, `FetchState`, and payload shapes.

- **`auth_utils/auth_validation.ts`**: Zod schemas for strict client-side validation, ensuring the payload is correct before hitting the `auth_api`.

- **`auth_constants.ts`**: Stores magic numbers, preset values, and enumerations (e.g., role mappings) to avoid hardcoding in components or hooks.

- **`auth_url_config.ts`**: Defines the `AUTH_API_ROUTES` (backend endpoints) and `AUTH_ROUTES` (frontend Next.js paths).

## 3. Key Design Patterns
- **Strict Separation of Concerns**: UI components are dumb; hooks handle all logic.
- **Absolute Imports Only**: All imports use `@/app/auth/...`. No relative paths.
- **Uniform Error Handling**: Uses standard `ApiResponse` format `{ success, message, data, statusCode }`.
- **Strict Naming Prefix**: Every file begins with `auth_` (except Next.js standard files).
