// RESPONSIBILITY: Renders the SuperadminSystemHealthGatewaysCard component.
import React from 'react';
import { Globe } from 'lucide-react';
import type { SuperadminSystemHealthGateway } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_types/SuperadminSystemHealthTypes';

interface Props {
  gateways: SuperadminSystemHealthGateway[];
}

const COLOR_DOT_CLS: Record<string, string> = {
  success: 'bg-success shadow-[0_0_8px_var(--success)]',
  info:    'bg-info shadow-[0_0_8px_var(--info,#3B82F6)]',
  warning: 'bg-warning shadow-[0_0_8px_var(--warning)]',
  danger:  'bg-danger shadow-[0_0_8px_var(--danger)]',
};

export function SuperadminSystemHealthGatewaysCard({ gateways }: Props) {
  return (
    <div className="col-span-1 md:col-span-2 bg-bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-sm font-bold text-text-primary mb-5 flex items-center gap-2 uppercase tracking-wider">
        <Globe size={18} className="text-primary" /> External Gateways
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {gateways.map((g) => (
          <div key={g.n} className="flex items-center gap-4 bg-bg-input border border-border p-4 rounded-[var(--radius-md)] shadow-inner transition-colors hover:border-primary">
            <div className={`w-3 h-3 rounded-full shrink-0 ${COLOR_DOT_CLS[g.dotColorKey]}`} />
            <div>
              <p className="text-sm font-bold text-text-primary leading-tight">{g.n}</p>
              <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mt-0.5">{g.st}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

