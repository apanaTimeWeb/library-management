import { AdminReusableSeatCellProps } from "./AdminReusableSeatCell_types";

// RESPONSIBILITY: Renders an individual seat cell block with status coloring and hover tooltip details.
'use client';
// DATA FLOW: AdminReusableSeatMatrixGrid -> AdminReusableSeatCell

/** Returns a CSS class name for the shift badge — using Tailwind */
function getShiftClass(shift: string): string {
  const map: Record<string, string> = {
    Morning: 'bg-primary/15 text-primary',
    Evening: 'bg-success/15 text-success',
    Night:   'bg-warning/15 text-warning',
  };
  return map[shift] ?? 'bg-primary/10 text-primary';
}

/** Returns status-specific styling for the seat box */
function getStatusClass(status: string): string {
  switch (status) {
    case 'free': return 'bg-success/10 border-success/30 text-success';
    case 'occupied': return 'bg-danger/10 border-danger/30 text-danger';
    case 'expiring': return 'bg-warning/10 border-warning/30 text-warning';
    case 'maintenance': return 'bg-muted/30 border-muted/30 text-muted-foreground';
    default: return 'bg-muted border-border text-foreground';
  }
}

export default function AdminReusableSeatCell({ id, status, occupant, shift, expiry, onClick }: AdminReusableSeatCellProps) {
  return (
    <div
      className={`group relative w-16 h-16 rounded-xl flex items-center justify-center cursor-pointer transition-transform hover:scale-105 border-2 ${getStatusClass(status)}`}
      onClick={onClick}
    >
      <span className="font-bold text-xs">{id}</span>

      {/* Tooltip — Name + Shift badge + Expires */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col gap-1 p-2 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-30 min-w-36 bg-card border border-border shadow-xl">
        {occupant ? (
          <>
            <span className="text-xs font-semibold text-foreground truncate">{occupant}</span>
            {shift && (
              <span className={`text-xs font-semibold rounded-full px-2 py-0.5 self-start ${getShiftClass(shift)}`}>
                {shift}
              </span>
            )}
            {expiry && (
              <span className={`text-xs ${status === 'expiring' ? 'text-warning' : 'text-muted-foreground'}`}>
                Expires: {expiry}
              </span>
            )}
          </>
        ) : (
          <span className="text-xs text-muted-foreground text-center">
            {status === 'free' ? 'Free — click to assign' : 'Under Maintenance'}
          </span>
        )}
      </div>
    </div>
  );
}
