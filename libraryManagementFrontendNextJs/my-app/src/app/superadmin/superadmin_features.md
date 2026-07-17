# Superadmin Module - Feature Architecture

This document serves as the AI-Context map for the frontend `superadmin` module. It strictly follows the architectural guidelines from `frontend_development_instruction.md` to maintain Enterprise-Grade scalability.

## 1. Module Overview
The `superadmin` module is the central administrative hub for managing the entire Smart Library 360 platform. It encompasses global dashboard metrics, tenant/library management, billing, system health, and cross-platform settings. It interfaces strictly with the backend endpoints defined in the NestJS application under `library-backend/src/modules/superadmin/...`.

## 2. Directory Structure & Responsibilities

The module is highly isolated and micro-modularized into feature-specific directories. Every single file (except Next.js standard files) begins with the `superadmin_` prefix to guarantee hyper-descriptive isolation.

- **`superadmin_dashboard/`**: The main landing page for superadmins, displaying high-level KPIs, system health summaries, and recent tenant activities. Maps to the backend `dashboard/superadmin` controllers.
- **`superadmin_system/`**: Manages global tenants, platform-wide roles, and core settings. Maps to the backend `system/tenants` controllers.
- **`superadmin_libraries/`**: Detailed management of individual library branches, their statuses, and operational limits.
- **`superadmin_billing/` & `superadmin_finance/` & `superadmin_accounting/`**: Handles platform revenue, subscription plans, invoicing, and complex financial reporting.
  - Sub-modules like `collect-fee`, `auto-suspend`, and `late-fees` are strictly split into Presentational Components, Custom Hooks for logic/state (e.g., `useCollectFeeClient.ts`), and Modals.
- **`superadmin_subscriptions/`**: Manages the subscription tiers (Free, Pro, Enterprise) available to libraries.
- **`superadmin_reports/`**: Generates cross-platform analytics and usage reports.
- **`superadmin_support-tickets/` & `superadmin_communication/`**: Manages customer support interactions and broadcast messaging to tenants.
- **`superadmin_system-health/`**: Detailed view of backend services, database health, API gateways, and external integrations (Redis, Kafka, SMS).
- **`superadmin_audit-logs/`**: System-wide auditing for security and compliance tracking.
- **`superadmin_shared_components/`**: Components shared exclusively across the `superadmin` module, such as `SuperadminErrorBoundary.tsx` and `SuperadminRoute.tsx`.

## 3. Key Design Patterns
- **Strict Separation of Concerns**: UI components are dumb (`..._components`); hooks handle all logic (`..._hooks`). Forms use `react-hook-form` and `zod` for strictly typed validation.
- **Absolute Imports Only**: All imports use `@/app/superadmin/...`. No relative paths are permitted.
- **Uniform Error Handling**: Uses standard `ApiResponse` format `{ success, message, data, statusCode }` for API responses.
- **Strict Naming Prefix**: Every file begins with `superadmin_` to avoid any ambiguity across the massive codebase.
- **Standard Tailwind**: Components use standard Tailwind utility classes mapping to `global_design_system.md` variables (e.g., `bg-card`, `text-text-primary`). Legacy custom CSS classes like `fin-*` are strictly prohibited.
