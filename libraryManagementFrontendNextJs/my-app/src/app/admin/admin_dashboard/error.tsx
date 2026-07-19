'use client';
// RESPONSIBILITY: Renders the Next.js native error boundary for the admin_dashboard module.
// DATA FLOW: Next.js Router -> error.tsx

import { useEffect } from 'react';
import type { AdminDashboardErrorBoundaryProps } from '@/app/admin/admin_dashboard/admin_dashboard_types/admin_dashboard_types';

export default function ErrorBoundary({ error, reset }: AdminDashboardErrorBoundaryProps) {
  useEffect(() => { 
    console.error(error); 
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-96 p-8 text-center space-y-4 bg-page">
      <h2 className="text-xl font-bold text-danger">Something went wrong in the Dashboard!</h2>
      <p className="text-sm text-text-secondary max-w-md">
        An unexpected error occurred while loading the dashboard components. 
        If this persists, please contact support.
      </p>
      <button 
        onClick={() => reset()} 
        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-colors font-semibold shadow-sm"
      >
        Try again
      </button>
    </div>
  );
}
