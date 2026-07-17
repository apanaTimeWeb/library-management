'use client';

import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { Search, Filter, Mail, Award } from 'lucide-react';
import { gridTheme } from '@/app/manager/manager_reusable/gridTheme';

ModuleRegistry.registerModules([AllCommunityModule]);

const ALUMNI_DATA = [
  { id: 'AL-1001', name: 'Neha Reddy',  phone: '+91 9988776655', leftDate: '2025-12-01', duration: '12 Months', exam: 'UPSC CSE',  currentStatus: 'Selected (IAS)'      },
  { id: 'AL-1002', name: 'Karan Mehra', phone: '+91 8877665544', leftDate: '2026-02-15', duration: '6 Months',  exam: 'SSC CGL',   currentStatus: 'Selected'             },
  { id: 'AL-1003', name: 'Anita Desai', phone: '+91 7766554433', leftDate: '2026-04-10', duration: '8 Months',  exam: 'Bank PO',   currentStatus: 'Preparing from home'  },
];

export function ManagerStudentsAlumniClient() {
  const [rowData] = useState(ALUMNI_DATA);

  const colDefs: ColDef[] = [
    { field: 'id',   headerName: 'ID', width: 100 },
    {
      field: 'name', headerName: 'Alumni Name', flex: 1,
      cellRenderer: (p: { value: string; data?: { phone: string } }) => (
        <div className="flex items-center gap-3 py-2">
          <div className="mgr-avatar-sm">{p.value?.charAt(0)}</div>
          <div>
            <p className="mgr-cell-name">{p.value}</p>
            <p className="mgr-cell-sub">{p.data?.phone}</p>
          </div>
        </div>
      ),
    },
    { field: 'duration',      headerName: 'Studied For',    width: 130 },
    { field: 'exam',          headerName: 'Target Exam',    width: 140 },
    {
      field: 'currentStatus', headerName: 'Current Status', width: 200,
      cellRenderer: (p: { value: string; data?: unknown }) => {
        const isSelected = p.value?.includes('Selected');
        return (
          <span className={isSelected ? 'mgr-text-success' : 'mgr-text-secondary'} style={{ fontWeight: isSelected ? 600 : 400 }}>
            {isSelected && <Award size={14} style={{ display: 'inline', marginRight: 4 }} />}
            {p.value}
          </span>
        );
      },
    },
    { field: 'leftDate', headerName: 'Left On', width: 120 },
    {
      headerName: 'Actions', width: 100, sortable: false,
      cellRenderer: () => (
        <div className="flex gap-2 items-center h-full">
          <button className="w-8 h-8 rounded-lg border border-border text-text-secondary inline-flex items-center justify-center hover:bg-primary-subtle hover:text-primary transition-colors" title="Send Message"><Mail size={14} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <div className="p-6 min-h-screen-header">
        <div>
          <div className="mgr-breadcrumb">Students › Alumni</div>
          <h1 className="text-[22px] font-bold text-text-primary">Alumni Directory</h1>
          <p className="p-6 min-h-screen-subtitle">Students who have successfully completed their journey here.</p>
        </div>
        <div className="p-6 min-h-screen-actions">
          <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2"><Award size={16} /> Success Stories</button>
        </div>
      </div>

      <div className="bg-bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap" style={{ maxWidth: 320 }}>
            <Search size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
            <input type="text" placeholder="Search alumni by name or exam…" className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon" />
          </div>
          <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 mgr-btn-sm"><Filter size={14} /> Filters</button>
        </div>
        <div className="mgr-table-wrapper" style={{ height: 500 }}>
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

