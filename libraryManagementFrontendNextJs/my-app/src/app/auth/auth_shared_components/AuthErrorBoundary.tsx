'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export class AuthErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Auth Module Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-page)] text-[var(--text-primary)]">
          <div className="auth-card text-center max-w-sm">
            <div className="flex justify-center mb-4">
              <AlertCircle size={48} className="text-[var(--danger)]" />
            </div>
            <h2 className="text-xl font-bold mb-2">Auth Module Error</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Something went wrong while loading the authentication module.
            </p>
            <button
              className="auth-btn-primary"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
