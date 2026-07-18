'use client';
// RESPONSIBILITY: Renders the ManagerStudentsReferralsClient.tsx component.
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { Award, Search, Filter, IndianRupee } from 'lucide-react';
import { gridTheme } from '@/app/manager/manager_reusable/gridTheme';
import { ReferralData } from '@/app/manager/manager_students/manager_students_types';

ModuleRegistry.registerModules([AllCommunityModule]);

const REFERRALS_DATA: ReferralData[] = [
  { id: 'REF-001', referrer: 'Arjun Das',    referred: 'Riya Sen',    date: '2026-05-15', status: 'Claimed',  bonus: '₹500', method: 'Fee Discount' },
  { id: 'REF-002', referrer: 'Priya Verma',  referred: 'Kunal Singh', date: '2026-06-02', status: 'Pending',  bonus: '₹500', method: 'Cash'         },
  { id: 'REF-003', referrer: 'Rohan Sharma', referred: 'Aditi Jain',  date: '2026-06-03', status: 'Approved', bonus: '₹500', method: 'Fee Discount' },
];

export function ManagerStudentsReferralsClient() {
  const [searchTerm, setSearchTerm] = useState('');

  const [rowData] = useState<ReferralData[]>(REFERRALS_DATA);

  const colDefs: ColDef<ReferralData>[] = [
    { field: 'id',       headerName: 'Ref ID',                    width: 110 },
    { field: 'referrer', headerName: 'Referrer (Existing)',        flex: 1,
      cellRenderer: (p: { value: string; data?: ReferralData }) => <span className="text-[13px] font-semibold text-text-secondary">{p.value}</span> },
    { field: 'referred', headerName: 'Referred Student',           flex: 1,
      cellRenderer: (p: { value: string; data?: ReferralData }) => <span className="text-[13.5px] font-semibold text-text-primary">{p.value}</span> },
    { field: 'date',     headerName: 'Date',                       width: 130 },
    { field: 'bonus',    headerName: 'Bonus',                      width: 110, cellStyle: { fontWeight: 600 } },
    { field: 'method',   headerName: 'Payout Method',              width: 150 },
    { field: 'status',   headerName: 'Status',                     width: 130,
      cellRenderer: (p: { value: string; data?: ReferralData }) => {
        const cls = p.value === 'Claimed' ? 'bg-success-bg text-success' : p.value === 'Approved' ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold--info' : 'bg-warning-bg text-warning';
        return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}>{p.value}</span>;
      }
    },
    { headerName: 'Actions', width: 120, sortable: false,
      cellRenderer: (p: { value: string; data?: ReferralData }) => p.data?.status !== 'Claimed'
        ? <div className="flex gap-2 items-center h-full"><button className="bg-transparent border border-border text-text-primary rounded-lg h-8 px-3 text-xs font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2">Process</button></div>
        : null
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <div className="p-6 min-h-screen-header">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-2">Students › Referrals</div>
          <h1 className="text-[22px] font-bold text-text-primary">Referral Program</h1>
          <p className="p-6 min-h-screen-subtitle">Track and manage student referral bonuses.</p>
        </div>
        <div className="p-6 min-h-screen-actions">
          <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
            <Award size={16} /> New Referral
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Referrals',        value: '45',       icon: Award,        iconClass: 'bg-primary/10 text-primary' },
          { label: 'Pending Approvals',       value: '8',        icon: Search,       iconClass: 'bg-warning/10 text-warning' },
          { label: 'Total Bonus Distributed', value: '₹18,500', icon: IndianRupee,  iconClass: 'bg-success/10 text-success' },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${k.iconClass}`}><Icon size={18} /></div>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-text-secondary mb-1">{k.label}</p>
                <p className="text-2xl font-bold text-text-primary tracking-tight">{k.value}</p>
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
          <button className="bg-transparent border border-border text-text-primary rounded-lg h-8 px-3 text-xs font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2"><Filter size={14} /> Filters</button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <input 
            type="text" 
            placeholder="Search in table..." 
            className="px-3 py-2 border border-border rounded-md text-sm bg-bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
<div className="w-full overflow-hidden flex flex-col" style={{ height: 400 }}>
          <AgGridReact
              quickFilterText={searchTerm}
              pagination={true}
              paginationPageSize={10}
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
