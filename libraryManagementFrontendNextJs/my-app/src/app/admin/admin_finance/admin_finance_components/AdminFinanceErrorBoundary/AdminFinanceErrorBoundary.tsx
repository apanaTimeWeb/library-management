// RESPONSIBILITY: Typed Error Boundary component specific to the admin_finance module.
'use client';
// DATA FLOW: Error -> AdminFinanceErrorBoundary -> Fallback UI

import React from 'react';

export class AdminFinanceErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div className="p-4 text-danger">Module specific error occurred.</div>;
    return this.props.children;
  }
}

