// RESPONSIBILITY: Catches runtime UI errors within the Superadmin Libraries module and displays a fallback recovery interface without leaking sensitive stack traces.
'use client';
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import type { SuperadminLibrariesErrorBoundaryProps as Props } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_types/SuperadminLibrariesTypes';

export default function SuperadminLibrariesErrorBoundary({ error, reset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-bg-card border border-danger/20 rounded-[var(--radius-lg)] shadow-sm max-w-lg mx-auto mt-12 text-center animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-full bg-danger-bg flex items-center justify-center mb-6">
        <AlertTriangle size={32} className="text-danger" />
      </div>
      <h2 className="text-xl font-bold text-text-primary mb-2">Failed to Load Libraries</h2>
      <p className="text-sm text-text-secondary mb-8 leading-relaxed max-w-sm">
        We encountered an unexpected issue while trying to render the library branches. Please try again.
      </p>
      <button 
        onClick={reset}
        className="flex items-center gap-2 bg-bg-input border border-border text-text-primary hover:text-primary hover:border-primary-subtle text-sm font-bold px-6 py-2.5 rounded-[var(--radius-md)] transition-all active:scale-95 shadow-sm"
      >
        <RefreshCw size={16} /> Try Again
      </button>
      <p className="text-xs text-text-disabled mt-6 font-mono bg-bg-page px-3 py-1.5 rounded-md select-all">
        ERR_DIGEST: {error.digest || 'UNKNOWN_ERROR'}
      </p>
    </div>
  );
}
