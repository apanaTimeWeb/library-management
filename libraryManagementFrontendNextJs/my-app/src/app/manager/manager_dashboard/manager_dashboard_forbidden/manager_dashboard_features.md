# Manager Dashboard — Features & Architecture

## Overview
The Manager Dashboard provides branch managers with a real-time, high-level overview of their branch's performance. It displays key performance indicators (KPIs), seat occupancy, pending action items, and recent activities like new admissions and enquiries.

## Components & Data Flow

1. **`page.tsx`**
   - **Responsibility:** Server Component that can handle high-level layout. It delegates actual data fetching to `ManagerDashboardClient.tsx` via a custom hook, as the dashboard heavily relies on client-side AG Grid rendering.

2. **`useDashboardData.ts` (Hook)**
   - **Responsibility:** Handles fetching the dashboard data asynchronously from the API (`manager_dashboard_api.ts`).
   - **Features:** Returns a status indicator (`loading`, `error`, `success`) along with the strongly typed `DashboardData`.

3. **`ManagerDashboardClient.tsx`**
   - **Responsibility:** The primary Client Component orchestrating the dashboard layout.
   - **Children:**
     - `ManagerDashboardKpiGrid`: Renders a grid of 4 top-level metrics.
     - `ManagerDashboardSeatMatrix`: Visual representation of today's seat occupancy and statuses.
     - Action Items List: A quick view of pending renewals or approvals.
     - Recent Activity Tables: AG Grid implementations displaying the latest admissions and CRM enquiries.

## Theming & Styling
- Fully complies with `manager_theme_contract.md`.
- Uses semantic custom CSS properties (`--bg-card`, `--text-primary`) for strict isolation, avoiding un-themed Shadcn variables or arbitrary values like `text-[11px]`.
