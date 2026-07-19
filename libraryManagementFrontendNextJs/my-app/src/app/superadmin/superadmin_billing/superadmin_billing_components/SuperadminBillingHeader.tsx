// RESPONSIBILITY: Renders the SuperadminBillingHeader component.
import React from 'react';

export function SuperadminBillingHeader() {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex items-center gap-1.5 text-xs font-bold text-text-disabled uppercase tracking-widest mb-2">
        <span>Nexus 360</span><span>/</span><span>Super Admin</span><span>/</span><span className="text-primary">Billing</span>
      </div>
      <h1 className="text-text-primary text-xl font-extrabold text-text-primary tracking-tight">Billing & Receipts</h1>
    </div>
  );
}
