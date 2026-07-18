'use client';
// RESPONSIBILITY: Renders the SeatHistoryClient component.
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_shared_components/superadmin_gridTheme';
import { SUPERADMIN_SEATS_MOCK_HISTORY } from '@superadmin/superadmin_seats_shifts_lockers/superadmin_seats_shifts_lockers_utils/SuperadminSeatsMockData';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import type { SuperadminSeatsHistoryEntry } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_types/SuperadminSeatsShiftsLockersTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

const REASON_CLASS: Record<string, string> = {
  Admission: 'ss-badge ss-badge--success',
  'Shift Change': 'ss-badge ss-badge--info',
  'Seat Change': 'ss-badge ss-badge--warning',
};

function StudentCell({ data }: { data: SuperadminSeatsHistoryEntry }) {
  return <span className="ss-cell-name">{data.studentName}</span>;
}

function ReasonCell({ value }: { value: string }) {
  return <span className={REASON_CLASS[value] ?? 'ss-badge ss-badge--inactive'}>{value}</span>;
}

export function SeatHistoryClient() {
  const [seatFilter, setSeatFilter] = useState('All Seats');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filtered = (SUPERADMIN_SEATS_MOCK_HISTORY as SuperadminSeatsHistoryEntry[]).filter(h => {
    const matchSeat = seatFilter === 'All Seats' || h.seatNo === seatFilter;
    const matchSearch = !search ||
      h.studentName.toLowerCase().includes(search.toLowerCase()) ||
      h.smartId.toLowerCase().includes(search.toLowerCase());
    const matchFrom = !dateFrom || h.occupiedFrom >= dateFrom;
    const matchTo = !dateTo || h.occupiedTill <= dateTo;
    return matchSeat && matchSearch && matchFrom && matchTo;
  });

  const colDefs = useMemo<any[]>(() => [
    { field: 'seatNo', headerName: 'SEAT #', flex: 0.8, cellClass: 'ss-table__seat-no' },
    { field: 'studentName', headerName: 'STUDENT', flex: 1.5, cellRenderer: StudentCell },
    { field: 'smartId', headerName: 'SMART ID', flex: 1, cellClass: 'ss-cell-secondary' },
    { field: 'shift', headerName: 'SHIFT', flex: 1, cellClass: 'ss-cell-secondary' },
    { field: 'occupiedFrom', headerName: 'FROM', flex: 1.3, cellClass: 'ss-cell-secondary' },
    { field: 'occupiedTill', headerName: 'TILL', flex: 1.3, cellClass: 'ss-cell-secondary' },
    { field: 'duration', headerName: 'DURATION', flex: 1, cellClass: 'ss-cell-secondary' },
    { field: 'reason', headerName: 'REASON', flex: 1.3, cellRenderer: ReasonCell },
  ], []);

  return (
    <div className="ss-page">

      <div className="ss-page-header">
        <div>
          <h1 className="ss-page-title">Seat History</h1>
          <p className="ss-page-subtitle">Complete occupancy history for every seat</p>
        </div>
      </div>

      <div className="ss-filter-bar">
        <div className="min-w-[200px]">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Seats', value: 'All Seats' },
              { label: 'S-07', value: 'S-07' },
              { label: 'S-12', value: 'S-12' },
              { label: 'S-31', value: 'S-31' }
            ]}
            value={seatFilter}
            onChange={setSeatFilter}
          />
        </div>
        <div className="ss-filter-bar__input-wrap">
          <Search size={14} className="ss-input-icon" />
          <input type="text" placeholder="Search by student name or ID..." className="ss-input" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="ss-filter-bar__input-wrap">
          <input type="date" className="ss-input ss-input--no-icon" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        </div>
        <div className="ss-filter-bar__input-wrap">
          <input type="date" className="ss-input ss-input--no-icon" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="ss-empty-state">
          <p className="ss-empty-state__icon">📜</p>
          <p className="ss-empty-state__title">No seat history records found.</p>
        </div>
      ) : (
        <div className="ss-table-wrapper ss-grid-h-400">
          <AgGridReact theme={superadmin_gridTheme} rowData={filtered} columnDefs={colDefs as any} rowHeight={52} headerHeight={40} suppressMovableColumns suppressCellFocus defaultColDef={{ resizable: false, sortable: true }} />
        </div>
      )}

    </div>
  );
}
