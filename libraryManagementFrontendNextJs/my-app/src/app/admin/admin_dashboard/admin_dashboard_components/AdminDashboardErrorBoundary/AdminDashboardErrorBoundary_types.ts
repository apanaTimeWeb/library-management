import React from "react";
export interface AdminDashboardErrorBoundaryProps {
  children: React.ReactNode;
  reset?: () => void;
}
export interface AdminDashboardErrorBoundaryState {
  hasError: boolean;
}
