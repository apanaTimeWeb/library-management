# Superadmin Dashboard Dependencies

## Upstream Dependencies (Modules that this module depends on)
- `AuthModule` (for JWT authentication and Roles guards)
- `TenantsModule` (to aggregate global tenant statistics)
- `FinanceModule` (to aggregate global revenue)

## Downstream Dependencies (Modules that depend on this module)
- None. The dashboard is a pure aggregation layer and does not emit events or export services that other modules depend on.

## Database Entities Used
- `Tenant` (read-only for aggregations)
- `Expense` (read-only for global financial aggregations)
- `AuditLog` (read-only for recent global activities)
