# Superadmin Module Architecture & Features

This document serves as the AI-Context map for the Superadmin portal (`src/app/superadmin`). It reflects the highly-isolated, micro-modularized architecture required by the enterprise guidelines.

## Role Definition
**Superadmin:** The owner of the Smart Library 360 SaaS platform. This role does NOT manage individual students or local branches. Instead, they manage the **Libraries** (the tenants/customers paying for the software), SaaS billing, and overall system health.

## Removed / Pruned Features
During the architectural refactoring, the following modules were **permanently removed** from the Superadmin portal because they strictly belong to the local Library Admin/Manager level:
- `superadmin_accounting`
- `superadmin_communication`
- `superadmin_crm`
- `superadmin_engagement`
- `superadmin_finance`
- `superadmin_seats_shifts_lockers`
- `superadmin_staff-users`
- `superadmin_students`

## Active Features (Feature-Based Sub-Folders)

### 1. `superadmin_dashboard`
- **Purpose**: High-level KPI overview (MRR, Active Libraries, System Status).
- **Key Files**: `SuperadminDashboardClient.tsx`, `SuperadminDashboardSystemHealthPanel.tsx`.

### 2. `superadmin_libraries`
- **Purpose**: Multi-tenant management. Viewing, onboarding, and suspending the libraries using the software.
- **Key Files**: `SuperadminLibrariesClient.tsx`, `SuperadminLibrariesPanel.tsx`.

### 3. `superadmin_subscriptions`
- **Purpose**: SaaS subscription tracking (which library is on which pricing tier).
- **Key Files**: `SuperadminSubscriptionsClient.tsx`, `SuperadminSubscriptionsPanel.tsx`.

### 4. `superadmin_billing`
- **Purpose**: Managing invoices, payments, and revenue generated from the libraries.
- **Key Files**: `SuperadminBillingClient.tsx`, `SuperadminBillingPanel.tsx`.

### 5. `superadmin_reports`
- **Purpose**: Global SaaS reports (Revenue growth, Churn rate, Platform adoption).
- **Key Files**: `SuperadminReportsClient.tsx`, `SuperadminReportsCharts.tsx`.

### 6. `superadmin_system-health`
- **Purpose**: Server metrics, API gateways, database status, and error rates.
- **Key Files**: `SuperadminSystemHealthClient.tsx`, `SuperadminSystemHealthMetricCard.tsx`.

### 7. `superadmin_audit-logs`
- **Purpose**: Tracking major destructive actions and security events across the platform.
- **Key Files**: `SuperadminAuditLogsClient.tsx`, `SuperadminAuditLogsPanel.tsx`.

### 8. `superadmin_support-tickets`
- **Purpose**: Handling IT / Support tickets raised by the Library Admins.
- **Key Files**: `SuperadminSupportTicketsClient.tsx`, `SuperadminSupportTicketPanel.tsx`.

### 9. `superadmin_settings`
- **Purpose**: Global SaaS configurations, payment gateway setups (e.g., Stripe/Razorpay keys).
- **Key Files**: `SuperadminSettingsClient.tsx`.

### 10. `superadmin_setup-wizard`
- **Purpose**: Onboarding flow for newly registered libraries.
- **Key Files**: `SuperadminSetupWizardClient.tsx`, Steps 1 through 4.

## Centralized Data & State
- **URL Config**: `superadmin_url_config.ts` acts as the single source of truth for all Superadmin routing.
- **Mock Data / Constants**: Resides in `superadmin_constants.ts` or `lib/mockRegistry.ts`.
- **State Management**: Zustand stores or localized React Context where needed, heavily favoring Server Components for data fetching and Client Components purely for interactivity.
