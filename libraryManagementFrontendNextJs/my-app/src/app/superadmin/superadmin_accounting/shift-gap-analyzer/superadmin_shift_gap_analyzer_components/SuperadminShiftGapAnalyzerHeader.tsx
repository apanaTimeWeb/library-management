// RESPONSIBILITY: Renders the SuperadminShiftGapAnalyzerHeader component.
import React from 'react';

export function SuperadminShiftGapAnalyzerHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-text-primary text-xl font-extrabold text-text-primary tracking-tight">Shift Gap Analyzer</h1>
        <p className="text-sm font-medium text-text-secondary">Analyze occupancy gaps and revenue loss per shift.</p>
      </div>
    </div>
  );
}
