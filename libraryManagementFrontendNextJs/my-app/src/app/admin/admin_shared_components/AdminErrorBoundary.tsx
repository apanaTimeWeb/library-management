'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface AdminErrorBoundaryProps {
  children: ReactNode;
}

export interface AdminErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class AdminErrorBoundary extends Component<AdminErrorBoundaryProps, AdminErrorBoundaryState> {
  constructor(props: AdminErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): AdminErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Admin Module Error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-card border border-border rounded-xl shadow-sm w-full max-w-2xl mx-auto mt-10 text-center">
          <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-6">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-bold text-primary mb-2">Admin Module Encountered an Error</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-md">
            {this.state.error?.message || 'Something went wrong while rendering this component. Please try reloading.'}
          </p>
          <Button onClick={this.resetError} className="gap-2 font-bold px-8">
            <RefreshCw size={16} /> Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
