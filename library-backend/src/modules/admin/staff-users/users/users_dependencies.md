# Admin Users Module Dependencies

## Upstream Dependencies
- **Core Module (`@/core/core.module`)**: Provides the TypeORM `User`, `Role`, `Branch`, and `Tenant` entities.
- **Auth Module (`@/modules/auth/auth.module`)**: Provides `JwtAuthGuard` and `RolesGuard`.

## Downstream Dependencies
- **App Module (`@/app.module`)**: Mounts the module on `/api/admin/staff-users/users`.

## Internal Dependencies
- Controllers -> Services -> Repositories
