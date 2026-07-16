import React from 'react';

export function SuperadminSubscriptionsHeader() {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-text-disabled uppercase tracking-widest mb-2">
        <span>Nexus 360</span><span>/</span><span>Super Admin</span><span>/</span><span className="text-primary">Subscriptions</span>
      </div>
      <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">SaaS Subscriptions</h1>
    </div>
  );
}
