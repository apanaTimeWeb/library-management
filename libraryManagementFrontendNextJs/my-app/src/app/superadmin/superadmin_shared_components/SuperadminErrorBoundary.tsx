'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export class SuperadminErrorBoundary extends React.Component<
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
    console.error('Superadmin Module Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg-page text-text-primary">
          <div className="flex justify-center mb-4">
            <AlertCircle size={64} className="text-danger" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Superadmin Module Error</h2>
          <p className="text-md text-text-secondary mb-6 max-w-md text-center">
            A critical error occurred while loading this administrative interface. 
            Check the console logs for details.
          </p>
          <button
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 font-medium transition-colors"
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
