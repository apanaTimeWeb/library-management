'use client';
﻿
// RESPONSIBILITY: Renders the ManagerCrmEnquiriesDetailSub.tsx component/page.
export function timelineDotClass(by: string): string {
  if (by === 'System') return 'crm-timeline-dot--system';
  const lower = by.toLowerCase();
  if (lower.includes('sarah')) return 'crm-timeline-dot--success';
  if (lower.includes('mike'))  return 'crm-timeline-dot--info';
  if (lower.includes('admin')) return 'crm-timeline-dot--warning';
  return '';
}

export function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-text-tertiary mt-0.5">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-medium text-text-primary">{value}</p>
      </div>
    </div>
  );
}

