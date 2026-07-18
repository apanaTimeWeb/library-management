# Superadmin Module - Feature Architecture (AI-Context Map)

This document serves as the master **AI-Context Map** for the frontend `superadmin` module. It is designed to rapidly orient AI agents and human developers to the module's extremely isolated, scalable, and fully typed architectural standards (as defined in `frontend_development_instruction.md`).

## 1. Module Overview
The `superadmin` module is the central administrative hub for managing the entire Smart Library 360 platform. It handles platform-wide metrics, tenant/library orchestration, billing, accounting, subscriptions, communication logs, and global system health.

**Core Philosophy:** 
- **Micro-Modularization**: The codebase is split into ultra-granular, feature-based sub-folders.
- **Hook-Driven Logic Isolation**: Complex logic is entirely extracted out of UI components into `use*Client.ts` files.
- **Pure Tailwind UI**: All legacy UI prefix classes (e.g., `sys-`, `crm-`, `eng-`) have been eradicated. UI relies purely on standard Tailwind utilities and design system tokens.

---

## 2. Directory Structure & Responsibilities

The module is isolated into the following key domains, each mapped to specific backend controllers. Every file uses the `superadmin_` prefix to guarantee unambiguous AI targeting.

### 2.1 Core Infrastructure
- **`superadmin_shared_components/`**: Platform-wide layout components (`SuperadminSidebar.tsx`, `SuperadminHeader.tsx`).
- **`superadmin_system/`**: 
  - **`superadmin_system_shared_components/`**: Reusable primitive components (Badges, Buttons, Cards, Inputs, Progress, Tabs, Textareas) built exclusively with Tailwind tokens.
  - **Other Subfolders**: Offline handling, branding, profiles.
- **`superadmin_url_config.ts`**: **The Single Source of Truth for URLs.** No APIs or routes are hardcoded anywhere in components. Every `fetchApi` or `router.push` must pull from `SUPERADMIN_ROUTES` or `SUPERADMIN_API_ROUTES`.
- **`superadmin_theme_contract.md`**: Outlines all CSS variables required from `globals.css` (e.g., `--bg-card`, `--text-primary`) for seamless portability.

### 2.2 Feature Modules (The "Hook + Component" Pattern)
Every feature directory (e.g., `superadmin_crm`, `superadmin_communication`) is built using a strict architectural boundary:
1. **The Hook (`use[Feature]Client.ts`)**: Manages ALL state (`useState`, `useEffect`), forms (`react-hook-form`), async API calls, and logic transformations.
2. **The View (`[Feature]Client.tsx`)**: A pure presentation layer that consumes the hook and renders JSX using only standard Tailwind utilities.

#### Key Feature Sub-Modules:
- **`superadmin_dashboard/`**: High-level KPIs, system health summaries, and recent tenant activities.
- **`superadmin_accounting/` & `superadmin_finance/` & `superadmin_billing/`**:
  - Manages revenue, subscription plans, invoicing, expenses, and security deposits.
  - Example logic extracted: `useAddClient.ts` handles expense creation logic.
- **`superadmin_crm/`**:
  - Manages student enquiries and walk-ins.
  - Example: `enquiries/[id]` splits logic into `useEnquiriesIdClient.ts` and view into `EnquiriesIdClient.tsx`.
- **`superadmin_communication/`**:
  - WhatsApp templates, broadcast logs, global notification centers, and complaints handling.
- **`superadmin_engagement/`**:
  - Handles attendance records, QR scanners, and holiday calendars.
- **`superadmin_seats_shifts_lockers/`**: Operational layout management for branches.
- **`superadmin_libraries/`**: Library branch statuses and tenant provisioning.
- **`superadmin_reports/`**: Analytics generation.
- **`superadmin_support-tickets/`**: Helpdesk orchestration for tenant interactions.
- **`superadmin_system-health/`**: Diagnostics for external microservices (Redis, SMS Gateways).
- **`superadmin_audit-logs/`**: System-wide compliance auditing.

---

## 3. Strict Development Rules for AI Agents

When editing or extending the `superadmin` module, AI agents MUST follow these constraints mechanically:

1. **Do Not Touch Working Logic for UI Tweaks**:
   If an AI is asked to fix a CSS alignment issue, it must edit the `.tsx` Component file. It MUST NOT modify the co-located `use...Client.ts` hook.
   
2. **Do Not Mix UI and Logic**:
   If adding a new API call, the AI must place the `useEffect` or async handler in the `use...Client.ts` file. It must then pass the resulting state/function back to the `.tsx` Component file as a returned object.

3. **Centralized URL References Only**:
   If adding a new fetch request, the URL must first be appended to `superadmin_url_config.ts`. The component/hook must import and call the constant from there (e.g., `SUPERADMIN_API_ROUTES.NEW_ENDPOINT`). Hardcoding strings like `/api/v1/superadmin/feature` is strictly banned.

4. **Pure Tailwind Enforcement**:
   Do not invent arbitrary classes like `sys-sidebar` or `eng-button`. Use the design system (e.g., `bg-card`, `text-[14px]`, `rounded-[var(--radius-xl)]`).

5. **Type Safety & Mocks**:
   Any new dummy data must be placed in `superadmin_[feature]_data/Superadmin[Feature]MockData.ts`, and types must reside in `superadmin_[feature]_types/Superadmin[Feature]Types.ts`. Never define interfaces or mock data inline inside the component.

By strictly adhering to these rules, the `superadmin` module remains highly robust, instantly debuggable, and completely safe for autonomous AI maintenance.
