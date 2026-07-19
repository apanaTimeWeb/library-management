'use client';
import { useState } from 'react';
import { useManagerDashboardData } from '@/app/manager/manager_dashboard/manager_dashboard_hooks/useManagerDashboardData';
import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { STATUS_CLASS, QUICK_LINKS } from '@/app/manager/manager_dashboard/manager_dashboard_constants';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
import type { CellRendererProps, RecentAdmission, RecentEnquiry } from '@/app/manager/manager_dashboard/manager_dashboard_types';
import { ManagerDashboardKpiGrid } from '@/app/manager/manager_dashboard/manager_dashboard_components/ManagerDashboardKpiGrid';
import { ManagerDashboardSeatMatrix } from '@/app/manager/manager_dashboard/manager_dashboard_components/ManagerDashboardSeatMatrix';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

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
  const { data, status, error } = useManagerDashboardData();

  // Create table hooks for admissions and enquiries
  const admissionsTable = useClientTable(data?.recentAdmissions || [], 5);
  const enquiriesTable = useClientTable(data?.recentEnquiries || [], 5);

  if (status === 'loading') return <div className="p-8 animate-pulse text-text-secondary">Loading dashboard...</div>;
  if (status === 'error') return <div className="p-8 text-danger">Failed to load: {error}</div>;
  if (!data) return null;

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Manager › Dashboard</p>
          <h1 className="text-text-primary text-xl font-bold text-text-primary">Manager Dashboard</h1>
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

        <div className="bg-card rounded-xl border border-border p-6 flex flex-col h-full">
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
        <div className="bg-card rounded-xl border border-border p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Recent New Admissions</h2>
            <Link href={MANAGER_ROUTES.STUDENTS} className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-1">View all</Link>
          </div>

          <div className="w-full overflow-y-auto overflow-x-auto bg-card rounded-lg border border-border">
            <TableToolbar search={admissionsTable.searchTerm} onSearch={admissionsTable.setSearchTerm} />
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-card sticky top-0 z-10">
                <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">NAME</th>
                  <th className="px-4 py-3 font-semibold">SMART ID</th>
                  <th className="px-4 py-3 font-semibold">SHIFT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {admissionsTable.paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-text-secondary">No admissions found</td>
                  </tr>
                ) : (
                  admissionsTable.paginatedData.map((row: RecentAdmission & { id?: string; date?: string }) => (
                    <tr key={row.id} className="hover:bg-page transition-colors cursor-pointer">
                    <td className="px-4 py-3 text-text-primary font-medium">{row.name}</td>
                    <td className="px-4 py-3"><SmartIdCell value={row.smartId} /></td>
                    <td className="px-4 py-3"><ShiftCell value={row.shift} /></td>
                    <td className="px-4 py-3 text-text-secondary">{row.date}</td>
                  </tr>))
                )}
              </tbody>
            </table>
            <TablePagination 
              page={admissionsTable.page} limit={admissionsTable.limit} totalItems={admissionsTable.totalItems} 
              onPageChange={admissionsTable.setPage} onLimitChange={admissionsTable.setLimit} 
            />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Recent Enquiries</h2>
            <Link href={MANAGER_ROUTES.CRM_ENQUIRIES} className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-1">View all</Link>
          </div>
          <div className="w-full overflow-y-auto overflow-x-auto bg-card rounded-lg border border-border">
            <TableToolbar search={enquiriesTable.searchTerm} onSearch={enquiriesTable.setSearchTerm} />
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-card sticky top-0 z-10">
                <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">NAME</th>
                  <th className="px-4 py-3 font-semibold">PHONE</th>
                  <th className="px-4 py-3 font-semibold">STATUS</th>
                  <th className="px-4 py-3 font-semibold">DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {enquiriesTable.paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-text-secondary">No enquiries found</td>
                  </tr>
                ) : (
                  enquiriesTable.paginatedData.map((row: RecentEnquiry & { id?: string; date?: string }) => (
                    <tr key={row.id} className="hover:bg-page transition-colors cursor-pointer">
                    <td className="px-4 py-3 text-text-primary font-medium">{row.name}</td>
                    <td className="px-4 py-3"><PhoneCell value={row.phone} /></td>
                    <td className="px-4 py-3"><StatusCell value={row.status} /></td>
                    <td className="px-4 py-3 text-text-secondary whitespace-nowrap">{row.date}</td>
                  </tr>))
                )}
              </tbody>
            </table>
            <TablePagination 
              page={enquiriesTable.page} limit={enquiriesTable.limit} totalItems={enquiriesTable.totalItems} 
              onPageChange={enquiriesTable.setPage} onLimitChange={enquiriesTable.setLimit} 
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-card rounded-xl border border-border p-6 mt-6">
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