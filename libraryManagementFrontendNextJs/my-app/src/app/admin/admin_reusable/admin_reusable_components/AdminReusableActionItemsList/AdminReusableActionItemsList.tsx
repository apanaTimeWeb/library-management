// RESPONSIBILITY: Renders the action items attention list with dynamic alert counts and link navigation.
// DATA FLOW: AdminDashboardPage -> AdminReusableActionItemsList

import Link from 'next/link';
import { ChevronRight, type LucideIcon } from 'lucide-react';

export interface AdminReusableActionItem {
  icon: LucideIcon;
  label: string;
  count: number;
  type: 'danger' | 'warning';
  href: string;
}

export default function AdminReusableActionItemsList({ items }: { items: AdminReusableActionItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const Icon = item.icon;
        const isDanger = item.type === 'danger';
        return (
          <Link
            key={i}
            href={item.href}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
              isDanger 
                ? 'bg-danger/10 border-danger/20 hover:bg-danger/15' 
                : 'bg-warning/10 border-warning/20 hover:bg-warning/15'
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
            <ChevronRight size={14} className="text-muted-foreground" />
          </Link>
        );
      })}
    </div>
  );
}
