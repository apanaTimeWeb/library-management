import React from 'react';
import { Users, CalendarCheck, UserPlus, Phone } from 'lucide-react';
import type { ManagerReportsKpiCard, ManagerReportsKpiGridProps } from '@/app/manager/manager_reports/manager_reports_types/ManagerReportsTypes';

// RESPONSIBILITY: Renders the row of KPI stat cards for the manager reports.

const iconMap: Record<string, React.ElementType> = { Users, CalendarCheck, UserPlus, Phone };

export function ManagerReportsKpiGrid({ cards }: ManagerReportsKpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((kpi, index) => {
        const IconComponent = iconMap[kpi.icon];
        const isPositive = kpi.trend?.includes('↑');
        const isNegative = kpi.trend?.includes('↓');
        const trendClass = isPositive ? 'text-success' : isNegative ? 'text-danger' : 'text-text-secondary';

        return (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${kpi.iconClass}`}>
                {IconComponent && <IconComponent size={20} />}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wider truncate" title={kpi.title}>
                  {kpi.title}
                </p>
                <p className="text-text-primary text-xl font-bold text-text-primary mt-1">
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

