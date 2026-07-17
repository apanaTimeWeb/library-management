# Admin Dashboard — Features & Architecture

## Overview
The Admin Dashboard serves as the central hub for library administrators. It provides a real-time overview of seat occupancy, expiring subscriptions, action items (tasks requiring immediate attention), and recent payment activity.

## Components & Data Flow

1. **`page.tsx`**
   - **Responsibility:** Server Component. Fetches the initial dashboard data from the API (`admin_dashboard_api.ts`).
   - **Flow:** Resolves the data promise and passes the strongly typed `AdminDashboardData` payload down to the client component.

2. **`useAdminDashboard.ts` (Hook)**
   - **Responsibility:** Manages all client-side state, specifically for the Seat Matrix filtering.
   - **Features:** 
     - Maintains active filters (Fee, Shift).
     - Provides handlers for filtering logic (`handleApplyFilters`, `handleClearFilters`).
     - Manages routing when a seat is clicked.

3. **`AdminDashboardClient.tsx`**
   - **Responsibility:** The primary Client Component orchestrating the dashboard layout.
   - **Children:**
     - `AdminDashboardKpiCard`: Displays high-level metrics (e.g., total active students, revenue).
     - `AdminDashboardSeatMatrixGrid`: A visual grid representing seat occupancy and status.
     - `AdminDashboardActionItemsList`: A list of alerts and tasks (e.g., expiring students, pending renewals).
     - `AdminDashboardRecentPaymentsFeed`: A table showing the latest financial transactions.

## Theming & Styling
- Fully complies with `admin_theme_contract.md`.
- Uses semantic custom CSS properties (`--bg-card`, `--text-primary`) for strict isolation instead of generic utility classes like `bg-white` or Shadcn defaults like `bg-card`.
