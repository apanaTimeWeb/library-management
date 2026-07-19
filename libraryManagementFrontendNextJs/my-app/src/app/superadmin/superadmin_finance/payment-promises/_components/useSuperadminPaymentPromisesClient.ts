/**
 * RESPONSIBILITY: Custom hook for managing the state and logic of the SuperadminPaymentPromisesClient component.
 * DATA FLOW: Constants -> useSuperadminPaymentPromisesClient -> SuperadminPaymentPromisesClient
 */
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import type { SuperadminFinancePromiseItem, SuperadminFinanceDialogState } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_PROMISES } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';

function calcDays(dateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((new Date(dateStr).getTime() - today.getTime()) / 86400000);
}

export function useSuperadminPaymentPromisesClient() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [promises, setPromises] = useState<SuperadminFinancePromiseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Extend Date Dialog State
  const [extendDialog, setExtendDialog] = useState<SuperadminFinanceDialogState | null>(null);
  const [newDate, setNewDate] = useState('');
  const [extendReason, setExtendReason] = useState('');

  useEffect(() => {
    // Simulate API fetch
    const t = setTimeout(() => {
      setPromises(SUPERADMIN_FINANCE_MOCK_PROMISES as SuperadminFinancePromiseItem[]);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const filteredPromises = promises.filter((p) => statusFilter === 'all' || p.status === statusFilter);

  const handleFulfill = (id: number, name: string) => {
    setPromises((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: 'fulfilled', fulfilledDate: new Date().toISOString().split('T')[0] } : p
      )
    );
    toast.success(`${name}'s promise marked as paid.`);
  };

  const handleExtend = () => {
    if (!extendDialog || !newDate || !extendReason) return;
    setPromises((prev) =>
      prev.map((p) =>
        p.id === extendDialog.id
          ? { ...p, expectedDate: newDate, timesChanged: p.timesChanged + 1, daysUntilDue: calcDays(newDate) }
          : p
      )
    );
    toast.success(`📅 ${extendDialog.name}'s promise date extended.`);
    
    // Reset state
    setExtendDialog(null);
    setNewDate('');
    setExtendReason('');
  };

  return {
    statusFilter,
    setStatusFilter,
    filteredPromises,
    isLoading,
    extendDialog,
    setExtendDialog,
    newDate,
    setNewDate,
    extendReason,
    setExtendReason,
    handleFulfill,
    handleExtend,
  };
}
