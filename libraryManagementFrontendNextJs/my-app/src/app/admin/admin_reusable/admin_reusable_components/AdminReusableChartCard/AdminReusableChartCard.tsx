// RESPONSIBILITY: Renders a container card for charts with legend and status badge support.
// DATA FLOW: Any Admin page/Report Component -> AdminReusableChartCard

import { Card } from '@/components/ui/card';
import React from 'react';
import { AdminReusableChartCardProps } from "./AdminReusableChartCard_types";

export default function AdminReusableChartCard({ title, badge, badgeColor, legend, children }: AdminReusableChartCardProps) {
  return (
    <Card className="border-border bg-card shadow-none p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-base text-primary">{title}</h3>
        <div className="flex items-center gap-4">
          {legend?.map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--bg)]" style={{ '--bg': l.color } as React.CSSProperties} />
              <span className="text-xs font-medium text-muted-foreground">{l.label}</span>
            </div>
          ))}
          {badge && (
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-muted text-[color:var(--c)]" style={{ '--c': badgeColor } as React.CSSProperties}>
              {badge}
            </span>
          )}
        </div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </Card>
  );
}

