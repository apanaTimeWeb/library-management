import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminDashboardErrorBoundaryProps {
  children: React.ReactNode;
  reset?: () => void;
}
export interface AdminDashboardErrorBoundaryState {
  hasError: boolean;
}
