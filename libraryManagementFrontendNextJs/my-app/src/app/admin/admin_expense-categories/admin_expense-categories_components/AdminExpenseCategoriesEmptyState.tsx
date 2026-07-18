// RESPONSIBILITY: Renders empty state when no categories match query or exist (`Rule 38`, `Rule 50`).
// DATA FLOW: Parent Client Component -> AdminExpenseCategoriesEmptyState

import { Tag } from 'lucide-react';
import { AdminExpenseCategoriesEmptyStateProps } from "./AdminExpenseCategoriesEmptyState_types";

export function AdminExpenseCategoriesEmptyState({ onResetSearch, isSearching }: AdminExpenseCategoriesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card border-border my-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
        <Tag size={24} />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">
        {isSearching ? 'No Matching Expense Categories' : 'No Categories Available'}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {isSearching
          ? 'No categories match your current search criteria. Try clearing your search text.'
          : 'Define categories (like Electricity, Rent, Maintenance) to help managers organize daily settlement expenses.'}
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
