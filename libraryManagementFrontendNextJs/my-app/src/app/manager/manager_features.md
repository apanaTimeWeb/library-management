# Manager Module Architecture & AI Guide

This document serves as the canonical map for the pp/manager module. It was completely refactored to adhere to extreme micro-modularization, AI-Friendly logic isolation, and Enterprise-Grade frontend standards.

## Core Architectural Rules
When working in this module, ALL future modifications must obey the following rules:
1. **Hyper-Descriptive Naming**: Every file and folder MUST be prefixed with the exact module/sub-module name (e.g., ManagerCrmEnquiriesDetailClient.tsx).
2. **Absolute Imports Only**: Use @/app/manager/... exclusively. Never use relative paths like ../.
3. **Data & Type Isolation**: 
   - No inline mock data or hardcoded arrays. They live in [moduleName]_constants/[moduleName]Constants.ts.
   - No inline types or interfaces. They live in [moduleName]_types/[moduleName]Types.ts.
4. **Logic Isolation (Rule 6)**: Complex state (useState, useEffect, API fetches) is extracted into custom hooks (e.g., useManagerCrmEnquiriesDetail.ts) inside [moduleName]_hooks/.
5. **Centralized Routing**: No hardcoded URLs in components. Import from manager_url_config.ts or [submodule]_url_config.ts.

## Sub-Module Directory Map

The pp/manager module is divided into highly cohesive feature sub-modules:

### 1. manager_crm
Handles all lead generation, enquiries, follow-ups, and the conversion pipeline.
- **manager_crm_components/**: UI Views (ManagerCrmEnquiriesClient.tsx, ManagerCrmKanbanBoard.tsx).
- **manager_crm_hooks/**: Extracted logic (useManagerCrmEnquiriesDetail.ts).
- **manager_crm_utils/**: Zod validation schemas (ManagerCrmValidation.ts).
- **Data**: Isolated in manager_crm_constants/ManagerCrmConstants.ts.

### 2. manager_students
Handles student directory, manual/group admissions, ID card generation, and exit flows.
- **manager_students_components/**: UI Views (ManagerStudentsClient.tsx, ManagerStudentsIdCardClient.tsx).
- **manager_students_hooks/**: useStudentsList.ts (with Debounce integration).
- **Data**: Isolated in manager_students_constants/ManagerStudentsConstants.ts.

### 3. manager_seats_shifts_lockers
Handles shift assignments, seat matrix, locker allocation, and maintenance.
- **manager_seats_shifts_lockers_components/**: UI Views (ManagerSeatsLockerMatrixClient.tsx, ManagerSeatsSeatManagementClient.tsx).
- **Data**: Isolated in manager_seats_shifts_lockers_constants/ManagerSeatsConstants.ts.

### 4. manager_engagement
Handles attendance tracking, absentee reports, and holiday calendars.
- **manager_engagement_components/**: UI Views (ManagerEngagementAbsenteeReportClient.tsx).
- **manager_engagement_hooks/**: Extracted logic (useManagerEngagementAbsentee.ts).
- **Data**: Isolated in manager_engagement_constants/ManagerEngagementConstants.ts.

### 5. manager_communication
Handles SMS, WhatsApp logs, and notification dispatching.
- **manager_communication_components/**: UI Views (ManagerCommunicationWhatsappLogsClient.tsx).
- **Data**: Isolated in manager_communication_constants/ManagerCommunicationConstants.ts.

### 6. manager_dashboard
The high-level KPI dashboard summarizing revenue, capacity, and alerts.
- **Data**: Isolated in manager_dashboard_constants/ManagerDashboardConstants.ts.

### 7. manager_reports
Detailed financial and operational analytics generation.
- **Data**: Isolated in manager_reports_constants/ManagerReportsConstants.ts.

### 8. Shared & Global Configs
- **manager_url_config.ts**: Centralized hub for ALL routes (MANAGER_ROUTES).
- **manager_shared_hooks/**: Contains cross-module hooks like useDebounce.ts.
- **manager_shared_components/**: Contains cross-module components like ManagerSearchableDropdown.tsx.

## Key AI Directives
- **Fixing Logic Bugs**: If the bug is about data filtering, calculation, or API failure, search for the use[Component].ts hook. DO NOT modify the .tsx UI component.
- **Adding a Field to a Form**: Update the Zod schema in ..._utils/[moduleName]Validation.ts FIRST. Then update the .tsx component.
- **Creating a Component**: It must have // RESPONSIBILITY: ... at the very top. It must end in a structural noun (Modal, Client, Card). It must be placed in a [moduleName]_components folder.
