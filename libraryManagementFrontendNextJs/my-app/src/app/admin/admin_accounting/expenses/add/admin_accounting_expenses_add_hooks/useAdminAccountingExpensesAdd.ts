// RESPONSIBILITY: Renders the useAdminAccountingExpensesAdd.ts component/hook.
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ADMIN_ACCOUNTING_EXPENSES_CATEGORIES } from '@/app/admin/admin_accounting/admin_accounting_constants/AdminAccountingConstants';
import { AdminAccountingExpenseForm } from '@/app/admin/admin_accounting/expenses/add/admin_accounting_expenses_add_types/admin_accounting_expenses_add_types';

export function useAdminAccountingExpensesAdd() {
  const router = useRouter();
  const [form, setForm] = useState<AdminAccountingExpenseForm>({ 
    date: '', category: ADMIN_ACCOUNTING_EXPENSES_CATEGORIES[0], 
    description: '', amount: '', paidBy: '', mode: 'cash', notes: '' 
  });
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (!form.date || !form.description || !form.amount || !form.paidBy) {
      toast.error('Please fill all required fields.');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      toast.success('Expense recorded successfully.');
      router.push(ADMIN_ROUTES.ACCOUNTING_EXPENSES);
    }, 700);
  };

  const handleCancel = () => {
    router.push(ADMIN_ROUTES.ACCOUNTING_EXPENSES);
  };

  return { form, setForm, saving, handleSave, handleCancel, categories: ADMIN_ACCOUNTING_EXPENSES_CATEGORIES };
}
