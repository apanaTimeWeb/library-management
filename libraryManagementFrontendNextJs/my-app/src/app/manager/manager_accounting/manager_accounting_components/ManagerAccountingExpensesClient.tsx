'use client';

import { useEffect } from 'react';
import { TrendingUp, Plus, Filter } from 'lucide-react';
import { useManagerAccountingStore } from '@/app/manager/manager_accounting/manager_accounting_store/manager_accounting_store';
import { ACCOUNTING_STATUS_COLORS } from '@/app/manager/manager_accounting/manager_accounting_constants/manager_accounting_constants';

export function ManagerAccountingExpensesClient() {
  const { expenses, stats, status, error, fetchExpenses } = useManagerAccountingStore();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load expenses: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Accounting</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><TrendingUp size={24} className="text-primary" /> Expenses</h1>
          <p className="text-sm text-text-secondary mt-1.5">Track and manage operational and marketing expenses.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
          <Plus size={16} /> Record Expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-text-secondary mb-1">Total Monthly Expenses</h3>
          <div className="text-2xl font-bold text-text-primary">
            ₹{stats?.monthlyExpenses.toLocaleString() || '---'}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-bg-elevated/50">
          <h2 className="font-bold text-text-primary">Recent Expenses</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-border text-text-secondary rounded-lg text-sm font-medium hover:bg-bg-elevated transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Category</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Description</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={7} className="p-8 text-center text-text-secondary">Loading expenses...</td></tr>
              ) : expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-text-secondary">{exp.expenseId}</td>
                  <td className="px-6 py-4 text-sm text-text-primary">{exp.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">{exp.category}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{exp.description}</td>
                  <td className="px-6 py-4 text-sm font-bold text-text-primary">₹{exp.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${ACCOUNTING_STATUS_COLORS[exp.status]}`}>
                      {exp.status}
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
