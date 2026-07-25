# Admin Module Architecture & Features

This document serves as the AI-Context map for the Admin portal (`src/app/admin`). It reflects the highly-isolated, micro-modularized architecture required by the enterprise guidelines.

## Role Definition
**Admin (Library Owner):** The owner of a specific library business. They manage one or multiple library branches. They oversee high-level financials, staff permissions, and overarching business rules, but generally delegate day-to-day operations to Managers.

## Removed / Pruned Features
During the architectural refactoring, the following modules were **permanently removed** from the Admin portal as they are day-to-day operational tasks strictly meant for the Manager role:
- `admin_communication`
- `admin_engagement` (Attendance tracking)
- `admin_finance` (Daily fee collection)
- `admin_seats_shifts_lockers` (Daily seat mapping)

## Active Features (Feature-Based Sub-Folders)

### 1. `admin_dashboard`
- **Purpose**: Business-level overview (Revenue, Occupancy, New Admissions).
- **Key Files**: `AdminDashboardClient.tsx`, `AdminDashboardSeatMatrixGrid.tsx`.

### 2. `admin_branches`
- **Purpose**: Managing multiple locations of their library business.
- **Key Files**: `AdminBranchesClient.tsx`.

### 3. `admin_students`
- **Purpose**: High-level student database management across all branches.
- **Key Files**: `AdminStudentsClient.tsx`.

### 4. `admin_staff-users`
- **Purpose**: Onboarding Managers, IT staff, and defining their branch access.
- **Key Files**: `AdminStaffUsersClient.tsx`.

### 5. `admin_permissions`
- **Purpose**: RBAC (Role-Based Access Control) to limit what Managers can do.
- **Key Files**: `AdminPermissionsView.tsx`.

### 6. `admin_crm`
- **Purpose**: Oversight of lead generation, marketing conversion, and tracking Enquiries.
- **Key Files**: `AdminCrmEnquiriesClient.tsx`.

### 7. `admin_accounting`
- **Purpose**: Business-level accounting (Expenses).
- **Key Files**: `AdminAccountingExpensesClient.tsx`.

### 8. `admin_plans`
- **Purpose**: Creating and pricing subscription tiers (e.g., "Monthly Premium", "Half-Day").
- **Key Files**: `AdminPlansClient.tsx`.

### 9. `admin_coupons`
- **Purpose**: Creating promotional discounts and tracking their usage.
- **Key Files**: `AdminCouponsClient.tsx`.

### 10. `admin_reports`
- **Purpose**: Branch-wise performance comparisons, revenue analytics.
- **Key Files**: `AdminReportsClient.tsx`, `AdminReportsBranchTable.tsx`.

### 11. `admin_blacklist`
- **Purpose**: Banning problematic students across all branches.
- **Key Files**: `AdminBlacklistClient.tsx`.

### 12. `admin_audit-logs`
- **Purpose**: Tracking actions taken by Managers and Staff.
- **Key Files**: `AdminAuditLogsClient.tsx`.

### 13. `admin_settings`
- **Purpose**: Configuring business rules (GST, local timezone, SMS gateways).
- **Key Files**: `AdminSettingsClient.tsx`.

## Centralized Data & State
- **URL Config**: `admin_url_config.ts` acts as the single source of truth for all Admin routing.
- **Mock Data / Constants**: Found in `admin_constants/` or `lib/mockRegistry.ts`.
