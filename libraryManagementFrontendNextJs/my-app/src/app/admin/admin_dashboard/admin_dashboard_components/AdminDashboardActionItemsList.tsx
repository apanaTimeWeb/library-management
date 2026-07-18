// RESPONSIBILITY: Renders the AdminDashboardActionItemsList component.
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { AdminDashboardActionItem } from '@/app/admin/admin_dashboard/admin_dashboard_types/admin_dashboard_types';

export function AdminDashboardActionItemsList({ items }: { items: AdminDashboardActionItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        const isDanger = item.type === 'danger';
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
              isDanger 
                ? 'bg-danger-bg border-danger/20 hover:bg-danger/15' 
                : 'bg-warning-bg border-warning/20 hover:bg-warning/15'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                size={16}
                className={isDanger ? 'text-danger' : 'text-warning'}
              />
              <span className="text-sm font-medium text-text-primary">
                <span className={`font-bold mr-1 ${isDanger ? 'text-danger' : 'text-warning'}`}>
                  {item.count}
                </span>{' '}
                {item.label}
              </span>
            </div>
            <ChevronRight size={14} className="text-text-secondary" />
          </Link>
        );
      })}
    </div>
  );
}
