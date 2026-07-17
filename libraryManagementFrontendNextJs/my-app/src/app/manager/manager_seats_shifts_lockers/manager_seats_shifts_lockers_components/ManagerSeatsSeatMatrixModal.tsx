import { UserPlus, User } from 'lucide-react';
import type { SeatData } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types';
import { SHIFT_BADGE } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants';

// RESPONSIBILITY: Renders the seat detail modal popover.

interface ManagerSeatsSeatMatrixModalProps {
  selectedSeat: SeatData | null;
  onClose: () => void;
}

export function ManagerSeatsSeatMatrixModal({ selectedSeat, onClose }: ManagerSeatsSeatMatrixModalProps) {
  if (!selectedSeat) return null;

  return (
    <div className="ss-modal-overlay flex items-center justify-center fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div className="ss-modal bg-bg-card p-6 rounded-xl shadow-xl w-[400px] border border-border" onClick={e => e.stopPropagation()}>
        {selectedSeat.status === 'free' ? (
          <>
            <div className="ss-occupied-header__row mb-4 flex justify-between items-center">
              <span className="ss-badge ss-badge--success">Free</span>
              <span className="ss-occupied-header__seat text-lg font-bold">Seat {selectedSeat.id}</span>
            </div>
            <p className="ss-text-secondary ss-text-caption mb-6">This seat is available for assignment.</p>
            <div className="ss-modal-footer flex gap-3">
              <button className="mgr-btn-ghost flex-1" onClick={onClose}>Close</button>
              <button className="mgr-btn-primary flex-1 flex items-center justify-center gap-2">
                <UserPlus size={15} /> Assign Student
              </button>
            </div>
          </>
        ) : selectedSeat.status === 'maintenance' ? (
          <>
            <div className="ss-occupied-header__row mb-4 flex justify-between items-center">
              <span className="mgr-badge bg-bg-elevated text-text-secondary">Maintenance</span>
              <span className="ss-occupied-header__seat text-lg font-bold">Seat {selectedSeat.id}</span>
            </div>
            <p className="ss-text-secondary ss-text-caption mb-6">This seat is under maintenance and unavailable.</p>
            <div className="ss-modal-footer flex">
              <button className="mgr-btn-ghost w-full" onClick={onClose}>Close</button>
            </div>
          </>
        ) : (
          <>
            <div className="ss-occupied-header -m-6 mb-6 p-6 bg-bg-elevated rounded-t-xl">
              <div className="ss-occupied-header__row flex justify-between items-center mb-4">
                <span className={`mgr-badge ${selectedSeat.status === 'expiring' ? 'mgr-badge--warning' : 'mgr-badge--danger'}`}>
                  {selectedSeat.status === 'expiring' ? 'Expiring Soon' : 'Occupied'}
                </span>
                <span className="ss-occupied-header__seat font-bold">Seat {selectedSeat.id}</span>
              </div>
              <div className="ss-occupied-avatar-wrap flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-bg-card flex items-center justify-center mb-3">
                  <User size={32} className="text-text-secondary" />
                </div>
                <h3 className="text-text-primary font-semibold text-lg">{selectedSeat.student}</h3>
                <p className="text-text-secondary text-sm">{selectedSeat.smartId}</p>
              </div>
            </div>
            <div className="ss-detail-grid grid grid-cols-2 gap-4">
              <div className="ss-detail-cell bg-bg-elevated p-3 rounded-lg">
                <p className="text-text-secondary text-xs uppercase mb-1">Shift</p>
                <span className={SHIFT_BADGE[selectedSeat.shift ?? ''] ?? 'mgr-badge bg-bg-elevated'}>
                  {selectedSeat.shift}
                </span>
              </div>
              <div className="ss-detail-cell bg-bg-elevated p-3 rounded-lg">
                <p className="text-text-secondary text-xs uppercase mb-1">Expires</p>
                <p className={`font-semibold ${selectedSeat.status === 'expiring' ? 'text-danger' : 'text-text-primary'}`}>
                  {selectedSeat.expiry}
                </p>
              </div>
            </div>
            <div className="ss-modal-footer flex gap-3 mt-6">
              <button className="mgr-btn-ghost flex-1" onClick={onClose}>Close</button>
              <button className="mgr-btn-primary flex-1">View Full Profile</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

