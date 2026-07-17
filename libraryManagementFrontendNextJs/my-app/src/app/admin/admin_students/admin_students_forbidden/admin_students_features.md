# Admin Students — Features & Architecture

## Overview
The Admin Students module provides administrators with a comprehensive view of all students enrolled in the library system. It allows filtering by branch and searching by student name, providing quick access to essential details like shift, seat, plan, and status.

## Components & Data Flow

1. **`page.tsx`**
   - **Responsibility:** Server Component that fetches the list of students from the API (`admin_students_api.ts`).
   - **Flow:** Resolves the data promise and passes the strongly typed `AdminStudentData[]` array to the client component.

2. **`useAdminStudents.ts` (Hook)**
   - **Responsibility:** Manages all client-side state for the student list.
   - **Features:** 
     - Maintains search state for client-side filtering.
     - Reads the `selectedBranch` from the global `AdminContext`.
     - Returns a memoized `filteredStudents` array.

3. **`AdminStudentsClient.tsx`**
   - **Responsibility:** The primary Client Component rendering the student data grid.
   - **Features:**
     - Displays a search bar and an export button.
     - Renders a responsive table utilizing custom design system tokens.
     - Handles empty states when searches yield no results.

## Theming & Styling
- Fully complies with `admin_theme_contract.md`.
- Uses semantic custom CSS properties (`--bg-card`, `--text-primary`) for strict isolation, avoiding un-themed Shadcn variables or arbitrary values.
