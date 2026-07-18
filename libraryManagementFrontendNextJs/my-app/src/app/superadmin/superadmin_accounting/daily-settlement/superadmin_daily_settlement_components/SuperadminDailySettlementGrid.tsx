'use client';
// RESPONSIBILITY: Renders the SuperadminDailySettlementGrid component.
import React, { useState, useMemo } from 'react';
import { CheckCircle, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';
import type { SuperadminDailySettlementEntry } from '@/app/superadmin/superadmin_accounting/daily-settlement/superadmin_daily_settlement_types/SuperadminDailySettlementTypes';
import type { SuperadminDailySettlementGridProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export function SuperadminDailySettlementGrid({ entries, onSettle }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const searchedEntries = useMemo(() => {
    if (!searchTerm) return entries;
    const lowerSearch = searchTerm.toLowerCase();
    return entries.filter(e => 
      e.shift?.toLowerCase().includes(lowerSearch) ||
      e.settledBy?.toLowerCase().includes(lowerSearch) ||
      e.status?.toLowerCase().includes(lowerSearch)
    );
  }, [entries, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(searchedEntries.length / pageSize);
  const paginatedEntries = searchedEntries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col">
      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ClipboardList size={48} className="text-text-disabled mb-4 opacity-50" />
          <p className="text-lg font-bold text-text-primary mb-1">No settlement entries for this date.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 w-full p-4">
            <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
            
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-bg-page/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Shift</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase text-right">Opening ₹</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase text-right">Cash ₹</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase text-right">UPI ₹</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase text-right">Expenses ₹</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase text-right">Closing ₹</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Settled By</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase text-right w-32">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEntries.length > 0 ? (
                    paginatedEntries.map((entry, index) => (
                      <TableRow 
                        key={index}
                        className="hover:bg-bg-page/50 transition-colors"
                      >
                        <TableCell className="font-extrabold text-text-primary">
                          {entry.shift}
                        </TableCell>
                        <TableCell className="text-right text-sm font-medium text-text-disabled">
                          ₹{entry.openingBalance.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-sm font-bold text-success">
                          ₹{entry.cashCollected.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-sm font-bold text-info">
                          ₹{entry.upiCollected.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-sm font-bold text-danger">
                          ₹{entry.expenses.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-base font-extrabold text-text-primary tracking-tight">
                          ₹{entry.closingBalance.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-xs font-bold text-text-secondary">
                          {entry.settledBy}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${entry.status === 'settled' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'}`}>
                            {entry.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {entry.status === 'pending' && (
                            <div className="flex justify-end items-center">
                              <button 
                                className="flex items-center gap-1.5 px-3 py-1 bg-success-bg text-success hover:bg-success hover:text-white text-xs font-bold rounded-sm transition-colors duration-200 cursor-pointer" 
                                onClick={() => onSettle(entry.id)}
                              >
                                <CheckCircle size={14} /> Settle
                              </button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center text-text-secondary">
                        No entries match your search.
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
              Showing {paginatedEntries.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedEntries.length)} of {searchedEntries.length} entries
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
        </>
      )}
    </div>
  );
}
