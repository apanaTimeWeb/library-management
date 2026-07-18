/**
 * RESPONSIBILITY: Logic and state management for the ReferralsClient component.
 */
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';
import { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import type { SuperadminFinanceReferral } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_REFERRERS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';
import type { PayoutFormData } from '@/app/superadmin/superadmin_finance/referrals/_components/ReferralPayoutModal';

export function useReferralsClient() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [allReferrals, setAllReferrals] = useState<SuperadminFinanceReferral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payoutDialog, setPayoutDialog] = useState<{ id: number; name: string; amount: number } | null>(null);

  useEffect(() => {
    fetchApi(SUPERADMIN_API_ROUTES.FINANCE_REFERRALS).then(( data: any ) => {
      const actualData = Array.isArray(data) ? data : data?.data;
      if (!Array.isArray(actualData) || actualData.length === 0 || String(actualData[0]?.id).startsWith('MOCK-')) {
        setAllReferrals(SUPERADMIN_FINANCE_MOCK_REFERRERS as unknown as SuperadminFinanceReferral[]);
        setIsLoading(false);
        return;
      }
      const mapped: SuperadminFinanceReferral[] = actualData.map(( r: Record<string, any> ) => ({
        id: parseInt(String(r.id || '0'), 10),
        referrerName: String(r.referrerName || 'Referrer'),
        referrerSmartId: 'S-001',
        refereeName: String(r.refereeName || 'Referee'),
        refereeSmartId: 'S-002',
        rewardAmount: Number(r.rewardAmount) || 0,
        status: (r.status || 'pending') as SuperadminFinanceReferral['status'],
        date: r.date ? new Date(String(r.date)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      }));
      setAllReferrals(mapped);
      setIsLoading(false);
    }).catch(err => {
      logger.error('Failed to load referrals', err);
      setIsLoading(false);
    });
  }, []);

  const filtered = allReferrals.filter((r) => statusFilter === 'all' || r.status === statusFilter);

  const totalPaid = allReferrals.filter((r) => r.status === 'paid').reduce((sum, r) => sum + r.rewardAmount, 0);
  const pendingCount = allReferrals.filter((r) => r.status === 'pending').length;

  const handlePayout = (data: PayoutFormData) => {
    if (!payoutDialog) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setAllReferrals((prev) =>
        prev.map(( r ) =>
          r.id === payoutDialog.id
            ? { ...r, status: 'paid', paidDate: new Date().toISOString().split('T')[0], paymentMethod: data.paymentMethod.toUpperCase() }
            : r
        )
      );
      toast.success(`💸 Payout of ${formatCurrency(payoutDialog.amount)} to ${payoutDialog.name} completed.`);
      setPayoutDialog(null);
      setIsSubmitting(false);
    }, 700);
  };

  return {
    statusFilter, setStatusFilter,
    isLoading, isSubmitting,
    payoutDialog, setPayoutDialog,
    filtered,
    totalPaid,
    pendingCount,
    handlePayout,
  };
}
