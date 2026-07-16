'use client';

// RESPONSIBILITY: Typed Error Boundary for the admin_dashboard module. Displays a module-specific fallback UI with a Retry button.
// DATA FLOW: Error -> AdminDashboardErrorBoundary -> Fallback UI

import React from 'react';

interface AdminDashboardErrorBoundaryProps {
  children: React.ReactNode;
  reset?: () => void;
}

interface AdminDashboardErrorBoundaryState {
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
        <div className="admin-empty-state">
          <p className="admin-empty-title">Dashboard failed to load</p>
          <p className="admin-empty-sub">An unexpected error occurred in the Dashboard module.</p>
          <button className="admin-btn-ghost admin-btn-sm" onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
