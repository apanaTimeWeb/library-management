# Superadmin System Tenants Dependencies

## Upstream Dependencies
- **Core Module (`@/core/core.module`)**: Provides the TypeORM `Tenant` entity.
- **Auth Module (`@/modules/auth/auth.module`)**: Provides `JwtAuthGuard` and `RolesGuard`.

## Downstream Dependencies
- **App Module (`@/app.module`)**: Mounts the module on `/api/superadmin/system/tenants`.

## Internal Dependencies
- Controllers -> Services -> Repositories
