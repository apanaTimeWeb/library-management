// RESPONSIBILITY: Centralizes all shared TypeScript interfaces and types for the admin_shared_components folder.
// DATA FLOW: Consumed by AdminErrorBoundary.tsx, AdminSearchableDropdown.tsx → no API calls here.

import React from 'react';

// ── AdminErrorBoundary ────────────────────────────────────────────────────────
export interface AdminErrorBoundaryProps {
  children: React.ReactNode;
}

export interface AdminErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// ── AdminSearchableDropdown ───────────────────────────────────────────────────
export interface AdminSearchableDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[] | { label: string; value: string }[];
  onValueChange?: (val: string) => void;
}
