// RESPONSIBILITY: Renders the useAdminFinanceRenewals.ts component/hook.
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/app/admin/admin_finance/admin_finance_utils/format';
import { ADMIN_FINANCE_MOCK_RENEWALS, ADMIN_FINANCE_MOCK_PLANS, ADMIN_FINANCE_FILTERS } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import { FilterType, Renewal } from "./useAdminFinanceRenewals_types";

export function useAdminFinanceRenewals() {
  const [filter, setFilter] = useState<FilterType>('expiring_7');
  const [allRenewals, setAllRenewals] = useState<Renewal[]>(ADMIN_FINANCE_MOCK_RENEWALS as Renewal[]);
  
  const [renewDialog, setRenewDialog] = useState<{ id: number; name: string } | null>(null);
  const [renewPlanId, setRenewPlanId] = useState('');
  const [renewAmount, setRenewAmount] = useState('');
  const [renewMode, setRenewMode] = useState('cash');
  const [renewTxnId, setRenewTxnId] = useState('');
  const [isRenewing, setIsRenewing] = useState(false);

  const visible = useMemo(() => {
    return allRenewals.filter((r) => {
      if (filter === 'expired')     return r.daysLeft < 0;
      if (filter === 'expiring_7')  return r.daysLeft >= 0 && r.daysLeft <= 7;
      if (filter === 'expiring_15') return r.daysLeft >= 0 && r.daysLeft <= 15;
      return true;
    });
  }, [allRenewals, filter]);

  const handleRemindAll = () => {
    toast.success(`📱 WhatsApp reminder sent to ${visible.length} students.`);
  };

  const handleRemind = (name: string) => {
    toast.success(`✅ Reminder sent to ${name}`);
  };

  const openRenew = (r: Renewal) => {
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
    filter,
    setFilter,
    visible,
    handleRemindAll,
    handleRemind,
    openRenew,
    handleRenew,
    renewDialog,
    setRenewDialog,
    renewPlanId,
    setRenewPlanId,
    renewAmount,
    setRenewAmount,
    renewMode,
    setRenewMode,
    renewTxnId,
    setRenewTxnId,
    isRenewing,
    ADMIN_FINANCE_MOCK_PLANS,
    ADMIN_FINANCE_FILTERS
  };
}
