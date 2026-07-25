'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { IndianRupee, CreditCard, ArrowUpRight, ArrowDownRight, Activity, Plus } from 'lucide-react';
import { useManagerFinanceStore } from '@/app/manager/manager_finance/manager_finance_store/manager_finance_store';
import { MANAGER_FINANCE_ROUTES } from '@/app/manager/manager_finance/manager_finance_url_config';
import { STATUS_COLORS } from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

export function ManagerFinancePaymentsClient() {
  const { transactions, stats, status, error, fetchDashboardData } = useManagerFinanceStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load data: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
          <h1 className="text-xl font-bold text-text-primary">Payments Overview</h1>
          <p className="text-sm text-text-secondary mt-1.5">Track revenue, recent transactions, and outstanding dues.</p>
        </div>
        <div className="flex gap-3">

          <Link href={MANAGER_FINANCE_ROUTES.COLLECT_FEE} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
            <Plus size={16} /> Collect Fee
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-secondary">Today's Revenue</h3>
            <div className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center">
              <IndianRupee size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {status === 'loading' ? '...' : `₹${stats?.todayRevenue.toLocaleString('en-IN')}`}
          </div>
          <p className="text-xs text-success flex items-center gap-1 font-medium"><ArrowUpRight size={12} /> +12% from yesterday</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-secondary">Monthly Revenue</h3>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Activity size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {status === 'loading' ? '...' : `₹${stats?.thisMonthRevenue.toLocaleString('en-IN')}`}
          </div>
          <p className="text-xs text-success flex items-center gap-1 font-medium"><ArrowUpRight size={12} /> +5% from last month</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-danger">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-secondary">Pending Dues</h3>
            <div className="w-8 h-8 rounded-full bg-danger/10 text-danger flex items-center justify-center">
              <ArrowDownRight size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {status === 'loading' ? '...' : `₹${stats?.pendingDues.toLocaleString('en-IN')}`}
          </div>
          <Link href={MANAGER_FINANCE_ROUTES.LATE_FEES} className="text-xs text-primary hover:underline font-medium">View late fees →</Link>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-secondary">Active Subs</h3>
            <div className="w-8 h-8 rounded-full bg-warning/10 text-warning flex items-center justify-center">
              <CreditCard size={16} />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {status === 'loading' ? '...' : stats?.activeSubscriptions}
          </div>
          <Link href={MANAGER_FINANCE_ROUTES.SUBSCRIPTIONS} className="text-xs text-primary hover:underline font-medium">Manage subscriptions →</Link>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-bg-elevated/50">
          <h2 className="font-bold text-text-primary">Recent Transactions</h2>
          <button className="text-sm font-medium text-primary hover:text-primary-hover">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Fee Type</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={7} className="p-8 text-center text-text-secondary">Loading transactions...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-text-secondary">No recent transactions found.</td></tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-page transition-colors cursor-pointer group">
                    <td className="px-6 py-4"><span className="font-mono text-sm text-text-primary">{tx.transactionId}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-text-primary">{tx.studentName}</span>
                        <span className="text-xs text-text-secondary">{tx.studentId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="font-semibold text-text-primary">₹{tx.amount.toLocaleString('en-IN')}</span></td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{tx.feeType}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{tx.date}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{tx.method}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[tx.status]}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
