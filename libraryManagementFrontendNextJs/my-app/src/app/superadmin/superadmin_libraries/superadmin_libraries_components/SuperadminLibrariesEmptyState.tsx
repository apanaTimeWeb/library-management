// RESPONSIBILITY: Displays a standard empty state when no library branches are found in the system or search.
import React from 'react';
import { Building, Plus } from 'lucide-react';

export function SuperadminLibrariesEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] w-full bg-bg-card rounded-[var(--radius-lg)] p-8 text-center animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-full bg-bg-input flex items-center justify-center mb-4">
        <Building size={32} className="text-text-disabled" />
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-1">No libraries found</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6">
        Get started by registering the first library branch to the Nexus 360 platform, or adjust your search filters.
      </p>
    </div>
  );
}
