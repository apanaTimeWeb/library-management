'use client';

import { useState } from 'react';
import { useDashboardData } from '@/app/manager/manager_dashboard/manager_dashboard_hooks/useDashboardData';
import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { STATUS_CLASS, QUICK_LINKS } from '@/app/manager/manager_dashboard/manager_dashboard_constants';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
import type { CellRendererProps } from '@/app/manager/manager_dashboard/manager_dashboard_types';
import { ManagerDashboardKpiGrid } from '@/app/manager/manager_dashboard/manager_dashboard_components/ManagerDashboardKpiGrid';
import { ManagerDashboardSeatMatrix } from '@/app/manager/manager_dashboard/manager_dashboard_components/ManagerDashboardSeatMatrix';
import { TablePagination } from '@/components/ui/table-pagination';

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

  const filteredAdmissions = useMemo(() => {
    return (data?.recentAdmissions || []).filter((item: any) => 
      !searchTerm || 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.smartId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data?.recentAdmissions, searchTerm]);

  const filteredEnquiries = useMemo(() => {
    return (data?.recentEnquiries || []).filter((item: any) => 
      !searchTerm || 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.phone?.includes(searchTerm) || 
      item.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data?.recentEnquiries, searchTerm]);

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

                    <div className="h-72 w-full overflow-y-auto overflow-x-auto bg-bg-card rounded-lg border border-border">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-bg-elevated sticky top-0 z-10">
                <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">NAME</th>
                  <th className="px-4 py-3 font-semibold">SMART ID</th>
                  <th className="px-4 py-3 font-semibold">SHIFT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAdmissions.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-text-secondary">No admissions found</td>
                  </tr>
                ) : (
                  filteredAdmissions.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-bg-page transition-colors cursor-pointer">
                      <td className="px-4 py-3 text-text-primary font-medium">{row.name}</td>
                      <td className="px-4 py-3"><SmartIdCell value={row.smartId} data={row} /></td>
                      <td className="px-4 py-3"><ShiftCell value={row.shift} data={row} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-bg-card rounded-xl border border-border p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Recent Enquiries</h2>
            <Link href={MANAGER_ROUTES.CRM_ENQUIRIES} className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-1">View all</Link>
          </div>
          <div className="h-72 w-full overflow-y-auto overflow-x-auto bg-bg-card rounded-lg border border-border">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-bg-elevated sticky top-0 z-10">
                <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">NAME</th>
                  <th className="px-4 py-3 font-semibold">PHONE</th>
                  <th className="px-4 py-3 font-semibold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-text-secondary">No enquiries found</td>
                  </tr>
                ) : (
                  filteredEnquiries.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-bg-page transition-colors cursor-pointer">
                      <td className="px-4 py-3 text-text-primary font-medium">{row.name}</td>
                      <td className="px-4 py-3"><PhoneCell value={row.phone} data={row} /></td>
                      <td className="px-4 py-3"><StatusCell value={row.status} data={row} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
