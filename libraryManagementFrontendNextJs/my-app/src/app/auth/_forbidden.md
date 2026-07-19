# Auth Module Forbidden Boundaries

1. **NO BUSINESS LOGIC**: The auth module should only handle UI for login, OTP, and password reset. All authentication business logic must reside in `auth_api.ts` or backend.
2. **NO STATE LEAKAGE**: Do not store sensitive tokens in local state or unencrypted local storage directly from components.
3. **NO CROSS-MODULE IMPORTS**: Do not import components from `admin`, `manager`, or `superadmin` into the auth module.
