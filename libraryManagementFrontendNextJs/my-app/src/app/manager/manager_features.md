# Manager Module Architecture & Features

This document serves as the AI-Context map for the Manager portal (`src/app/manager`). It reflects the highly-isolated, micro-modularized architecture required by the enterprise guidelines.

## Role Definition
**Manager:** The day-to-day operator sitting at the front desk of a specific library branch. They handle student walk-ins, fee collections, seat allocations, and daily operational accounting.

## Active Features (Feature-Based Sub-Folders)

### 1. `manager_dashboard`
- **Purpose**: Daily operational snapshot (Today's renewals, Today's attendance).
- **Key Files**: `ManagerDashboardClient.tsx`, `ManagerDashboardSeatMatrix.tsx`.

### 2. `manager_students`
- **Purpose**: Managing current students, new admissions, ID card generation, and alumni records.
- **Key Files**: `ManagerStudentsClient.tsx`, `ManagerStudentsAdmissionForm.tsx`, `ManagerStudentsIdCard.tsx`.

### 3. `manager_finance`
- **Purpose**: All day-to-day money handling (Collect Fee, Payments, Late Fees, Security Deposits, Renewals, Subscriptions, Referrals).
- **Key Files**: `ManagerFinanceCollectFeeClient.tsx`, `ManagerFinancePaymentsClient.tsx`.

### 4. `manager_seats_shifts_lockers`
- **Purpose**: Allocating specific seats/lockers, tracking shift timings, and seat maintenance.
- **Key Files**: `ManagerSeatsSeatMatrixClient.tsx`, `ManagerSeatsLockerMatrixClient.tsx`.

### 5. `manager_crm`
- **Purpose**: Tracking walk-in leads and phone inquiries, following up to convert them into students.
- **Key Files**: `ManagerCrmEnquiriesClient.tsx`, `ManagerCrmEnquiriesKanban.tsx`.

### 6. `manager_engagement`
- **Purpose**: Tracking daily student attendance and generating absentee reports.
- **Key Files**: `ManagerEngagementAttendanceClient.tsx`, `ManagerEngagementAbsenteeReportClient.tsx`.

### 7. `manager_accounting`
- **Purpose**: Daily physical branch accounting (Daily Settlement, Petty Expenses, Assets & Asset Maintenance, Seat Gaps).
- **Key Files**: `ManagerAccountingDailySettlementClient.tsx`, `ManagerAccountingExpensesClient.tsx`.

### 8. `manager_communication`
- **Purpose**: Sending notices to students and handling student complaints.
- **Key Files**: `ManagerCommunicationNoticesClient.tsx`, `ManagerCommunicationComplaintsClient.tsx`.

### 9. `manager_student-reports`
- **Purpose**: Generating local operational reports regarding student metrics.
- **Key Files**: `ManagerStudentReportsClient.tsx`.

## Centralized Architecture & Shared Modules
- **Shared UI/Components**: `manager_shared_components/` (Contains core shells like `ManagerRoute.tsx`, sidebars, headers, and UI elements used across Manager).
- **Shared Logic & Utils**: `manager_shared_hooks/`, `manager_shared_utils/`.
- **URL Config**: `manager_url_config.ts` acts as the single source of truth for all Manager routing.
- **Types**: `manager_types/` (Global types and interfaces for the Manager portal).
- **Mock Data / Constants**: `manager_mock_data.ts` or `lib/mockRegistry.ts`.
- **State Management**: Heavily utilizes Zustand stores for async data and Context for UI states (like Sidebar toggling).
