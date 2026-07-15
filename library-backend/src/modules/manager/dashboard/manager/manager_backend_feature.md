# Manager Dashboard Module Architecture

This module implements the dashboard and reporting features for Managers in the Library Management System.

## Module Structure

The module follows a strict feature-sliced and micro-modularized architecture to align with `backend_development_instruction.md`.

### Controllers (`/controllers`)
- `dashboard.controller.ts`: Handles `GET /dashboard`. Returns KPI cards, seat matrices, and recent admission metrics strictly isolated by the requesting Manager's `branchId`.
- `reports.controller.ts`: Handles `GET /reports`. Returns aggregated branch occupancy and general reporting data.
- `student-reports.controller.ts`: Handles `GET /student-reports`. Returns metrics related to student attendance, complaints, and absences.

### Services (`/services`)
Each controller has exactly one corresponding service file, ensuring single responsibility.
- `dashboard.service.ts`
- `reports.service.ts`
- `student-reports.service.ts`

### Centralized Definitions
- `constants/manager.constants.ts`: Contains specific constants (MAX_SEATS_DISPLAY, EXPIRING_DAYS_THRESHOLD) and standard statuses for complaints and enquiries.
- `exceptions/manager.exceptions.ts`: Specific HTTP exceptions for dashboard data retrieval.
- `interfaces/manager.interfaces.ts`: Strict types for all returned dashboard metrics (`DashboardResponse`, `ReportsResponse`, `StudentReportsResponse`), avoiding massive nested raw objects.

## Security Features
- **Zero Trust Branch Isolation**: The `branchId` used to filter the dashboard data is exclusively derived from the verified JWT payload via the `@CurrentUser` decorator, ensuring a manager can never query another branch's statistics by spoofing request payloads.
- **Role Guards**: Restricted strictly to `manager`, `admin`, and `superadmin` roles.
