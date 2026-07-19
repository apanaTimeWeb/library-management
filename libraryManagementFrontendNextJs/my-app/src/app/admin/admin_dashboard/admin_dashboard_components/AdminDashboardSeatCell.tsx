'use client';
// RESPONSIBILITY: Renders the AdminDashboardSeatCell component.
import type { AdminDashboardSeatCellProps } from '@/app/admin/admin_dashboard/admin_dashboard_types/admin_dashboard_types';

function getShiftClass(shift: string): string {
  const map: Record<string, string> = {
    Morning: 'bg-primary-subtle text-primary',
    Evening: 'bg-info-bg text-info',
    Night:   'bg-purple-bg text-purple',
  };
  return map[shift] ?? 'bg-input text-text-primary';
}

export function AdminDashboardSeatCell({ id, status, occupant, shift, expiry, onClick }: AdminDashboardSeatCellProps) {
  const statusClasses = {
    free: 'bg-success-bg text-success border-success/30 hover:bg-success/20 hover:border-success/50',
    occupied: 'bg-info-bg text-info border-info/30 hover:bg-info/20 hover:border-info/50',
    expiring: 'bg-warning-bg text-warning border-warning/30 hover:bg-warning/20 hover:border-warning/50',
    maintenance: 'bg-page text-text-secondary border-border hover:bg-input',
  };

  return (
    <div
      className={`${statusClasses[status]} group relative w-16 h-16 rounded-xl flex items-center justify-center cursor-pointer transition-all border shadow-sm`}
      onClick={onClick}
    >
      <span className="font-bold text-xs">{id}</span>

      {/* Tooltip */}
      <div className="absolute z-10 bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-52 bg-card border border-border text-text-primary text-xs rounded-lg px-3 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl flex flex-col items-center gap-1">
        {occupant ? (
          <>
            <span className="font-bold">{occupant}</span>
            {shift && <span className={`text-xs px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${getShiftClass(shift)}`}>{shift}</span>}
            {expiry && (
              <span className={`text-xs mt-1 ${status === 'expiring' ? 'text-danger font-bold' : 'text-text-secondary'}`}>
                Expires: {expiry}
              </span>
            )}
          </>
        ) : (
          <span className="font-medium">
            {status === 'free' ? 'Free — click to assign' : 'Under Maintenance'}
          </span>
        )}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
      </div>
    </div>
  );
}
