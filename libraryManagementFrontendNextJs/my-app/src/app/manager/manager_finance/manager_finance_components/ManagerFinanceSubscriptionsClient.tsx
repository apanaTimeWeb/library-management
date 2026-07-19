'use client';

import { useEffect } from 'react';
import { FileText, Plus, Search } from 'lucide-react';
import { useManagerFinanceStore } from '@/app/manager/manager_finance/manager_finance_store/manager_finance_store';
import { STATUS_COLORS } from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

export function ManagerFinanceSubscriptionsClient() {
  const { subscriptions, status, error, fetchSubscriptions } = useManagerFinanceStore();

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load subscriptions: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
          <h1 className="text-xl font-bold text-text-primary">Subscriptions</h1>
          <p className="text-sm text-text-secondary mt-1.5">Manage active, expired, and upcoming student subscriptions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
          <Plus size={16} /> New Subscription
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-bg-elevated/50">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input type="text" placeholder="Search student or ID..." className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <select className="w-full sm:w-auto px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Expired</option>
            <option>Upcoming</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Student</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Plan Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Duration</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading subscriptions...</td></tr>
              ) : subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{sub.studentName}</span>
                      <span className="text-xs text-text-secondary">{sub.studentId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">{sub.planName}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {sub.startDate} <br/>to {sub.endDate}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-text-primary">₹{sub.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[sub.status]}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-primary hover:underline">Manage</button>
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
