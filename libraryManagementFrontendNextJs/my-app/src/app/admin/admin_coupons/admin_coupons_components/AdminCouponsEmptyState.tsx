// RESPONSIBILITY: Renders standardized empty state when no coupons exist or match filter (`Rule 38`, `Rule 50`).
// DATA FLOW: Parent Client Component -> AdminCouponsEmptyState

import { Tag } from 'lucide-react';

interface AdminCouponsEmptyStateProps {
  onResetSearch?: () => void;
  isSearching: boolean;
}

export function AdminCouponsEmptyState({ onResetSearch, isSearching }: AdminCouponsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card border-border my-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
        <Tag size={24} />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">
        {isSearching ? 'No Matching Coupons' : 'No Coupons Available'}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {isSearching
          ? 'No coupons match your current search query. Try clearing your search text.'
          : 'Create your first discount coupon code to start offering promotional plans to library students.'}
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
