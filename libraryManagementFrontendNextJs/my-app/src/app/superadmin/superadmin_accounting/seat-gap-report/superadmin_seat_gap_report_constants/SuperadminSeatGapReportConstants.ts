import type { SuperadminGapRow } from '../superadmin_seat_gap_report_types/SuperadminSeatGapReportTypes';

export const SUPERADMIN_SEAT_GAP_REPORT_MOCK_DATA: SuperadminGapRow[] = [
  { seatNo: 'A-04', shift: 'Morning',   floor: 'Ground', lastOccupied: '2026-03-28', gapDays: 14, revenueLoss: 700,  status: 'vacant'      },
  { seatNo: 'B-11', shift: 'Afternoon', floor: 'First',  lastOccupied: '2026-03-20', gapDays: 22, revenueLoss: 1100, status: 'vacant'      },
  { seatNo: 'C-07', shift: 'Night',     floor: 'Ground', lastOccupied: '2026-04-01', gapDays: 10, revenueLoss: 500,  status: 'maintenance' },
  { seatNo: 'A-09', shift: 'Morning',   floor: 'First',  lastOccupied: '2026-03-15', gapDays: 27, revenueLoss: 1350, status: 'vacant'      },
  { seatNo: 'D-02', shift: 'Afternoon', floor: 'Second', lastOccupied: '2026-04-05', gapDays: 6,  revenueLoss: 300,  status: 'vacant'      },
  { seatNo: 'B-15', shift: 'Morning',   floor: 'Ground', lastOccupied: '2026-03-10', gapDays: 32, revenueLoss: 1600, status: 'vacant'      },
];

export const SUPERADMIN_SEAT_GAP_REPORT_STATUS_STYLES: Record<string, string> = {
  vacant:      'bg-[var(--warning-bg,rgba(251,191,36,0.1))] text-[var(--warning)] border border-[var(--warning)]/20',
  maintenance: 'bg-[var(--danger-bg,rgba(248,113,113,0.1))] text-[var(--danger)] border border-[var(--danger)]/20',
};
