'use client';
// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers module.
// DATA FLOW: Next.js Router -> Page -> Components

import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { gridTheme } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_shifts_lockers_components/AdminSeatsShiftsLockersgridTheme/AdminSeatsShiftsLockersgridTheme';
import { AdminGridCell } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { ADMIN_SEATS_MOCK_HISTORY } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_constants/AdminSeatsConstants';

ModuleRegistry.registerModules([AllCommunityModule]);

interface SeatHistoryEntry {
  seatNo: string;
  studentName: string;
  smartId: string;
  shift: string;
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
        <div className="ss-filter-bar__select-wrap">
          <select className="ss-select" value={seatFilter} onChange={e => setSeatFilter(e.target.value)}>
            <option>All Seats</option>
            <option>S-07</option>
            <option>S-12</option>
            <option>S-31</option>
          </select>
          <ChevronDown size={14} className="ss-select-icon" />
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
          <AgGridReact theme={gridTheme} rowData={filtered} columnDefs={colDefs as never} rowHeight={52} headerHeight={40} suppressMovableColumns suppressCellFocus defaultColDef={{ resizable: false, sortable: true }} />
        </div>
      )}

    </div>
  );
}

