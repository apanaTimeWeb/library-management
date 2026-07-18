'use client';
// RESPONSIBILITY: Renders the SeatHistoryClient component.
import { useMemo, useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { SUPERADMIN_SEATS_MOCK_HISTORY } from '@superadmin/superadmin_seats_shifts_lockers/superadmin_seats_shifts_lockers_utils/SuperadminSeatsMockData';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import type { SuperadminSeatsHistoryEntry } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_types/SuperadminSeatsShiftsLockersTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const REASON_CLASS: Record<string, string> = {
  Admission: 'ss-badge ss-badge--success',
  'Shift Change': 'ss-badge ss-badge--info',
  'Seat Change': 'ss-badge ss-badge--warning',
};

export function SeatHistoryClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [seatFilter, setSeatFilter] = useState('All Seats');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return (SUPERADMIN_SEATS_MOCK_HISTORY as SuperadminSeatsHistoryEntry[]).filter(h => {
      const matchSeat = seatFilter === 'All Seats' || h.seatNo === seatFilter;
      const matchSearch = !search ||
        h.studentName.toLowerCase().includes(search.toLowerCase()) ||
        h.smartId.toLowerCase().includes(search.toLowerCase());
        
      const termMatch = !searchTerm || 
        h.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.smartId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.seatNo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchFrom = !dateFrom || h.occupiedFrom >= dateFrom;
      const matchTo = !dateTo || h.occupiedTill <= dateTo;
      return matchSeat && matchSearch && termMatch && matchFrom && matchTo;
    });
  }, [seatFilter, search, searchTerm, dateFrom, dateTo]);

  useMemo(() => {
    setCurrentPage(1);
  }, [seatFilter, search, searchTerm, dateFrom, dateTo]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedHistory = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="ss-page">

      <div className="ss-page-header">
        <div>
          <h1 className="ss-page-title">Seat History</h1>
          <p className="ss-page-subtitle">Complete occupancy history for every seat</p>
        </div>
      </div>

      <div className="ss-filter-bar flex-wrap">
        <div className="min-w-48">
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
        <div className="flex flex-col gap-4 w-full bg-bg-card border border-border rounded-lg overflow-hidden mt-4">
          <div className="p-4 flex flex-col gap-4">
            <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
            
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-bg-page/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">SEAT #</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">STUDENT</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">SMART ID</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">SHIFT</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">FROM</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">TILL</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">DURATION</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">REASON</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedHistory.length > 0 ? (
                    paginatedHistory.map((h, index) => (
                      <TableRow 
                        key={index}
                        className="hover:bg-bg-page/50 transition-colors"
                      >
                        <TableCell className="ss-table__seat-no">
                          {h.seatNo}
                        </TableCell>
                        <TableCell className="ss-cell-name">
                          {h.studentName}
                        </TableCell>
                        <TableCell className="ss-cell-secondary">
                          {h.smartId}
                        </TableCell>
                        <TableCell className="ss-cell-secondary">
                          {h.shift}
                        </TableCell>
                        <TableCell className="ss-cell-secondary">
                          {h.occupiedFrom}
                        </TableCell>
                        <TableCell className="ss-cell-secondary">
                          {h.occupiedTill}
                        </TableCell>
                        <TableCell className="ss-cell-secondary">
                          {h.duration}
                        </TableCell>
                        <TableCell>
                          <span className={REASON_CLASS[h.reason] ?? 'ss-badge ss-badge--inactive'}>{h.reason}</span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center text-text-secondary">
                        No seat history matches your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-border flex items-center justify-between bg-bg-page/30">
            <span className="text-sm font-semibold text-text-secondary">
              Showing {paginatedHistory.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} records
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-semibold text-text-primary">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
