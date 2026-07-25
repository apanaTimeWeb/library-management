import { UserPlus, User } from 'lucide-react';
import type { SeatData, ManagerSeatsSeatMatrixModalProps } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { SHIFT_BADGE } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';

// RESPONSIBILITY: Renders the seat detail modal popover.

export function ManagerSeatsSeatMatrixModal({ isOpen, onClose, selectedSeat }: ManagerSeatsSeatMatrixModalProps) {
  if (!selectedSeat) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 flex items-center justify-center fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div className="bg-card w-full max-w-md md:max-w-lg rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh] bg-card p-6 rounded-xl shadow-xl w-full max-w-sm border border-border" onClick={e => e.stopPropagation()}>
        {selectedSeat.status === 'free' ? (
          <>
            <div className="flex justify-between items-center w-full mb-4 flex justify-between items-center">
              <span className="px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-success/15 text-success border border-success/20">Free</span>
              <span className="text-lg font-bold text-text-primary bg-card px-3 py-1 rounded-lg border border-border shadow-sm text-lg font-bold">Seat {selectedSeat.id}</span>
            </div>
            <p className="text-text-secondary text-xs text-text-secondary font-medium tracking-wide uppercase mb-6">This seat is available for assignment.</p>
            <div className="flex justify-end gap-3 p-6 border-t border-border bg-bg-elevated/30 flex gap-3">
              <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 flex-1" onClick={onClose}>Close</button>
              <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2 flex-1 flex items-center justify-center gap-2">
                <UserPlus size={15} /> Assign Student
              </button>
            </div>
          </>
        ) : selectedSeat.status === 'maintenance' ? (
          <>
            <div className="flex justify-between items-center w-full mb-4 flex justify-between items-center">
              <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-card text-text-secondary">Maintenance</span>
              <span className="text-lg font-bold text-text-primary bg-card px-3 py-1 rounded-lg border border-border shadow-sm text-lg font-bold">Seat {selectedSeat.id}</span>
            </div>
            <p className="text-text-secondary text-xs text-text-secondary font-medium tracking-wide uppercase mb-6">This seat is under maintenance and unavailable.</p>
            <div className="flex justify-end gap-3 p-6 border-t border-border bg-bg-elevated/30 flex">
              <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 w-full" onClick={onClose}>Close</button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-bg-elevated p-6 -mx-6 -mt-6 mb-6 rounded-t-xl border-b border-border flex flex-col items-center justify-center text-center">
              <div className="flex justify-between items-center w-full mb-4">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${selectedSeat.status === 'expiring' ? 'bg-warning-bg text-warning' : 'bg-danger/10 text-danger'}`}>
                  {selectedSeat.status === 'expiring' ? 'Expiring Soon' : 'Occupied'}
                </span>
                <span className="text-lg font-bold text-text-primary bg-card px-3 py-1 rounded-lg border border-border shadow-sm">Seat {selectedSeat.id}</span>
              </div>
              <div className="flex justify-center my-6 flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mb-3">
                  <User size={32} className="text-text-secondary" />
                </div>
                <h3 className="text-text-primary font-semibold text-lg">{selectedSeat.student}</h3>
                <p className="text-text-secondary text-sm">{selectedSeat.smartId}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-3 bg-bg-elevated rounded-lg border border-border flex flex-col gap-1">
                <p className="text-text-secondary text-xs uppercase mb-1">Shift</p>
                <span className={SHIFT_BADGE[selectedSeat.shift ?? ''] ?? 'rounded-full px-2.5 py-0.5 text-xs font-semibold bg-card'}>
                  {selectedSeat.shift}
                </span>
              </div>
              <div className="p-3 bg-bg-elevated rounded-lg border border-border flex flex-col gap-1">
                <p className="text-text-secondary text-xs uppercase mb-1">Expires</p>
                <p className={`font-semibold ${selectedSeat.status === 'expiring' ? 'text-danger' : 'text-text-primary'}`}>
                  {selectedSeat.expiry}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-border bg-bg-elevated/30 mt-6">
              <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center justify-center gap-2 flex-1" onClick={onClose}>Close</button>
              <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center justify-center gap-2 flex-1">View Full Profile</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


