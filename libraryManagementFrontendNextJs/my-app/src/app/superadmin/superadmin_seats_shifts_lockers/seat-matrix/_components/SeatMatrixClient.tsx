'use client';

// RESPONSIBILITY: Renders interactive real-time library seat matrix showing occupancy, shifts, and maintenance states.
// DATA FLOW: API /seats_shifts_lockers/seat-matrix -> SeatMatrixPage State -> Seat Grid / Detail Drawer

import { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';
import { CalendarDays, UserPlus, User } from 'lucide-react';
import type { SuperadminSeatsSeatData } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_types/SuperadminSeatsShiftsLockersTypes';


const SHIFT_TABS = ['All', 'Morning', 'Evening', 'Full Day'];

const LEGEND_ITEMS = [
  { cls: 'ss-legend-dot--success',     label: 'Free' },
  { cls: 'ss-legend-dot--danger',      label: 'Occupied' },
  { cls: 'ss-legend-dot--warning',     label: 'Expiring ≤7 days' },
  { cls: 'ss-legend-dot--maintenance', label: 'Maintenance' },
];

const SHIFT_BADGE: Record<string, string> = {
  Morning:  'ss-badge ss-badge--primary',
  Evening:  'ss-badge ss-badge--success',
  'Full Day':'ss-badge ss-badge--info',
};

export function SeatMatrixClient() {
  const [activeTab, setActiveTab]       = useState('All');
  const [selectedSeat, setSelectedSeat] = useState<SuperadminSeatsSeatData | null>(null);
  const [date, setDate]                 = useState(() => new Date().toISOString().slice(0, 10));
  const [seatsData, setSeatsData]       = useState<SuperadminSeatsSeatData[]>([]);

  useEffect(() => {
    fetchApi(SUPERADMIN_API_ROUTES.SEATS_SEAT_MATRIX).then(( data: unknown ) => {
      const actualData = Array.isArray(data) ? data : (data as any)?.data;
      if (!Array.isArray(actualData) || actualData.length === 0 || actualData[0]?.id?.startsWith('MOCK-')) {
        const mockSeats: SuperadminSeatsSeatData[] = Array.from({ length: 60 }).map((_, i) => ({
          uuid: `S-${i}`,
          id: String(i + 1).padStart(2, '0'),
          status: (i % 7 === 0) ? 'maintenance' : (i % 3 === 0 ? 'occupied' : (i % 5 === 0 ? 'expiring' : 'free')) as SuperadminSeatsSeatData['status'],
          student: (i % 3 === 0 || i % 5 === 0) ? `Student ${i+1}` : undefined,
          smartId: (i % 3 === 0 || i % 5 === 0) ? `ID-${1000 + i}` : undefined,
          shift: i % 2 === 0 ? 'Morning' : 'Evening',
          expiry: '25/07/2025'
        }));
        setSeatsData(mockSeats);
        return;
      }
      const mapped: SuperadminSeatsSeatData[] = actualData.map(( s: Record<string, unknown> ) => ({
        uuid: String(s.id || ''),
        id: String(s.seatNumber || '').replace('S-', ''),
        status: (s.isActive ? 'free' : 'maintenance') as SuperadminSeatsSeatData['status'],
      }));
      setSeatsData(mapped);
    }).catch(err => logger.error('Failed to load seat matrix', err));
  }, []);

  const visible = activeTab === 'All'
    ? seatsData
    : seatsData.filter(s => s.shift === activeTab || s.status === 'free' || s.status === 'maintenance');

  return (
    <div className="ss-page">

      {/* Filter bar */}
      <div className="ss-matrix-filter-bar">
        <div className="ss-tab-group">
          {SHIFT_TABS.map(( tab ) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`ss-tab-btn ${activeTab === tab ? 'ss-tab-btn--active' : 'ss-tab-btn--inactive'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <label className="ss-date-btn">
          <CalendarDays size={15} className="ss-date-btn__icon" />
          <input
            type="date"
            className="ss-date-input"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </label>
      </div>

      {/* Legend */}
      <div className="ss-legend-card">
        {LEGEND_ITEMS.map(({ cls, label }) => (
          <div key={label} className="ss-legend-item">
            <span className={`ss-legend-dot ${cls}`} />
            <span className="ss-legend-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Full-width Grid Card */}
      <div className="ss-card ss-card--p-lg ss-locker-grid-card">
        <div className="ss-matrix-grid-header">
          <h2 className="ss-section-heading">A-Wing Floor Plan</h2>
          <span className="ss-text-caption">{visible.filter(s => s.status === 'free').length} seats free</span>
        </div>
        <div className="ss-seat-grid">
          {visible.map((seat, index) => (
            <button
              key={seat.uuid || seat.id + '-' + index}
              className={`ss-seat-cell ss-seat-cell--${seat.status}`}
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
      </div>

      {/* Modal replacing the Sidebar */}
      {selectedSeat && (
        <div className="ss-modal-overlay" onClick={() => setSelectedSeat(null)}>
          <div className="ss-modal" onClick={e => e.stopPropagation()}>
            {selectedSeat.status === 'free' ? (
              /* Free seat panel */
              <>
                <div className="ss-occupied-header__row" className="mb-4">
                  <span className="ss-badge ss-badge--success">Free</span>
                  <span className="ss-occupied-header__seat">Seat {selectedSeat.id}</span>
                </div>
                <p className="ss-text-secondary ss-text-caption" className="mb-6">This seat is available for assignment.</p>
                <div className="ss-modal-footer">
                  <button className="ss-btn-ghost" onClick={() => setSelectedSeat(null)}>Close</button>
                  <button className="ss-btn-primary">
                    <UserPlus size={15} /> Assign Student
                  </button>
                </div>
              </>
            ) : selectedSeat.status === 'maintenance' ? (
              /* Maintenance panel */
              <>
                <div className="ss-occupied-header__row" className="mb-4">
                  <span className="ss-badge ss-badge--inactive">Maintenance</span>
                  <span className="ss-occupied-header__seat">Seat {selectedSeat.id}</span>
                </div>
                <p className="ss-text-secondary ss-text-caption" className="mb-6">This seat is under maintenance and unavailable.</p>
                <div className="ss-modal-footer">
                  <button className="ss-btn-ghost" onClick={() => setSelectedSeat(null)}>Close</button>
                </div>
              </>
            ) : (
              /* Occupied / expiring panel */
              <>
                <div className="ss-occupied-header -mx-6 -mt-6 mb-6">
                  <div className="ss-occupied-header__row">
                    <span className={`ss-badge ${selectedSeat.status === 'expiring' ? 'ss-badge--warning' : 'ss-badge--danger'}`}>
                      {selectedSeat.status === 'expiring' ? 'Expiring Soon' : 'Occupied'}
                    </span>
                    <span className="ss-occupied-header__seat">Seat {selectedSeat.id}</span>
                  </div>
                  <div className="ss-occupied-avatar-wrap">
                    <div className="ss-occupied-avatar">
                      <User size={40} className="ss-text-secondary" />
                    </div>
                    <h3 className="ss-occupied-name">{selectedSeat.student}</h3>
                    <p className="ss-occupied-id">{selectedSeat.smartId}</p>
                  </div>
                </div>
                <div className="ss-detail-grid">
                  <div className="ss-detail-cell">
                    <p className="ss-kpi-card__label">Shift</p>
                    <span className={SHIFT_BADGE[selectedSeat.shift ?? ''] ?? 'ss-badge ss-badge--inactive'}>
                      {selectedSeat.shift}
                    </span>
                  </div>
                  <div className="ss-detail-cell">
                    <p className="ss-kpi-card__label">Expires</p>
                    <p className={`ss-detail-cell__value ${selectedSeat.status === 'expiring' ? 'ss-detail-cell__value--danger' : ''}`}>
                      {selectedSeat.expiry}
                    </p>
                  </div>
                </div>
                <div className="ss-modal-footer mt-6">
                  <button className="ss-btn-ghost" onClick={() => setSelectedSeat(null)}>Close</button>
                  <button className="ss-btn-primary">View Full Profile</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
