'use client';
// RESPONSIBILITY: Renders the SubscriptionsClient component.
import { SUPERADMIN_ROUTES } from '@/app/superadmin/superadmin_url_config';

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import { RefreshCw } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useSubscriptionsClient } from '@/app/superadmin/superadmin_finance/subscriptions/_components/useSubscriptionsClient';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

const STATUS_BADGE: Record<string, string> = {
  active:    'bg-success/10 text-success border border-success/20',
  expired:   'bg-danger/10 text-danger border border-danger/20',
  suspended: 'bg-warning/10 text-warning border border-warning/20',
  cancelled: 'bg-input text-text-primary border border-border',
};

function daysLeftBadgeClass(days: number) {
  if (days < 0) return 'text-danger font-semibold text-[13px]';
  if (days <= 7) return 'text-danger font-semibold text-[13px]';
  if (days <= 15) return 'text-warning font-semibold text-[13px]';
  return 'text-success font-semibold text-[13px]';
}

export function SubscriptionsClient() {
    const table = useClientTable(Array.from({ length: 5 }));
  const router = useRouter();
  const {
    statusFilter, setStatusFilter,
    planFilter, setPlanFilter,
    shiftFilter, setShiftFilter,
    rows,
    isLoading,
  } = useSubscriptionsClient();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-text-primary">Subscriptions</h1>
        <p className="text-[12px] text-text-secondary">Manage all student subscriptions.</p>
      </div>

      <div className="flex gap-2">
        <div className="w-40">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Active', value: 'active' },
              { label: 'Expired', value: 'expired' },
              { label: 'Suspended', value: 'suspended' },
              { label: 'Cancelled', value: 'cancelled' }
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
        <div className="w-40">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Plans', value: 'all' },
              { label: 'Basic Plan', value: 'Basic Plan' },
              { label: 'Premium Plan', value: 'Premium Plan' }
            ]}
            value={planFilter}
            onChange={setPlanFilter}
          />
        </div>
        <div className="w-40">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Shifts', value: 'all' },
              { label: 'Morning', value: 'Morning' },
              { label: 'Evening', value: 'Evening' },
              { label: 'Full Day', value: 'Full Day' }
            ]}
            value={shiftFilter}
            onChange={setShiftFilter}
          />
        </div>
      </div>

      <div className="bg-card rounded-[var(--radius-lg)] border border-border overflow-x-auto">
        <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-primary/5 uppercase text-[12px] font-semibold text-text-secondary border-b border-border">
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Smart ID</th>
              <th className="py-3 px-4">Plan</th>
              <th className="py-3 px-4">Start Date</th>
              <th className="py-3 px-4">End Date</th>
              <th className="py-3 px-4">Days Left</th>
              <th className="text-right py-3 px-4">Base ₹</th>
              <th className="text-right py-3 px-4">Discount ₹</th>
              <th className="text-right py-3 px-4">Total ₹</th>
              <th className="text-right py-3 px-4">Paid ₹</th>
              <th className="text-right py-3 px-4">Due ₹</th>
              <th className="py-3 px-4">Status</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              table.paginatedData.map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {Array.from({ length: 13 }).map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 w-20 bg-skeleton-base rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={13}>
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                    <div className="text-4xl">📋</div>
                    <p className="text-[16px] text-text-secondary">No subscriptions found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map(( s: any ) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => toast.success(`Viewing subscription for ${s.studentName}`)}>
                  <td className="py-3 px-4 font-medium text-[14px] text-text-primary">{s.studentName}</td>
                  <td className="py-3 px-4 font-mono text-[12px] text-text-secondary">{s.smartId}</td>
                  <td className="py-3 px-4 text-[13px] text-text-primary">{s.plan}</td>
                  <td className="py-3 px-4 text-[12px] text-text-secondary">{s.startDate}</td>
                  <td className="py-3 px-4 text-[12px] text-text-secondary">{s.endDate}</td>
                  <td className="py-3 px-4">
                    <span className={daysLeftBadgeClass(s.daysLeft)}>
                      {s.daysLeft < 0 ? `${Math.abs(s.daysLeft)}d ago` : `${s.daysLeft}d`}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-[13px] text-text-primary">{formatCurrency(s.base)}</td>
                  <td className="py-3 px-4 text-right text-[13px] text-success">{formatCurrency(s.discount)}</td>
                  <td className="py-3 px-4 text-right font-semibold text-[13px] text-text-primary">{formatCurrency(s.total)}</td>
                  <td className="py-3 px-4 text-right text-[13px] text-success">{formatCurrency(s.paid)}</td>
                  <td className={`py-3 px-4 text-right font-semibold text-[13px] ${s.due > 0 ? 'text-danger' : 'text-text-primary'}`}>
                    {formatCurrency(s.due)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`${STATUS_BADGE[s.status] || 'bg-input text-text-primary border-border'} px-2 py-0.5 rounded-[var(--radius-full)] text-[11px] font-bold capitalize`}>{s.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="flex items-center bg-info/10 text-info border border-info/20 px-2 py-1 rounded-[var(--radius-md)] text-[11px] font-bold hover:bg-info hover:text-info-foreground transition-colors cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); router.push(`${SUPERADMIN_ROUTES.FINANCE_COLLECT_FEE}?studentId=${s.id}&renew=true`); }}
                      >
                        <RefreshCw size={11} className="mr-1" /> Renew
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
      </div>
    </div>
  );
}
