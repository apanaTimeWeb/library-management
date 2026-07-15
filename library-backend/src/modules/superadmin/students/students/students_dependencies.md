# Superadmin Students Module Dependencies

This document explicitly maps the dependencies of the `students` module within the `superadmin` domain, satisfying Rule 49 of the backend architecture guidelines.

## Upstream Dependencies (Modules this module depends on)

- **Auth Module (`@/modules/auth/auth.module`)**: Provides `JwtAuthGuard` and `RolesGuard` for securing endpoints and enforcing RBAC.
- **Core Module (`@/core/core.module`)**: Provides the TypeORM entities (`Student`, `Branch`, `Subscription`, `Seat`, `Shift`).

## Downstream Dependencies (Modules that depend on this module)

- **App Module (`@/app.module`)**: Imports the `StudentsModule` to mount its routes on the global `/api/superadmin/students` prefix.

## Internal Dependencies (Intra-module)

- **Controllers** depend on **Services**.
- **Services** depend on **TypeORM Repositories**.
- **Services and Controllers** depend on **Constants** (`students.constants.ts`) and **Interfaces** (`students.interfaces.ts`).
- **Controllers** depend on **DTOs** for payload validation.
