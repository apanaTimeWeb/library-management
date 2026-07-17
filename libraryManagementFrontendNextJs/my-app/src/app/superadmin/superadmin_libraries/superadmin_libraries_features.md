# Superadmin Libraries Module Features

## Overview
This module is responsible for viewing, managing, and editing library branches across the platform for a Superadmin. It tracks library details such as name, location, owner, contact, occupancy, and subscription plans.

## Directory Structure
- `superadmin_libraries_components/`: Contains all UI components (`SuperadminLibrariesGrid`, `SuperadminLibrariesPanel`, `SuperadminLibrariesHeader`, `SuperadminLibrariesErrorBoundary`, `SuperadminLibrariesEmptyState`).
- `superadmin_libraries_constants/`: Contains static data and configuration (`SuperadminLibrariesConstants.ts`, `superadmin_libraries_url_config.ts`).
- `superadmin_libraries_hooks/`: Contains custom hooks encapsulating logic and state (`superadmin_useSuperadminLibraries.ts`).
- `superadmin_libraries_types/`: Contains interfaces, zod schemas, and type definitions (`SuperadminLibrariesTypes.ts`).
- `superadmin_libraries_utils/`: Contains utility functions for data transformations like phone masking (`superadmin_libraries_utils.ts`).

## State Management & Data Flow
- **State**: The list of libraries and the async fetch status (`idle`, `loading`, `success`, `error`) are managed in `superadmin_useSuperadminLibraries.ts` using local `useState` combined with a `fetchState` enum.
- **Data Flow**: The `page.tsx` renders `SuperadminLibrariesClient`, which calls the custom hook to load data. The data is passed down to presentation components like `SuperadminLibrariesGrid`. Any actions (edit, suspend) are bubbled up to the client via callbacks, which then invokes the hook's mutator functions.

## Forms
The side-drawer edit panel uses `react-hook-form` combined with `@hookform/resolvers/zod` for robust client-side validation against `superadminLibrarySchema`.
