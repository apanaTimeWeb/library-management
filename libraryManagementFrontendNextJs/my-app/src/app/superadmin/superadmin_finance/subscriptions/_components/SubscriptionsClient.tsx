// RESPONSIBILITY: Renders the SubscriptionsClient component.
'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import { RefreshCw } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';

import { SUPERADMIN_FINANCE_MOCK_SUBSCRIPTIONS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';

const STATUS_BADGE: Record<string, string> = {
  active:    'fin-badge fin-badge--success',
  expired:   'fin-badge fin-badge--danger',
  suspended: 'fin-badge fin-badge--warning',
  cancelled: 'fin-badge fin-badge--neutral',
};

function daysLeftBadgeClass(days: number) {
  if (days < 0) return 'fin-badge fin-badge--danger';
  if (days <= 7) return 'fin-badge fin-badge--danger';
  if (days <= 15) return 'fin-badge fin-badge--warning';
  return 'fin-badge fin-badge--success';
}

export function SubscriptionsClient() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [rows, setRows] = useState(SUPERADMIN_FINANCE_MOCK_SUBSCRIPTIONS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setRows(
      SUPERADMIN_FINANCE_MOCK_SUBSCRIPTIONS.filter((s) => {
        const st = statusFilter === 'all' || s.status === statusFilter;
        const pl = planFilter === 'all' || s.plan === planFilter;
        const sh = shiftFilter === 'all' || s.shift === shiftFilter;
        return st && pl && sh;
      })
    );
  }, [statusFilter, planFilter, shiftFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fin-page-title">Subscriptions</h1>
        <p className="fin-page-subtitle">Manage all student subscriptions.</p>
      </div>

      <div className="fin-filter-bar flex gap-2">
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

      <div className="fin-card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="fin-table-header-row">
              <th className="text-left py-3 px-4">Student</th>
              <th className="text-left py-3 px-4">Smart ID</th>
              <th className="text-left py-3 px-4">Plan</th>
              <th className="text-left py-3 px-4">Start Date</th>
              <th className="text-left py-3 px-4">End Date</th>
              <th className="text-left py-3 px-4">Days Left</th>
              <th className="text-right py-3 px-4">Base ₹</th>
              <th className="text-right py-3 px-4">Discount ₹</th>
              <th className="text-right py-3 px-4">Total ₹</th>
              <th className="text-right py-3 px-4">Paid ₹</th>
              <th className="text-right py-3 px-4">Due ₹</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="fin-table-row">
                  {Array.from({ length: 13 }).map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="fin-skeleton h-4 w-20" />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={13}>
                  <div className="fin-empty-state">
                    <div className="fin-empty-state__icon">📋</div>
                    <p className="fin-empty-state__title">No subscriptions found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map(( s: any ) => (
                <tr key={s.id} className="fin-table-hover-row fin-table-row cursor-pointer" onClick={() => toast.success(`Viewing subscription for ${s.studentName}`)}>
                  <td className="py-3 px-4 fin-cell-name">{s.studentName}</td>
                  <td className="py-3 px-4 fin-mono">{s.smartId}</td>
                  <td className="py-3 px-4 fin-text-body">{s.plan}</td>
                  <td className="py-3 px-4 fin-cell-subtext">{s.startDate}</td>
                  <td className="py-3 px-4 fin-cell-subtext">{s.endDate}</td>
                  <td className="py-3 px-4">
                    <span className={daysLeftBadgeClass(s.daysLeft)}>
                      {s.daysLeft < 0 ? `${Math.abs(s.daysLeft)}d ago` : `${s.daysLeft}d`}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right fin-text-body">{formatCurrency(s.base)}</td>
                  <td className="py-3 px-4 text-right fin-text-success">{formatCurrency(s.discount)}</td>
                  <td className="py-3 px-4 text-right font-semibold fin-text-body">{formatCurrency(s.total)}</td>
                  <td className="py-3 px-4 text-right fin-text-success">{formatCurrency(s.paid)}</td>
                  <td className={`py-3 px-4 text-right font-semibold ${s.due > 0 ? 'fin-text-danger' : 'fin-text-body'}`}>
                    {formatCurrency(s.due)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={STATUS_BADGE[s.status] || 'fin-badge fin-badge--neutral'}>{s.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="fin-badge fin-badge--info cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); router.push(`/superadmin/superadmin_finance/collect-fee?studentId=${s.id}&renew=true`); }}
                      >
                        <RefreshCw size={11} /> Renew
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
