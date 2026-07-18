/**
 * RESPONSIBILITY: Logic and state management for the SuperadminRenewalsClient component.
 */
import { useState } from 'react';
import toast from 'react-hot-toast';
import type { SuperadminFinanceRenewalsFilterType, SuperadminFinanceRenewal } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_RENEWALS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';

export const PLANS = [
  { id: 1, name: 'Basic',   price: 999  },
  { id: 2, name: 'Premium', price: 1499 },
  { id: 3, name: 'Elite',   price: 2499 },
];

export const FILTERS: { label: string; value: SuperadminFinanceRenewalsFilterType; emoji: string }[] = [
  { label: 'Expired',            value: 'expired',     emoji: '🔴' },
  { label: 'Expiring in 7 days', value: 'expiring_7',  emoji: '🟠' },
  { label: 'Expiring in 15 days',value: 'expiring_15', emoji: '🟡' },
];

export function useSuperadminRenewalsClient() {
  const [filter, setFilter] = useState<SuperadminFinanceRenewalsFilterType>('expiring_7');
  const [allRenewals, setAllRenewals] = useState<SuperadminFinanceRenewal[]>(SUPERADMIN_FINANCE_MOCK_RENEWALS);
  const [renewDialog, setRenewDialog] = useState<{ id: number; name: string } | null>(null);
  const [renewPlanId, setRenewPlanId] = useState('');
  const [renewAmount, setRenewAmount] = useState('');
  const [renewMode, setRenewMode] = useState('cash');
  const [renewTxnId, setRenewTxnId] = useState('');
  const [isRenewing, setIsRenewing] = useState(false);

  const visible = allRenewals.filter((r) => {
    if (filter === 'expired')     return r.daysLeft < 0;
    if (filter === 'expiring_7')  return r.daysLeft >= 0 && r.daysLeft <= 7;
    if (filter === 'expiring_15') return r.daysLeft >= 0 && r.daysLeft <= 15;
    return true;
  });

  const handleRemindAll = () => {
    toast.success(`📱 WhatsApp reminder sent to ${visible.length} students.`);
  };

  const handleRemind = (name: string) => {
    toast.success(`Reminder sent to ${name}`);
  };

  const openRenew = (r: SuperadminFinanceRenewal) => {
    setRenewDialog({ id: r.id, name: r.studentName });
    setRenewPlanId(String(r.planId));
    setRenewAmount(String(r.total));
  };

  const handleRenew = () => {
    if (!renewDialog || !renewAmount) return;
    setIsRenewing(true);
    setTimeout(() => {
      setAllRenewals((prev) => prev.filter((r) => r.id !== renewDialog.id));
      toast.success(`🔄 ${renewDialog.name}'s subscription renewed.`);
      setRenewDialog(null);
      setRenewAmount('');
      setRenewTxnId('');
      setIsRenewing(false);
    }, 800);
  };

  return {
    filter, setFilter,
    visible,
    renewDialog, setRenewDialog,
    renewPlanId, setRenewPlanId,
    renewAmount, setRenewAmount,
    renewMode, setRenewMode,
    renewTxnId, setRenewTxnId,
    isRenewing,
    handleRemindAll,
    handleRemind,
    openRenew,
    handleRenew,
  };
}
