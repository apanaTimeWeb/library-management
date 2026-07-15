# Admin Dashboard Architecture

This module handles analytics, KPI reports, and administrative data fetching for the `admin` domain in the Library Management System.

## Module Structure

The module follows a strict feature-sliced and micro-modularized architecture to prevent tight coupling. A massive 12-endpoint controller has been broken down into 12 micro-controllers and 12 micro-services.

### Controllers & Services (`/controllers` & `/services`)
1. **Dashboard**: (`dashboard.controller.ts`, `dashboard.service.ts`) - Returns core KPIs, active seats, and recent payments.
2. **Reports**: (`reports.controller.ts`, `reports.service.ts`) - Returns deep financial analytics and historical growth charts.
3. **Audit Logs**: (`audit-logs.controller.ts`, `audit-logs.service.ts`)
4. **Blacklist**: (`blacklist.controller.ts`, `blacklist.service.ts`)
5. **Branches**: (`branches.controller.ts`, `branches.service.ts`)
6. **Coupons**: (`coupons.controller.ts`, `coupons.service.ts`)
7. **Expense Categories**: (`expense-categories.controller.ts`, `expense-categories.service.ts`)
8. **Expenses**: (`expenses.controller.ts`, `expenses.service.ts`)
9. **Permissions**: (`permissions.controller.ts`, `permissions.service.ts`)
10. **Plans**: (`plans.controller.ts`, `plans.service.ts`)
11. **Staff Users**: (`staff-users.controller.ts`, `staff-users.service.ts`)
12. **Students**: (`students.controller.ts`, `students.service.ts`)

### Centralized Definitions
- `constants/admin.constants.ts`: Stores empty array constants for the scaffolded endpoints.
- `interfaces/admin.interfaces.ts`: Defines the extremely strict shapes for `AdminDashboardData` and `AdminReportsData` instead of using inline JSON objects or `any`.

## Security Features
- **Tenant Isolation**: Every controller applies the `TenantGuard` to ensure the querying admin is strictly bounded to their organization's tenant context.
- **RBAC**: `@Roles('superadmin', 'admin')` explicitly whitelists access at the controller layer.
