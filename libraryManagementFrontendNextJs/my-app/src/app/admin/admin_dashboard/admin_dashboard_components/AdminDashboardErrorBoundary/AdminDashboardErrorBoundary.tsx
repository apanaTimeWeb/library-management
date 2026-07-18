// RESPONSIBILITY: Typed Error Boundary for the admin_dashboard module. Displays a module-specific fallback UI with a Retry button.
'use client';
// DATA FLOW: Error -> AdminDashboardErrorBoundary -> Fallback UI

import React from 'react';


export interface AdminDashboardErrorBoundaryProps {
  children: React.ReactNode;
  reset?: () => void;
}
export interface AdminDashboardErrorBoundaryState {
  hasError: boolean;
}

export class AdminDashboardErrorBoundary extends React.Component<
  AdminDashboardErrorBoundaryProps,
  AdminDashboardErrorBoundaryState
> {
  constructor(props: AdminDashboardErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): AdminDashboardErrorBoundaryState {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    this.props.reset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-72">
          <p className="text-lg font-semibold text-foreground mb-1">Dashboard failed to load</p>
          <p className="text-sm text-muted-foreground mb-6">An unexpected error occurred in the Dashboard module.</p>
          <button className="px-4 py-2 text-sm font-medium border border-border bg-transparent text-foreground rounded-lg hover:bg-muted/50 transition-colors" onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
