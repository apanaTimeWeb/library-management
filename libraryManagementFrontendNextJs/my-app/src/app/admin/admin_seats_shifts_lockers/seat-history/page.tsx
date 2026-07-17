'use client';
// RESPONSIBILITY: Renders the historical logs of seat occupations and shift changes.
// DATA FLOW: Next.js Router -> Page -> Components

import { useMemo, useState } from 'react';
import { ChevronDown, Download, Search } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { gridTheme } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_shifts_lockers_components/AdminSeatsShiftsLockersgridTheme/AdminSeatsShiftsLockersgridTheme';
import { AdminGridCell } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { ADMIN_SEATS_MOCK_HISTORY } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_data/AdminSeatsMockData';

ModuleRegistry.registerModules([AllCommunityModule]);

interface SeatHistoryEntry {
  seatNo: string;
  studentName: string;
  smartId: string;
  shift: string;
  occupiedFrom: string;
  occupiedTill: string;
  duration: string;
  reason: 'Admission' | 'Shift Change' | 'Seat Change';
}

const REASON_CLASS: Record<string, string> = {
  Admission: 'ss-badge ss-badge--success',
  'Shift Change': 'ss-badge ss-badge--info',
  'Seat Change': 'ss-badge ss-badge--warning',
};

function StudentCell({ data }: { data: SeatHistoryEntry }) {
  return <span className="ss-cell-name">{data.studentName}</span>;
}

function ReasonCell({ value }: { value: string }) {
  return <span className={REASON_CLASS[value] ?? 'ss-badge ss-badge--inactive'}>{value}</span>;
}

export default function SeatHistoryPage() {
  const [seatFilter, setSeatFilter] = useState('All Seats');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filtered = (ADMIN_SEATS_MOCK_HISTORY as SeatHistoryEntry[]).filter(h => {
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
    { field: 'reason', headerName: 'REASON', flex: 1.2, cellRenderer: ReasonCell },
  ], []);

  return (
    <>

      <div className="ss-page">
        <div className="ss-page-header">
          <div>
            <h1 className="ss-page-title">Seat History</h1>
            <p className="ss-page-subtitle">Historical logs of seat allocations and changes</p>
          </div>
          <button className="ss-btn-ghost ss-btn-start" onClick={() => alert('Exporting...')}>
            <Download size={15} />Export
          </button>
        </div>

        <div className="ss-filter-bar">
          <div className="ss-filter-bar__input-wrap">
            <Search size={16} className="ss-input-icon" />
            <input type="text" className="ss-input" placeholder="Search student or ID..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="ss-filter-bar__select-wrap">
            <select className="ss-select" value={seatFilter} onChange={e => setSeatFilter(e.target.value)}>
              <option>All Seats</option>
              <option>S-12</option>
              <option>S-45</option>
            </select>
            <ChevronDown size={14} className="ss-select-icon" />
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
            <p className="ss-empty-state__icon">???</p>
            <p className="ss-empty-state__title">No history found.</p>
          </div>
        ) : (
          <div className="ss-table-wrapper ss-grid-h-400">
            <AgGridReact theme={gridTheme} rowData={filtered} columnDefs={colDefs as never} rowHeight={52} headerHeight={40} suppressMovableColumns suppressCellFocus defaultColDef={{ resizable: false, sortable: true }} />
          </div>
        )}
      </div>
    </>
  );
}
