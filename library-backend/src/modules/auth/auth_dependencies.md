# Auth Module Dependencies

This document explicitly maps the dependencies of the `auth` module, satisfying Rule 49 of the backend architecture guidelines.

## Upstream Dependencies (Modules this module depends on)
- **Core Module (`@/core/core.module`)**: Provides the TypeORM entities (`User`, `Admin`, `Branch`).

## Downstream Dependencies (Modules that depend on this module)
- **App Module (`@/app.module`)**: Imports the `AuthModule` to mount its routes.
- **Admin Modules (`@/modules/admin/...`)**: Rely on `AuthJwtAuthGuard` and `AuthRolesGuard` provided by the Auth module to secure endpoints.

## Internal Dependencies (Intra-module)
- **Controllers** depend on **Services** and **DTOs**.
- **Services** depend on **TypeORM Repositories** and **Utils** (e.g., `jwt-token-generator.util.ts`).
- **Guards** depend on **Services** or directly evaluate request context.
