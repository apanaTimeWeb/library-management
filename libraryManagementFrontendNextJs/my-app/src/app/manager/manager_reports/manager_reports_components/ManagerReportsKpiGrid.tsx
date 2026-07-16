import React from 'react';
import { Users, CalendarCheck, UserPlus, Phone } from 'lucide-react';
import { ManagerReportsKpiCard } from '../manager_reports_types/ManagerReportsTypes';

// RESPONSIBILITY: Renders the row of KPI stat cards for the manager reports.

const iconMap: Record<string, React.ElementType> = { Users, CalendarCheck, UserPlus, Phone };

interface ManagerReportsKpiGridProps {
  cards: ManagerReportsKpiCard[];
}

export function ManagerReportsKpiGrid({ cards }: ManagerReportsKpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((kpi, index) => {
        const IconComponent = iconMap[kpi.icon];
        const isPositive = kpi.trend?.includes('↑');
        const isNegative = kpi.trend?.includes('↓');
        const trendClass = isPositive ? 'text-[var(--success)]' : isNegative ? 'text-[var(--danger)]' : 'text-[var(--text-secondary)]';

        return (
          <div
            key={index}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 ${kpi.iconClass}`}>
                {IconComponent && <IconComponent size={20} />}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider truncate" title={kpi.title}>
                  {kpi.title}
                </p>
                <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">
                  {kpi.value}
                </p>
              </div>
            </div>
            {kpi.trend && (
              <div className={`mt-4 text-xs font-medium ${trendClass}`}>
                {kpi.trend}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
