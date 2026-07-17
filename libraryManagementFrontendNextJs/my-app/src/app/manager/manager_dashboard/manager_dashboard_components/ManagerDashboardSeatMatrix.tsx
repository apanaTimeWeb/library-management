'use client';

import { useRouter } from 'next/navigation';
import type { DashboardSeatData, DashboardSeatMatrixProps } from '@/app/manager/manager_dashboard/manager_dashboard_types';
import { SEAT_CLASS } from '@/app/manager/manager_dashboard/manager_dashboard_constants';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';

// RESPONSIBILITY: Renders the seat matrix visual grid and handles routing to student list with seat filter.

export function ManagerDashboardSeatMatrix({ seatData }: DashboardSeatMatrixProps) {
  const router = useRouter();

  if (!seatData || seatData.length === 0) return null;

  return (
    <div className="bg-bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-text-primary">Mini Seat Matrix — Today&apos;s Shifts</h2>
      </div>
      <div className="">
        <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 mb-6">
          {seatData.map((seat) => (
            <div
              key={seat.id}
              className={`aspect-square rounded-md border flex items-center justify-center text-[11px] font-bold cursor-pointer transition-colors hover:opacity-80 ${SEAT_CLASS[seat.status] || ''}`}
              onClick={() => router.push(`${MANAGER_ROUTES.STUDENTS}?seat=${seat.id}`)}
            >
              {seat.id}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 border-t border-border pt-4">
          <div className="flex items-center gap-2 text-[11px] font-medium text-text-secondary uppercase tracking-wider">
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
            Available
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-text-secondary uppercase tracking-wider">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            Occupied
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-text-secondary uppercase tracking-wider">
            <div className="w-2.5 h-2.5 rounded-full bg-warning" />
            Expiring Soon
          </div>
        </div>
      </div>
    </div>
  );
}

