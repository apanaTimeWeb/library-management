'use client';
// RESPONSIBILITY: Renders the SuperadminSubscriptionsGrid component.
import React, { useState, useMemo } from 'react';
import { CheckCircle, Circle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import type { SuperadminSubscription, SuperadminSubscriptionsGridProps } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_types/SuperadminSubscriptionsTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const FILTERS = ['All', 'Paid', 'Due Soon', 'Overdue'];

export function SuperadminSubscriptionsGrid({ subs, filteredSubs, filter, setFilter, onRowClick }: SuperadminSubscriptionsGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Re-apply the search term locally if needed, since we lost ag-grid's quick filter.
  const searchedSubs = useMemo(() => {
    if (!searchTerm) return filteredSubs;
    const lowerSearch = searchTerm.toLowerCase();
    return filteredSubs.filter(s => 
      s.tenant?.toLowerCase().includes(lowerSearch) ||
      s.plan?.toLowerCase().includes(lowerSearch) ||
      s.status?.toLowerCase().includes(lowerSearch)
    );
  }, [filteredSubs, searchTerm]);

  // Reset to page 1 when search or filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const totalPages = Math.ceil(searchedSubs.length / pageSize);
  const paginatedSubs = searchedSubs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col">
      <div className="p-4 border-b border-border bg-page/30 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 bg-bg-input border border-border rounded-md p-1">
          {FILTERS.map((f: string) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-bold rounded-sm transition-all ${
                filter === f 
                  ? 'bg-bg-card text-primary shadow-sm' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-card/50'
              }`}>
              {f}
            </button>
          ))}
        </div>
        <span className="text-xs font-semibold text-text-disabled uppercase tracking-wider">{searchedSubs.length} records</span>
      </div>
      <div className="flex flex-col gap-4 w-full p-4">
        <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
        
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-page/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Tenant</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Plan</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Cycle & MRR</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Next Invoice</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSubs.length > 0 ? (
                paginatedSubs.map((sub, index) => (
                  <TableRow 
                    key={index}
                    onClick={() => onRowClick(sub)}
                    className="cursor-pointer hover:bg-page/50 transition-colors"
                  >
                    <TableCell className="font-extrabold text-text-primary">
                      {sub.tenant}
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-text-secondary">
                      {sub.plan}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col justify-center">
                        <p className="text-sm font-bold text-primary">₹{sub.mrr?.toLocaleString()}</p>
                        <p className="text-xs font-semibold text-text-disabled uppercase tracking-wider">{sub.cycle}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-text-secondary">
                      {sub.nextInvoice}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {sub.status === 'Paid'     && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-success-bg text-success"><CheckCircle size={10} className="mr-1"/> Paid</span>}
                        {sub.status === 'Due Soon' && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-info-bg text-info"><Circle size={10} className="mr-1"/> Due Soon</span>}
                        {sub.status === 'Overdue'  && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-danger-bg text-danger"><AlertCircle size={10} className="mr-1"/> Overdue</span>}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-text-secondary">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Pagination Footer */}
      <div className="p-4 border-t border-border flex items-center justify-between bg-page/30">
        <span className="text-sm font-semibold text-text-secondary">
          Showing {paginatedSubs.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedSubs.length)} of {searchedSubs.length} subscriptions
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
  );
}

