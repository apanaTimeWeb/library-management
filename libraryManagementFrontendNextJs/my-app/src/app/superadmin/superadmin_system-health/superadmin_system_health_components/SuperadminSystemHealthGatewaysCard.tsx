import React from 'react';
import { Globe } from 'lucide-react';
import type { SuperadminSystemHealthGateway } from '../superadmin_system_health_types/SuperadminSystemHealthTypes';

interface Props {
  gateways: SuperadminSystemHealthGateway[];
}

const COLOR_DOT_CLS: Record<string, string> = {
  success: 'bg-[var(--success)] shadow-[0_0_8px_var(--success)]',
  info:    'bg-[var(--info,#3B82F6)] shadow-[0_0_8px_var(--info,#3B82F6)]',
  warning: 'bg-[var(--warning)] shadow-[0_0_8px_var(--warning)]',
  danger:  'bg-[var(--danger)] shadow-[0_0_8px_var(--danger)]',
};

export function SuperadminSystemHealthGatewaysCard({ gateways }: Props) {
  return (
    <div className="col-span-1 md:col-span-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-sm font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2 uppercase tracking-wider">
        <Globe size={18} className="text-[var(--primary)]" /> External Gateways
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {gateways.map((g) => (
          <div key={g.n} className="flex items-center gap-4 bg-[var(--bg-input)] border border-[var(--border)] p-4 rounded-[var(--radius-md)] shadow-inner transition-colors hover:border-[var(--primary)]">
            <div className={`w-3 h-3 rounded-full shrink-0 ${COLOR_DOT_CLS[g.dotColorKey]}`} />
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)] leading-tight">{g.n}</p>
              <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mt-0.5">{g.st}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
