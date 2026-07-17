// RESPONSIBILITY: Renders the admin test harness/sandbox page for validating admin components and utilities.
// DATA FLOW: AdminTestPage -> UI Components

import React from 'react';

export default function AdminTestPage() {
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold text-primary">Admin Component Sandbox & Test Harness</h1>
      <p className="text-sm text-muted-foreground">
        Use this sandbox page to verify UI components, design tokens, and module isolation in development.
      </p>
    </div>
  );
}

