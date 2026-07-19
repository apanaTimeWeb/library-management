'use client';

import { useEffect } from 'react';
import { Shield, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useManagerFinanceStore } from '@/app/manager/manager_finance/manager_finance_store/manager_finance_store';
import { STATUS_COLORS } from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

export function ManagerFinanceTrustScoreClient() {
  const { trustScores, status, error, fetchTrustScores } = useManagerFinanceStore();

  useEffect(() => {
    fetchTrustScores();
  }, [fetchTrustScores]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load trust scores: {error}</div>;
  }

  const getScoreIcon = (rating: string) => {
    if (rating === 'Excellent' || rating === 'Good') return <TrendingUp size={16} className="text-success" />;
    if (rating === 'Average') return <Minus size={16} className="text-warning" />;
    return <TrendingDown size={16} className="text-danger" />;
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><Shield size={24} className="text-primary" /> Trust Scores</h1>
          <p className="text-sm text-text-secondary mt-1.5">Monitor student payment reliability and history.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Student</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Score</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Rating</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Late Payments</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={5} className="p-8 text-center text-text-secondary">Loading trust scores...</td></tr>
              ) : trustScores.map((ts) => (
                <tr key={ts.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{ts.studentName}</span>
                      <span className="text-xs text-text-secondary">{ts.studentId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full max-w-[100px] h-2 bg-bg-elevated rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${ts.score >= 80 ? 'bg-success' : ts.score >= 50 ? 'bg-warning' : 'bg-danger'}`} 
                          style={{ width: `${ts.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-text-primary">{ts.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 w-max rounded-full text-xs font-semibold ${STATUS_COLORS[ts.rating]}`}>
                      {getScoreIcon(ts.rating)} {ts.rating}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">
                    {ts.latePayments}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-primary hover:underline">View History</button>
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
