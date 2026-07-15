# Superadmin Dashboard Architecture

This module handles dashboard and root-level operations for the `superadmin` domain in the Library Management System.

## Module Structure

The module follows a strict feature-sliced and micro-modularized architecture.

### Controllers & Services (`/controllers` & `/services`)
1. **Get Dashboard**: (`dashboard.controller.ts`, `dashboard.service.ts`)
2. **Get Libraries**: (`get-libraries.controller.ts`, `get-libraries.service.ts`)
3. **Update Library**: (`update-library.controller.ts`, `update-library.service.ts`)
4. **Update Library Status**: (`update-library-status.controller.ts`, `update-library-status.service.ts`)

### Centralized Definitions
- `dtos/update-library.dto.ts`: Strict payload validation for general library updates.
- `dtos/update-library-status.dto.ts`: Strict validation for activating/deactivating a library using `isActive: boolean`.
- `interfaces/superadmin.interfaces.ts`: Defines `SuperadminDashboardData` and `LibraryItem`.

## Security Features
- **Zero Trust Role Guards**: `@Roles('superadmin')` is explicitly set on all endpoints. No standard admin or manager can hit these routes.
- **DTO Validation**: Prevent malformed statuses and untyped payloads from entering the database.
