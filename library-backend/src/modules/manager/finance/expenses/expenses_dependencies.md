# Manager Finance Expenses Dependencies

## Upstream Dependencies
- **Core Module (`@/core/core.module`)**: Provides TypeORM entities (`Expense`, `Branch`, `User`).
- **Auth Module (`@/modules/auth/auth.module`)**: Provides `JwtAuthGuard` and `RolesGuard`.

## Downstream Dependencies
- **App Module (`@/app.module`)**: Mounts the module.

## Internal Dependencies
- Controllers -> Services -> Repositories
