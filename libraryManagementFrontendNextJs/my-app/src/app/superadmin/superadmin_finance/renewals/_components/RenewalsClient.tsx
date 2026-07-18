// RESPONSIBILITY: Renders the RenewalsClient component.
'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ICellRendererParams } from 'ag-grid-community';
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import { RefreshCw, Send } from 'lucide-react';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_finance/superadmin_finance_shared_components/superadmin_gridTheme';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useRenewalsClient, PLANS, FILTERS } from './useRenewalsClient';

ModuleRegistry.registerModules([AllCommunityModule]);

export function RenewalsClient() {
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
  } = useRenewalsClient();

  const colDefs = [
    { field: 'studentName', headerName: 'Student', flex: 1, minWidth: 150, cellRenderer: (p: ICellRendererParams) => <span className="font-medium text-[14px] text-text-primary">{p.value}</span> },
    { field: 'smartId', headerName: 'Smart ID', width: 120, cellRenderer: (p: ICellRendererParams) => <span className="font-mono text-[12px] text-text-secondary">{p.value}</span> },
    { field: 'shift', headerName: 'Shift', width: 110, cellRenderer: (p: ICellRendererParams) => <div className="h-full flex items-center"><span className="bg-input text-text-primary px-2 py-0.5 rounded-[var(--radius-full)] text-[11px] font-bold uppercase">{p.value}</span></div> },
    { field: 'plan', headerName: 'Plan', width: 110, cellRenderer: (p: ICellRendererParams) => <span className="text-[13px] text-text-primary">{p.value}</span> },
    { field: 'expiryDate', headerName: 'Expiry Date', width: 120, cellRenderer: (p: ICellRendererParams) => <span className="text-[12px] text-text-secondary">{p.value}</span> },
    { 
      field: 'daysLeft', 
      headerName: 'Days Left', 
      width: 120,
      cellRenderer: (p: ICellRendererParams) => (
        <span className={p.value < 0 ? 'text-danger font-semibold text-[13px]' : p.value <= 7 ? 'text-warning font-semibold text-[13px]' : 'text-text-primary text-[13px]'}>
          {p.value < 0 ? `${Math.abs(p.value)} days ago` : `${p.value} days`}
        </span>
      )
    },
    { field: 'lastPaymentDate', headerName: 'Last Payment', width: 130, cellRenderer: (p: ICellRendererParams) => <span className="text-[12px] text-text-secondary">{p.value}</span> },
    { 
      field: 'due', 
      headerName: 'Due ₹', 
      width: 110,
      cellStyle: { textAlign: 'right', fontWeight: 600 },
      cellRenderer: (p: ICellRendererParams) => (
        <span className={p.value > 0 ? 'text-danger text-[13px]' : 'text-text-primary text-[13px]'}>
          {formatCurrency(p.value)}
        </span>
      )
    },
    {
      headerName: 'Actions',
      width: 180,
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => (
        <div className="flex items-center gap-2 h-full">
          <button
            className="flex items-center bg-info/10 text-info border border-info/20 px-2 py-1 rounded-[var(--radius-md)] text-[11px] font-bold hover:bg-info hover:text-info-foreground transition-colors cursor-pointer"
            onClick={() => openRenew(params.data)}
            title="Renew Now"
          >
            <RefreshCw size={12} className="mr-1" /> Renew
          </button>
          <button
            className="flex items-center bg-input text-text-primary border border-border px-2 py-1 rounded-[var(--radius-md)] text-[11px] font-bold hover:bg-primary/5 transition-colors cursor-pointer"
            onClick={() => handleRemind(params.data.studentName)}
            title="Send WhatsApp Reminder"
          >
            <Send size={12} className="mr-1" /> Remind
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-text-primary">Renewals</h1>
          <p className="text-[12px] text-text-secondary">Subscriptions needing renewal attention.</p>
        </div>
        <button className="flex items-center bg-input text-text-primary border border-border px-3 py-1.5 rounded-[var(--radius-md)] text-[12px] font-bold hover:bg-primary/5 transition-colors cursor-pointer" onClick={handleRemindAll}>
          <Send size={14} className="mr-1" /> 📱 Remind All
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {FILTERS.map(( f: any ) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-[var(--radius-md)] text-[12px] font-bold transition-all border ${filter === f.value ? 'bg-primary/10 text-primary border-primary ring-2 ring-primary/30' : 'bg-transparent text-text-secondary border-border hover:bg-input'} cursor-pointer`}
          >
            {f.emoji} {f.label}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-[var(--radius-lg)] border border-border p-4">
        <div className="h-96 w-full" style={{ '--ag-border-color': 'var(--color-border)', '--ag-background-color': 'var(--color-card)', '--ag-header-background-color': 'var(--color-input)', '--ag-row-hover-color': 'var(--color-page)' } as React.CSSProperties}>
          <AgGridReact
            theme={superadmin_gridTheme}
            rowData={visible}
            columnDefs={colDefs as any}
            rowHeight={60}
            headerHeight={48}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true
            }}
          />
        </div>
      </div>

      {renewDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setRenewDialog(null)} />
          <div className="relative w-full max-w-md bg-card rounded-[var(--radius-xl)] shadow-2xl overflow-hidden p-7 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-[18px] font-bold text-text-primary mb-4">Renew Subscription — {renewDialog.name}</h2>
            <button className="absolute top-4 right-4 text-text-secondary hover:text-danger transition-colors cursor-pointer" onClick={() => setRenewDialog(null)}>✕</button>
            <div className="space-y-4">
              <div>
                <label className="text-[12px] font-bold text-text-secondary block mb-1">Plan</label>
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
                <label className="text-[12px] font-bold text-text-secondary block mb-1">Amount</label>
                <input type="number" className="w-full bg-input border border-border rounded-[var(--radius-md)] py-2.5 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" value={renewAmount} onChange={( e: any ) => setRenewAmount(e.target.value)} />
              </div>
              <div>
                <label className="text-[12px] font-bold text-text-secondary block mb-1">Payment Mode</label>
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
                  <label className="text-[12px] font-bold text-text-secondary block mb-1">Transaction ID</label>
                  <input className="w-full bg-input border border-border rounded-[var(--radius-md)] py-2.5 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" value={renewTxnId} onChange={( e: any ) => setRenewTxnId(e.target.value)} placeholder="Enter transaction reference" />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 bg-transparent border border-border text-text-primary text-[14px] font-bold rounded-[var(--radius-md)] hover:bg-input transition-colors duration-200 cursor-pointer" onClick={() => setRenewDialog(null)}>Cancel</button>
              <button
                className="px-4 py-2 bg-success text-success-foreground text-[14px] font-bold rounded-[var(--radius-md)] hover:brightness-95 transition-all duration-200 disabled:opacity-50 cursor-pointer"
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
