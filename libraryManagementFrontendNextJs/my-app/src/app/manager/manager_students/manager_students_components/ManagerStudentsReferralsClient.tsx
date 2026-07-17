// RESPONSIBILITY: Renders the ManagerStudentsReferralsClient.tsx component.
'use client';

import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { Award, Search, Filter, IndianRupee } from 'lucide-react';
import { gridTheme } from '@/app/manager/manager_reusable/gridTheme';

ModuleRegistry.registerModules([AllCommunityModule]);

const REFERRALS_DATA = [
  { id: 'REF-001', referrer: 'Arjun Das',    referred: 'Riya Sen',    date: '2026-05-15', status: 'Claimed',  bonus: '₹500', method: 'Fee Discount' },
  { id: 'REF-002', referrer: 'Priya Verma',  referred: 'Kunal Singh', date: '2026-06-02', status: 'Pending',  bonus: '₹500', method: 'Cash'         },
  { id: 'REF-003', referrer: 'Rohan Sharma', referred: 'Aditi Jain',  date: '2026-06-03', status: 'Approved', bonus: '₹500', method: 'Fee Discount' },
];

export function ManagerStudentsReferralsClient() {
  const [rowData] = useState(REFERRALS_DATA);

  const colDefs: ColDef[] = [
    { field: 'id',       headerName: 'Ref ID',                    width: 110 },
    { field: 'referrer', headerName: 'Referrer (Existing)',        flex: 1,
      cellRenderer: (p: { value: string; data?: Record<string, unknown> }) => <span className="mgr-table-id">{p.value}</span> },
    { field: 'referred', headerName: 'Referred Student',           flex: 1,
      cellRenderer: (p: { value: string; data?: Record<string, unknown> }) => <span className="mgr-cell-name">{p.value}</span> },
    { field: 'date',     headerName: 'Date',                       width: 130 },
    { field: 'bonus',    headerName: 'Bonus',                      width: 110, cellStyle: { fontWeight: 600 } },
    { field: 'method',   headerName: 'Payout Method',              width: 150 },
    { field: 'status',   headerName: 'Status',                     width: 130,
      cellRenderer: (p: { value: string; data?: Record<string, unknown> }) => {
        const cls = p.value === 'Claimed' ? 'bg-success-bg text-success' : p.value === 'Approved' ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold--info' : 'bg-warning-bg text-warning';
        return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}>{p.value}</span>;
      }
    },
    { headerName: 'Actions', width: 120, sortable: false,
      cellRenderer: (p: { value: string; data?: Record<string, unknown> }) => p.data?.status !== 'Claimed'
        ? <div className="flex gap-2 items-center h-full"><button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 mgr-btn-sm">Process</button></div>
        : null
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <div className="p-6 min-h-screen-header">
        <div>
          <div className="mgr-breadcrumb">Students › Referrals</div>
          <h1 className="text-[22px] font-bold text-text-primary">Referral Program</h1>
          <p className="p-6 min-h-screen-subtitle">Track and manage student referral bonuses.</p>
        </div>
        <div className="p-6 min-h-screen-actions">
          <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
            <Award size={16} /> New Referral
          </button>
        </div>
      </div>

      <div className="mgr-kpi-grid mgr-section-gap">
        {[
          { label: 'Total Referrals',        value: '45',       icon: Award,        iconClass: 'mgr-kpi-icon--primary' },
          { label: 'Pending Approvals',       value: '8',        icon: Search,       iconClass: 'mgr-kpi-icon--warning' },
          { label: 'Total Bonus Distributed', value: '₹18,500', icon: IndianRupee,  iconClass: 'mgr-kpi-icon--success' },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="mgr-kpi-card">
              <div className="mgr-kpi-top-row">
                <div className={`mgr-kpi-icon ${k.iconClass}`}><Icon size={18} /></div>
              </div>
              <div>
                <p className="mgr-kpi-label">{k.label}</p>
                <p className="mgr-kpi-value">{k.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap" style={{ maxWidth: 320 }}>
            <Search size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
            <input type="text" placeholder="Search by student name…" className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon" />
          </div>
          <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 mgr-btn-sm"><Filter size={14} /> Filters</button>
        </div>
        <div className="mgr-table-wrapper" style={{ height: 400 }}>
          <AgGridReact
            theme={gridTheme}
            rowData={rowData}
            columnDefs={colDefs}
            rowHeight={56}
            headerHeight={48}
            suppressMovableColumns
            suppressCellFocus
            defaultColDef={{ resizable: false }}
          />
        </div>
      </div>
    </div>
  );
}


