'use client';
import { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/lib/logger';

import type { DashboardErrorBoundaryProps, DashboardErrorBoundaryState } from '@/app/manager/manager_dashboard/manager_dashboard_types';

// RESPONSIBILITY: Catches errors exclusively within the Manager Dashboard module.

export class ManagerDashboardErrorBoundary extends Component<DashboardErrorBoundaryProps, DashboardErrorBoundaryState> {
  public state: DashboardErrorBoundaryState = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): DashboardErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Uncaught error in Manager Dashboard', { message: error.message, componentStack: errorInfo.componentStack });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center bg-bg-pageg-card rounded-lg border border-border">
          <h2 className="text-danger text-xl font-bold mb-2">Dashboard Error</h2>
          <p className="text-text-secondary mb-4">{this.state.error?.message || 'An unexpected error occurred loading the dashboard.'}</p>
          <button
            className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

