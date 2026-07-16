import React from 'react';

// RESPONSIBILITY: Renders the filter controls (Date Range, Branch) and triggers state updates.

interface ManagerReportsFilterBarProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

export function ManagerReportsFilterBar({ dateRange, onDateRangeChange }: ManagerReportsFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 bg-[var(--bg-card)] p-4 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm">
      <div className="flex flex-col gap-1 w-full sm:w-auto">
        <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
          Date Range
        </label>
        <select
          className="bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)] transition-all duration-200 ease-in-out cursor-pointer"
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      
      <div className="flex flex-col gap-1 w-full sm:w-auto">
        <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
          Branch
        </label>
        <select
          className="bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] opacity-50 cursor-not-allowed"
          disabled
        >
          <option>HQ Branch</option>
        </select>
      </div>
    </div>
  );
}
