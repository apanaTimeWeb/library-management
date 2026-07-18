'use client';
// RESPONSIBILITY: Renders the SuperadminBillingGrid component.
import React, { useState, useMemo } from 'react';
import { Download, FileText, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import type { SuperadminBillingInvoice, SuperadminBillingGridProps as Props } from '@/app/superadmin/superadmin_billing/superadmin_billing_types/SuperadminBillingTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export function SuperadminBillingGrid({ invoices, onRowClick, onExport }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [exported, setExported] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleExport = () => {
    setExported(true);
    onExport();
    setTimeout(() => setExported(false), 2000);
  };

  const searchedInvoices = useMemo(() => {
    if (!searchTerm) return invoices;
    const lowerSearch = searchTerm.toLowerCase();
    return invoices.filter(inv => 
      inv.id?.toLowerCase().includes(lowerSearch) ||
      inv.tenant?.toLowerCase().includes(lowerSearch) ||
      inv.status?.toLowerCase().includes(lowerSearch)
    );
  }, [invoices, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(searchedInvoices.length / pageSize);
  const paginatedInvoices = searchedInvoices.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col">
      <div className="p-4 border-b border-border bg-bg-page/30 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-xs">
          {/* TableToolbar handles the search input, but we can also just use the TableToolbar itself */}
        </div>
        <button 
          className="flex items-center gap-2 bg-transparent border border-border hover:bg-bg-input text-text-primary text-sm font-bold py-2 px-3 rounded-md transition-colors" 
          onClick={handleExport}
        >
          {exported ? <><CheckCircle size={14} className="text-success" /> Exported!</> : <><Download size={14} /> Export CSV</>}
        </button>
      </div>
      <div className="flex flex-col gap-4 w-full p-4">
        <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
        
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-bg-page/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Invoice ID</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Tenant</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Date & Method</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Amount</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInvoices.length > 0 ? (
                paginatedInvoices.map((inv, index) => (
                  <TableRow 
                    key={index}
                    onClick={() => onRowClick(inv)}
                    className="cursor-pointer hover:bg-bg-page/50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2 h-full">
                        <FileText size={14} className="text-primary" />
                        <span className="text-sm font-bold text-text-primary tracking-wide">{inv.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-extrabold text-text-primary">
                      {inv.tenant}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col justify-center h-full">
                        <p className="text-sm font-bold text-text-secondary">{inv.date}</p>
                        <p className="text-xs font-semibold text-text-disabled uppercase tracking-wider">{inv.method}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-base font-extrabold text-text-primary tracking-tight">₹{inv.amount.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center h-full">
                        {inv.status === 'Paid'
                          ? <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-success-bg text-success">✅ Paid</span>
                          : <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-danger-bg text-danger">🔴 Overdue</span>}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-text-secondary">
                    No invoices found.
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
          Showing {paginatedInvoices.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedInvoices.length)} of {searchedInvoices.length} invoices
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
