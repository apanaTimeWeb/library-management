// RESPONSIBILITY: Renders empty state when no expenses match query or exist (`Rule 38`, `Rule 50`).
// DATA FLOW: Parent Client Component -> AdminExpensesEmptyState

import { IndianRupee } from 'lucide-react';

interface AdminExpensesEmptyStateProps {
  onResetSearch?: () => void;
  isSearching: boolean;
}

export function AdminExpensesEmptyState({ onResetSearch, isSearching }: AdminExpensesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card border-border my-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-danger/10 text-danger mb-4">
        <IndianRupee size={24} />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">
        {isSearching ? 'No Matching Expenses' : 'No Expenses Recorded'}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {isSearching
          ? 'No expenses match your current search criteria. Try clearing your search text.'
          : 'No expenses have been recorded yet for the selected branch. Expenses logged during daily settlement will appear here.'}
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
