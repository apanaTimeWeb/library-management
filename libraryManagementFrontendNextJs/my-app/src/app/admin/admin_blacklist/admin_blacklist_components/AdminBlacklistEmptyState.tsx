// RESPONSIBILITY: Renders the empty state when no blacklisted students match the query or exist (`Rule 38`, `Rule 50`).
// DATA FLOW: Parent Client Component -> AdminBlacklistEmptyState

import { AlertOctagon } from 'lucide-react';


export interface AdminBlacklistEmptyStateProps {
  onResetSearch?: () => void;
  isSearching: boolean;
}

export function AdminBlacklistEmptyState({ onResetSearch, isSearching }: AdminBlacklistEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card border-border my-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-danger/10 text-danger mb-4">
        <AlertOctagon size={24} />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">
        {isSearching ? 'No Matching Blacklisted Students' : 'No Blacklisted Students'}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {isSearching
          ? 'No blacklisted students match your current search term. Try resetting your search query.'
          : 'Great news! There are currently no blacklisted students in the library records.'}
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
