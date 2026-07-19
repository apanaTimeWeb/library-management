import React from 'react';

// RESPONSIBILITY: Renders the read-only breadcrumb and page title for manager reports.

export function ManagerReportsHeader() {
  return (
    <div className="flex flex-col gap-1 mb-6">
      <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
        Manager › Reports
      </p>
      <h1 className="text-text-primary text-xl font-bold text-text-primary">
        Reports
      </h1>
      <p className="text-sm text-text-secondary">
        Operational overview — finance reports blocked
      </p>
    </div>
  );
}
