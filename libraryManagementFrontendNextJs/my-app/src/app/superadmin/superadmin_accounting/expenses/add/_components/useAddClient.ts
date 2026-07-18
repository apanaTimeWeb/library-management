/**
 * RESPONSIBILITY: Logic and state management for the AddClient component.
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const CATEGORIES = ['Electricity', 'Maintenance', 'Stationery', 'Internet', 'Cleaning', 'Salary', 'Rent', 'Miscellaneous'];

export function useAddClient() {
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
      router.push('/superadmin/superadmin_accounting/expenses');
    }, 700);
  };

  const handleCancel = () => {
    router.push('/superadmin/superadmin_accounting/expenses');
  };

  return {
    form, setForm,
    saving,
    handleSave,
    handleCancel,
  };
}
