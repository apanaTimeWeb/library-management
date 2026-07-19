'use client';
import { CalendarDays } from 'lucide-react';
import { useManagerSeatsSeatMatrix } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_hooks/useManagerSeatsSeatMatrix';
import { SHIFT_TABS, LEGEND_ITEMS, SEAT_MATRIX_STATUS_STYLES } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { ManagerSeatsSeatMatrixModal } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_components/ManagerSeatsSeatMatrixModal';

// RESPONSIBILITY: Main Client view for Seat Matrix. Glues data hook to UI.

export function ManagerSeatsSeatMatrixClient() {
  const {
    status, error, visible, freeCount,
    activeTab, setActiveTab,
    selectedSeat, setSelectedSeat,
    date, setDate
  } = useManagerSeatsSeatMatrix();

  if (status === 'error') return <div className="p-8 text-danger font-medium">Failed to load: {error}</div>;

  return (
    <div className="p-6 min-h-screen">
      {/* Ã¢”â‚¬Ã¢”â‚¬ Filter bar Ã¢”â‚¬Ã¢”â‚¬ */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex bg-card p-1 rounded-lg border border-border">
          {SHIFT_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab ? 'bg-card text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 bg-card border border-border px-3 py-2 rounded-lg cursor-pointer hover:border-primary transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:outline-none">
          <CalendarDays size={15} className="text-text-secondary" />
          <input
            type="date"
            className="bg-transparent border-none outline-none text-sm text-text-primary cursor-pointer w-full"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </label>
      </div>

      {/* Ã¢”â‚¬Ã¢”â‚¬ Legend Ã¢”â‚¬Ã¢”â‚¬ */}
      <div className="flex flex-wrap gap-6 mb-6 p-4 bg-card border border-border rounded-lg shadow-sm">
        {LEGEND_ITEMS.map(({ cls, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${cls === 'w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_8px_rgba(var(--success),0.5)]' ? 'bg-success' : cls === 'w-2.5 h-2.5 rounded-full bg-danger shadow-[0_0_8px_rgba(var(--danger),0.5)]' ? 'bg-danger' : cls === 'w-2.5 h-2.5 rounded-full bg-warning shadow-[0_0_8px_rgba(var(--warning),0.5)]' ? 'bg-warning' : 'bg-text-secondary'}`} />
            <span className="text-sm font-medium text-text-secondary">{label}</span>
          </div>
        ))}
      </div>

      {/* Ã¢”â‚¬Ã¢”â‚¬ Grid Ã¢”â‚¬Ã¢”â‚¬ */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 border-b border-border pb-4 gap-2">
          <h2 className="text-xl font-bold text-text-primary">A-Wing Floor Plan</h2>
          <span className="text-sm text-success font-semibold px-3 py-1 bg-success-bg rounded-full inline-block">{status === 'loading' ? '...' : freeCount} seats free</span>
        </div>
        
        {status === 'loading' ? (
          <div className="flex flex-col items-center justify-center py-24 text-text-secondary gap-4 animate-pulse">
            <div className="w-8 h-8 border-4 border-text-secondary/20 border-t-text-secondary rounded-full animate-spin"></div>
            <p className="font-medium text-sm">Loading seat matrix...</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-3">
            {visible.map((seat, index) => (
              <button
                key={seat.uuid || seat.id + '-' + index}
                className={`h-12 rounded-lg text-sm font-semibold flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-sm ${
                  SEAT_MATRIX_STATUS_STYLES[seat.status] || SEAT_MATRIX_STATUS_STYLES['maintenance']
                }`}
                onClick={() => setSelectedSeat(seat)}
                title={
                  seat.student
                    ? `${seat.student} · ${seat.shift} · Expires ${seat.expiry}`
                    : seat.status === 'maintenance' ? 'Under Maintenance' : 'Available'
                }
              >
                {seat.id}
              </button>
            ))}
          </div>
        )}
      </div>

      <ManagerSeatsSeatMatrixModal isOpen={!!selectedSeat} selectedSeat={selectedSeat || undefined} onClose={() => setSelectedSeat(null)} />
    </div>
  );
}
