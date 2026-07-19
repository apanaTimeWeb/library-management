'use client';
// RESPONSIBILITY: Renders the SuperadminRenewalsClient component.
import React, { useState, useMemo } from 'react';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/SuperadminFormat';
import { RefreshCw, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useSuperadminRenewalsClient, PLANS, FILTERS } from '@/app/superadmin/superadmin_finance/renewals/_components/useSuperadminRenewalsClient';
import type { SuperadminFinanceRenewalsFilterType } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export function SuperadminRenewalsClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    filter, setFilter,
    visible,
    renewDialog, setRenewDialog,
    renewPlanId, setRenewPlanId,
    renewAmount, setRenewAmount,
    renewMode, setRenewMode,
    renewTxnId, setRenewTxnId,
    isRenewing,
    handleRemindAll,
    handleRemind,
    openRenew,
    handleRenew,
  } = useSuperadminRenewalsClient();

  const searchedRenewals = useMemo(() => {
    if (!searchTerm) return visible;
    const lowerSearch = searchTerm.toLowerCase();
    return visible.filter(r => 
      r.studentName?.toLowerCase().includes(lowerSearch) ||
      r.smartId?.toLowerCase().includes(lowerSearch) ||
      r.plan?.toLowerCase().includes(lowerSearch)
    );
  }, [visible, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const totalPages = Math.ceil(searchedRenewals.length / pageSize);
  const paginatedRenewals = searchedRenewals.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Renewals</h1>
          <p className="text-xs text-text-secondary">Subscriptions needing renewal attention.</p>
        </div>
        <button className="flex items-center bg-input text-text-primary border border-border px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary/5 transition-colors cursor-pointer" onClick={handleRemindAll}>
          <Send size={14} className="mr-1" /> 📱 Remind All
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {FILTERS.map(( f: { label: string; value: string; emoji: string } ) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value as SuperadminFinanceRenewalsFilterType)}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${filter === f.value ? 'bg-primary/10 text-primary border-primary ring-2 ring-primary/30' : 'bg-transparent text-text-secondary border-border hover:bg-input'} cursor-pointer`}
          >
            {f.emoji} {f.label}
          </button>
        ))}
      </div>

      <div className="bg-bg-card rounded-lg border border-border overflow-hidden flex flex-col">
        <div className="flex flex-col gap-4 w-full p-4">
          <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
          
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-page/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Student</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Smart ID</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Shift</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Plan</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Expiry Date</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Days Left</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Last Payment</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase text-right">Due ₹</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase w-48">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRenewals.length > 0 ? (
                  paginatedRenewals.map((r, index) => (
                    <TableRow 
                      key={index}
                      className="hover:bg-page/50 transition-colors"
                    >
                      <TableCell className="font-medium text-sm text-text-primary">
                        {r.studentName}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-text-secondary">
                        {r.smartId}
                      </TableCell>
                      <TableCell>
                        <div className="h-full flex items-center">
                          <span className="bg-input text-text-primary px-2 py-0.5 rounded-full text-xs font-bold uppercase">{r.shift}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-text-primary">
                        {r.plan}
                      </TableCell>
                      <TableCell className="text-xs text-text-secondary">
                        {r.expiryDate}
                      </TableCell>
                      <TableCell>
                        <span className={r.daysLeft < 0 ? 'text-danger font-semibold text-sm' : r.daysLeft <= 7 ? 'text-warning font-semibold text-sm' : 'text-text-primary text-sm'}>
                          {r.daysLeft < 0 ? `${Math.abs(r.daysLeft)} days ago` : `${r.daysLeft} days`}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-text-secondary">
                        {r.lastPaymentDate}
                      </TableCell>
                      <TableCell className={`text-right ${r.due > 0 ? 'text-danger text-sm' : 'text-text-primary text-sm'}`}>
                        {formatCurrency(r.due)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 h-full">
                          <button
                            className="flex items-center bg-info/10 text-info border border-info/20 px-2 py-1 rounded-md text-xs font-bold hover:bg-info hover:text-white transition-colors cursor-pointer"
                            onClick={() => openRenew(r)}
                            title="Renew Now"
                          >
                            <RefreshCw size={12} className="mr-1" /> Renew
                          </button>
                          <button
                            className="flex items-center bg-input text-text-primary border border-border px-2 py-1 rounded-md text-xs font-bold hover:bg-primary/5 transition-colors cursor-pointer"
                            onClick={() => handleRemind(r.studentName)}
                            title="Send WhatsApp Reminder"
                          >
                            <Send size={12} className="mr-1" /> Remind
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center text-text-secondary">
                      No renewals found.
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
            Showing {paginatedRenewals.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedRenewals.length)} of {searchedRenewals.length} renewals
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

      {renewDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setRenewDialog(null)} />
          <div className="relative w-full max-w-md bg-bg-card rounded-xl shadow-2xl overflow-hidden p-7 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-lg font-bold text-text-primary mb-4">Renew Subscription — {renewDialog.name}</h2>
            <button className="absolute top-4 right-4 text-text-secondary hover:text-danger transition-colors cursor-pointer" onClick={() => setRenewDialog(null)}>✕</button>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Plan</label>
                <SuperadminSearchableDropdown
                  options={PLANS.map(p => ({ label: `${p.name} — ${formatCurrency(p.price)}`, value: String(p.id) }))}
                  value={renewPlanId}
                  onChange={(id: string) => {
                    setRenewPlanId(id);
                    const selectedPlan = PLANS.find((p) => String(p.id) === id);
                    if (selectedPlan) {
                      setRenewAmount(String(selectedPlan.price));
                    }
                  }}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Amount</label>
                <input type="number" className="w-full bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" value={renewAmount} onChange={( e: React.ChangeEvent<HTMLInputElement> ) => setRenewAmount(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Payment Mode</label>
                <SuperadminSearchableDropdown
                  options={[
                    { label: 'Cash', value: 'cash' },
                    { label: 'UPI', value: 'upi' },
                    { label: 'Card', value: 'card' },
                    { label: 'Bank Transfer', value: 'bank' }
                  ]}
                  value={renewMode}
                  onChange={setRenewMode}
                />
              </div>
              {renewMode !== 'cash' && (
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1">Transaction ID</label>
                  <input className="w-full bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" value={renewTxnId} onChange={( e: React.ChangeEvent<HTMLInputElement> ) => setRenewTxnId(e.target.value)} placeholder="Enter transaction reference" />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 bg-transparent border border-border text-text-primary text-sm font-bold rounded-md hover:bg-input transition-colors duration-200 cursor-pointer" onClick={() => setRenewDialog(null)}>Cancel</button>
              <button
                className="px-4 py-2 bg-success-bg text-success border border-success/20 text-sm font-bold rounded-md hover:brightness-95 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                onClick={handleRenew}
                disabled={isRenewing || !renewAmount}
              >
                {isRenewing ? 'Renewing...' : 'Confirm Renewal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

