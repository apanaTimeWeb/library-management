// RESPONSIBILITY: Renders the Next.js native error boundary for the admin_students module.
'use client';
// DATA FLOW: Next.js Router -> error.tsx

import { useEffect } from 'react';
import { logger } from '@/lib/logger';
import type { AdminStudentsErrorBoundaryProps } from '@/app/admin/admin_students/admin_students_types/admin_students_types';

export default function ErrorBoundary({ error, reset }: AdminStudentsErrorBoundaryProps) {
  useEffect(() => { 
    logger.error('Admin Module Error:', { message: error.message, digest: error.digest }); 
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-96 p-8 text-center space-y-4 bg-bg-page">
      <h2 className="text-xl font-bold text-danger">Something went wrong in the Students view!</h2>
      <p className="text-sm text-text-secondary max-w-md">
        An unexpected error occurred while loading the students data.
        If this persists, please contact support.
      </p>
      <button 
        onClick={() => reset()} 
        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-[var(--radius-md)] transition-colors font-semibold shadow-sm"
      >
        Try again
      </button>
    </div>
  );
}
