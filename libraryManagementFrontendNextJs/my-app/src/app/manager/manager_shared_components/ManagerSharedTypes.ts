// RESPONSIBILITY: Centralizes all shared TypeScript interfaces and types for the manager_shared_components folder.
// DATA FLOW: Consumed by ManagerErrorBoundary.tsx → no API calls here.

import { ReactNode } from 'react';

// ── ManagerErrorBoundary ──────────────────────────────────────────────────────
export interface ManagerErrorBoundaryProps {
  children: ReactNode;
}

export interface ManagerErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
