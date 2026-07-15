# Auth Module Architecture

This module implements the authentication and authorization features for the Library Management System.

## Module Structure

The module follows a strict feature-sliced and micro-modularized architecture to align with `backend_development_instruction.md`.

### Controllers (`/controllers`)
- `login.controller.ts`: Handles `POST /login`. Authenticates a user using phone and password. Implements rate limiting.
- `register.controller.ts`: Handles `POST /register`. Restricted to `superadmin` role for creating new users.
- `refresh-token.controller.ts`: Handles `POST /refresh`. Returns new access and refresh tokens.
- `logout.controller.ts`: Handles `POST /logout`. Revokes the user's refresh token.
- `get-me.controller.ts`: Handles `GET /me`. Retrieves the currently authenticated user's details.

### Services (`/services`)
Each controller has exactly one corresponding service file, ensuring single responsibility.
- `login.service.ts`
- `register.service.ts`
- `refresh-token.service.ts`
- `logout.service.ts`
- `get-me.service.ts`

### Centralized Definitions
- `constants/auth.constants.ts`: Contains specific constants (BCRYPT_COST, MAX_FAILED_ATTEMPTS) and all authentication error messages.
- `exceptions/auth.exceptions.ts`: Specific HTTP exceptions for authentication flows (e.g. `AccountLockedException`, `InvalidCredentialsException`).
- `interfaces/auth.interfaces.ts`: Strict types for payloads and responses (`JwtPayload`, `AuthTokens`, `LoginResponse`).

### Utilities (`/utils`)
- `jwt-token-generator.util.ts`: Encapsulates the logic to generate access and refresh JWT tokens.

## Security Features
- **Rate Limiting**: Login endpoint is rate-limited to prevent brute force attacks.
- **Account Lockout**: After 5 failed attempts, the account is temporarily locked for 15 minutes.
- **Refresh Token Rotation**: Refresh tokens are stored as bcrypt hashes in the database. When used, they rotate (a new pair is generated) to mitigate token reuse attacks.
- **JWT Strategies**: Dedicated Passport strategies for access token (`JwtStrategy`) and refresh token (`RefreshTokenStrategy`).
