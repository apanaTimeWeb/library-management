'use client';

import { useEffect } from 'react';
import { Award, Users, Check } from 'lucide-react';
import { useManagerFinanceStore } from '@/app/manager/manager_finance/manager_finance_store/manager_finance_store';
import { STATUS_COLORS } from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

export function ManagerFinanceReferralsClient() {
  const { referrals, status, error, fetchReferrals } = useManagerFinanceStore();

  useEffect(() => {
    fetchReferrals();
  }, [fetchReferrals]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load referrals: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><Award size={24} className="text-primary" /> Referrals</h1>
          <p className="text-sm text-text-secondary mt-1.5">Manage referral bonuses and fee discounts.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Referrer</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Referred Student</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Bonus / Discount</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading referrals...</td></tr>
              ) : referrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary flex items-center gap-1.5"><Users size={14} className="text-primary" /> {ref.referrerName}</span>
                      <span className="text-xs text-text-secondary pl-5">{ref.referrerId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">{ref.referredStudent}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{ref.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-success">₹{ref.bonusAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[ref.status]}`}>
                      {ref.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {ref.status === 'Pending' ? (
                      <button className="flex items-center gap-1 ml-auto px-3 py-1.5 bg-primary text-white hover:bg-primary-hover rounded-md text-xs font-medium transition-colors">
                        Apply to Next Bill
                      </button>
                    ) : (
                      <span className="text-success inline-flex items-center gap-1 text-sm font-medium"><Check size={16} /> Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
