'use client';
// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers module.
// DATA FLOW: Next.js Router -> Page -> Components

import { useMemo, useState } from 'react';
import { ChevronDown, Download, Eye } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { gridTheme } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_shifts_lockers_components/AdminSeatsShiftsLockersgridTheme/AdminSeatsShiftsLockersgridTheme';
import { AdminGridCell } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { ADMIN_SEATS_MOCK_ALLOCATIONS } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_constants/AdminSeatsConstants';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Allocation {
  studentName: string;
  smartId: string;
  seatNo: string;
  shift: string;
  customSlots: string;
  lockerNo: string;
    return matchShift && matchStatus && matchFrom && matchTo;
  });
  const colDefs = useMemo<any[]>(() => [
    { field: 'studentName', headerName: 'STUDENT', flex: 2, cellRenderer: StudentCell },
    { field: 'seatNo', headerName: 'SEAT #', flex: 0.8, cellClass: 'ss-table__seat-no' },
    { field: 'shift', headerName: 'SHIFT', flex: 1, cellClass: 'ss-cell-secondary' },
    { field: 'customSlots', headerName: 'CUSTOM SLOTS', flex: 1.8, cellClass: 'ss-cell-secondary' },
    { field: 'lockerNo', headerName: 'LOCKER #', flex: 0.8, cellClass: 'ss-cell-secondary' },
    { field: 'validFrom', headerName: 'FROM', flex: 1.3, cellClass: 'ss-cell-secondary' },
    { field: 'validTill', headerName: 'TILL', flex: 1.3, cellClass: 'ss-cell-secondary' },
    { field: 'daysLeft', headerName: 'DAYS LEFT', flex: 1, cellRenderer: DaysLeftCell },
    { field: 'status', headerName: 'STATUS', flex: 1.2, cellRenderer: StatusCell },
    { headerName: 'ACTIONS', flex: 0.8, sortable: false, cellRenderer: ActionsCell },
  ], []);

  return (
    <>

      <div className="ss-page">
        <div className="ss-page-header">
          <div>
            <h1 className="ss-page-title">Allocations</h1>
            <p className="ss-page-subtitle">All active and past seat allocations</p>
          </div>
          <button className="ss-btn-ghost ss-btn-start" onClick={() => toast.success('Exporting...')}>
            <Download size={15} />Export
          </button>
        </div>

        <div className="ss-filter-bar">
          <div className="ss-filter-bar__select-wrap">
            <select className="ss-select" value={shiftFilter} onChange={e => setShiftFilter(e.target.value)}>
              <option>All Shifts</option>
              <option>Morning</option>
              <option>Evening</option>
              <option>Full Day</option>
            </select>
            <ChevronDown size={14} className="ss-select-icon" />
          </div>
          <div className="ss-filter-bar__select-wrap">
            <select className="ss-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option>All Statuses</option>
              <option>Active</option>
              <option>Expired</option>
              <option>Suspended</option>
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
            <p className="ss-empty-state__icon">📋</p>
            <p className="ss-empty-state__title">No allocations found.</p>
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

