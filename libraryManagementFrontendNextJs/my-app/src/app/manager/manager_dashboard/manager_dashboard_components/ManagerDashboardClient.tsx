'use client';

import { useState } from 'react';
import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { gridTheme } from '@/app/manager/manager_reusable/gridTheme';
import { useDashboardData } from '@/app/manager/manager_dashboard/manager_dashboard_hooks/useDashboardData';
import { ManagerDashboardKpiGrid } from '@/app/manager/manager_dashboard/manager_dashboard_components/ManagerDashboardKpiGrid';
import { ManagerDashboardSeatMatrix } from '@/app/manager/manager_dashboard/manager_dashboard_components/ManagerDashboardSeatMatrix';
import { STATUS_CLASS, QUICK_LINKS } from '@/app/manager/manager_dashboard/manager_dashboard_constants';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
import type { CellRendererProps } from '@/app/manager/manager_dashboard/manager_dashboard_types';

ModuleRegistry.registerModules([AllCommunityModule]);

// RESPONSIBILITY: Main Client view for the Manager Dashboard. Glues data and components together.

function SmartIdCell({ value }: CellRendererProps) {
  return <span className="font-mono text-primary font-semibold tracking-tight text-xs bg-primary-subtle px-1.5 py-0.5 rounded">{value}</span>;
}
function ShiftCell({ value }: CellRendererProps) {
  return <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-info-bg text-info">{value}</span>;
}
function StatusCell({ value }: CellRendererProps) {
  const cls = STATUS_CLASS[value] ?? 'bg-info-bg text-info';
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{value}</span>;
}
function PhoneCell({ value }: CellRendererProps) {
  return <span className="text-text-secondary">{value}</span>;
}

export function ManagerDashboardClient() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, status, error } = useDashboardData();

  const admissionCols: ColDef[] = useMemo(() => [
    { field: 'name', headerName: 'NAME', flex: 2, sortable: true },
    { field: 'smartId', headerName: 'SMART ID', flex: 1, sortable: true, cellRenderer: SmartIdCell },
    { field: 'shift', headerName: 'SHIFT', flex: 1, sortable: true, cellRenderer: ShiftCell },
  ], []);

  const enquiryCols: ColDef[] = useMemo(() => [
    { field: 'name', headerName: 'NAME', flex: 2, sortable: true },
    { field: 'phone', headerName: 'PHONE', flex: 1, cellRenderer: PhoneCell },
    { field: 'status', headerName: 'STATUS', flex: 1, sortable: true, cellRenderer: StatusCell },
  ], []);

  if (status === 'loading') return <div className="p-8 animate-pulse text-text-secondary">Loading dashboard...</div>;
  if (status === 'error') return <div className="p-8 text-danger">Failed to load: {error}</div>;
  if (!data) return null;

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Manager › Dashboard</p>
          <h1 className="text-2xl font-bold text-text-primary">Manager Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1.5">Good morning, Manager — aaj ka quick overview</p>
        </div>
        <div className="flex items-center">
          <Link href={MANAGER_ROUTES.STUDENT_REPORTS} className="bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
            <TrendingUp size={14} /> View Reports
          </Link>
        </div>
      </div>

      <ManagerDashboardKpiGrid kpiData={data.kpiData} />

      {/* Row 2 — Seat Matrix + Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <ManagerDashboardSeatMatrix seatData={data.seatData} />

        <div className="bg-bg-card rounded-xl border border-border p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">My Action Items</h2>
          </div>
          <div className="flex-1">
            {data.actionItems?.map((item) => (
              <div key={item.title} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <span className="text-sm font-medium text-text-secondary flex items-center">{item.title}</span>
                <div className="flex items-center gap-3">
                  <span className={item.countClass}>{item.count}</span>
                  {item.showRenew ? (
                    <Link href={item.href} className="bg-primary text-white rounded-lg py-1.5 px-3 text-xs font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">Renew</Link>
                  ) : (
                    <Link href={item.href} className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-1">View</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 — Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-bg-card rounded-xl border border-border p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Recent New Admissions</h2>
            <Link href={MANAGER_ROUTES.STUDENTS} className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-1">View all</Link>
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

          <div className="h-72 w-full">
            <AgGridReact
              quickFilterText={searchTerm}
              pagination={true}
              paginationPageSize={10}
              theme={gridTheme}
              rowData={data.recentAdmissions || []}
              columnDefs={admissionCols}
              rowHeight={48}
              headerHeight={38}
              suppressMovableColumns
              suppressCellFocus
              defaultColDef={{ resizable: false }}
            />
          </div>
        </div>

        <div className="bg-bg-card rounded-xl border border-border p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Recent Enquiries</h2>
            <Link href={MANAGER_ROUTES.CRM_ENQUIRIES} className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-1">View all</Link>
          </div>
          <div className="h-72 w-full">
            <AgGridReact
              quickFilterText={searchTerm}
              pagination={true}
              paginationPageSize={10}
              theme={gridTheme}
              rowData={data.recentEnquiries || []}
              columnDefs={enquiryCols}
              rowHeight={48}
              headerHeight={38}
              suppressMovableColumns
              suppressCellFocus
              defaultColDef={{ resizable: false }}
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-bg-card rounded-xl border border-border p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-text-primary">Quick Links</h2>
        </div>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUICK_LINKS.map((link) => (
              <Link key={link.title} href={link.href} className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-1">
                <ChevronRight size={14} />{link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
