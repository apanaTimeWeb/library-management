// RESPONSIBILITY: Renders the SuperadminSeatGapReportHeader component.
import React from 'react';

export function SuperadminSeatGapReportHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Seat Gap Report</h1>
        <p className="text-sm font-medium text-text-secondary">Identify vacant seats and estimated revenue loss.</p>
      </div>
    </div>
  );
}
