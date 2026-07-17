'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/lib/logger';

// RESPONSIBILITY: Catches errors exclusively within the Manager CRM module.

import type { ManagerCrmErrorBoundaryProps, ManagerCrmErrorBoundaryState } from '@/app/manager/manager_crm/manager_crm_types/ManagerCrmTypes';

export class ManagerCrmErrorBoundary extends Component<ManagerCrmErrorBoundaryProps, ManagerCrmErrorBoundaryState> {
  public state: ManagerCrmErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): ManagerCrmErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Uncaught error in Manager CRM', { message: error.message, componentStack: errorInfo.componentStack });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center bg-bg-card rounded-lg border border-border">
          <h2 className="text-danger text-xl font-bold mb-2">CRM Module Error</h2>
          <p className="text-text-secondary mb-4">{this.state.error?.message || 'An unexpected error occurred in the CRM module.'}</p>
          <button
            className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

