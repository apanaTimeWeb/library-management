'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/lib/logger';

// RESPONSIBILITY: Catches errors exclusively within the Manager Students module and prevents the whole app from crashing.

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ManagerStudentsErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Uncaught error in Manager Students', { message: error.message, componentStack: errorInfo.componentStack });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center bg-bg-card rounded-lg border border-border">
          <h2 className="text-danger text-xl font-bold mb-2">Student Module Error</h2>
          <p className="text-text-secondary mb-4">{this.state.error?.message || 'An unexpected error occurred in the students module.'}</p>
          <button
            className="mgr-btn-primary"
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
