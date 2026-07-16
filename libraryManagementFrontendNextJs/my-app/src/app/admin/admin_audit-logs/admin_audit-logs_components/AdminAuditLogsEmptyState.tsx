// RESPONSIBILITY: Renders the standardized empty state when no audit logs match the current filter or query (`Rule 38`, `Rule 50`).
// DATA FLOW: Parent Client Component -> AdminAuditLogsEmptyState

import { ShieldAlert } from 'lucide-react';

interface AdminAuditLogsEmptyStateProps {
  onResetFilters: () => void;
}

export function AdminAuditLogsEmptyState({ onResetFilters }: AdminAuditLogsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card border-border my-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
        <ShieldAlert size={24} />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">No Audit Logs Found</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        We couldn't find any audit logs matching your current search or severity criteria. Try resetting your filters.
      </p>
      <button
        onClick={onResetFilters}
        className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
}
