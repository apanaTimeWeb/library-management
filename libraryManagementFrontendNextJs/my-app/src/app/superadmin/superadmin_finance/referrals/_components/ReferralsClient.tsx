// RESPONSIBILITY: Renders the referral program payout ledger, tracking rewards earned through student referrals.
// DATA FLOW: API /finance/referrals -> Referrals State -> Payout Modal
'use client';

import { Users, IndianRupee } from 'lucide-react';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useReferralsClient } from './useReferralsClient';
import { ReferralPayoutModal } from './ReferralPayoutModal';

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-warning/10 text-warning border border-warning/20',
  paid:    'bg-success/10 text-success border border-success/20',
};

export function ReferralsClient() {
  const {
    statusFilter, setStatusFilter,
    isLoading, isSubmitting,
    payoutDialog, setPayoutDialog,
    filtered,
    totalPaid,
    pendingCount,
    handlePayout,
  } = useReferralsClient();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-text-primary">Referral Payouts</h1>
        <p className="text-[12px] text-text-secondary">Manage and disburse student referral rewards.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="bg-card rounded-[var(--radius-lg)] border border-border p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1">Total Paid</p>
          <p className="text-[20px] font-black tracking-tight text-success">{isLoading ? '—' : formatCurrency(totalPaid)}</p>
        </div>
        <div className="bg-card rounded-[var(--radius-lg)] border border-border p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1">Pending Payouts</p>
          <p className="text-[20px] font-black tracking-tight text-warning">{isLoading ? '—' : pendingCount}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-card p-3 rounded-[var(--radius-lg)] border border-border w-fit">
        <div className="w-48">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Paid', value: 'paid' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      <div className="bg-card rounded-[var(--radius-lg)] border border-border overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 uppercase text-[12px] font-semibold text-text-secondary border-b border-border">
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Referrer (Gets Paid)</th>
              <th className="text-left py-3 px-4">Referee (Joined)</th>
              <th className="text-right py-3 px-4">Reward ₹</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 w-16 bg-muted/20 animate-pulse rounded" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                    <div className="text-4xl text-text-secondary">🤝</div>
                    <p className="text-[16px] text-text-secondary">No referrals found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map(( r ) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors group">
                  <td className="py-3 px-4 text-[13px] font-medium text-text-primary">{r.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-primary" />
                      <div>
                        <div className="font-medium text-[14px] text-text-primary">{r.referrerName}</div>
                        <div className="text-[12px] text-text-secondary">{r.referrerSmartId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-[14px] text-text-primary">{r.refereeName}</div>
                    <div className="text-[12px] text-text-secondary">{r.refereeSmartId}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-[14px] text-success">{formatCurrency(r.rewardAmount)}</td>
                  <td className="py-3 px-4">
                    <span className={`${STATUS_BADGE[r.status] || 'bg-input text-text-primary border-border'} px-2 py-0.5 rounded-[var(--radius-full)] text-[11px] font-bold capitalize`}>{r.status}</span>
                    {r.status === 'paid' && r.paidDate && (
                      <div className="text-[12px] text-text-secondary mt-1">{r.paidDate} · {r.paymentMethod}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {r.status === 'pending' && (
                        <button
                          className="flex items-center gap-1.5 bg-success/10 text-success border border-success/20 px-3 py-1.5 rounded-[var(--radius-md)] text-[11px] font-bold hover:bg-success hover:text-success-foreground transition-colors cursor-pointer"
                          onClick={() => setPayoutDialog({ id: r.id, name: r.referrerName, amount: r.rewardAmount })}
                        >
                          <IndianRupee size={11} /> Mark Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ReferralPayoutModal
        isOpen={!!payoutDialog}
        onClose={() => setPayoutDialog(null)}
        onSubmit={handlePayout}
        referrerName={payoutDialog?.name || ''}
        amount={payoutDialog?.amount || 0}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
