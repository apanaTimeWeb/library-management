// RESPONSIBILITY: Renders empty state when no membership plans match query or exist (`Rule 38`, `Rule 50`).
// DATA FLOW: Parent Client Component -> AdminPlansEmptyState

import { IndianRupee } from 'lucide-react';


export interface AdminPlansEmptyStateProps {
  onResetSearch?: () => void;
  isSearching: boolean;
}

export function AdminPlansEmptyState({ onResetSearch, isSearching }: AdminPlansEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card border-border my-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
        <IndianRupee size={24} />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">
        {isSearching ? 'No Matching Membership Plans' : 'No Plans Available'}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {isSearching
          ? 'No membership plans match your current search criteria. Try clearing your search text.'
          : 'Create your first membership pricing plan to enable subscriptions and seat allocations across library branches.'}
      </p>
      {isSearching && onResetSearch && (
        <button
          onClick={onResetSearch}
          className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Clear Search
        </button>
      )}
    </div>
  );
}
