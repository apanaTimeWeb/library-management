/**
 * RESPONSIBILITY: Logic and state management for the SuperadminAddClient component.
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/SuperadminUrlConfig';
import toast from 'react-hot-toast';

export const CATEGORIES = ['Electricity', 'Maintenance', 'Stationery', 'Internet', 'Cleaning', 'Salary', 'Rent', 'Miscellaneous'];

export function useSuperadminAddClient() {
  const router = useRouter();
  const [form, setForm] = useState({ date: '', category: CATEGORIES[0], description: '', amount: '', paidBy: '', mode: 'cash', notes: '' });
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (!form.date || !form.description || !form.amount || !form.paidBy) {
      toast.error('Please fill all required fields.');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      toast.success('Expense recorded successfully.');
      router.push(SUPERADMIN_ROUTES.ACCOUNTING_EXPENSES);
    }, 700);
  };

  const handleCancel = () => {
    router.push(SUPERADMIN_ROUTES.ACCOUNTING_EXPENSES);
  };

  return {
    form, setForm,
    saving,
    handleSave,
    handleCancel,
  };
}
