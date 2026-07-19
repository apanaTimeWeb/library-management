'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
}

export class ManagerCommunicationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Manager Communication Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 m-6 bg-danger-bg text-danger rounded-xl border border-danger/20 flex flex-col items-start gap-4">
          <h2 className="text-xl font-bold">Communication Module Error</h2>
          <p className="text-sm">Something went wrong while rendering this section.</p>
          <code className="bg-white/50 px-3 py-2 rounded text-xs w-full overflow-auto">
            {this.state.errorMessage}
          </code>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-danger text-white rounded-lg text-sm font-medium hover:bg-danger/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
