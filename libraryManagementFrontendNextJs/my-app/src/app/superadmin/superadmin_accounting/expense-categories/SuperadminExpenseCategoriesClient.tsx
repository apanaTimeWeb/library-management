'use client';
// RESPONSIBILITY: Main client view managing expense categories list and creation modal.
// DATA FLOW: useSuperadminExpenseCategories -> SuperadminExpenseCategoriesClient -> Card / Dialog

import React, { useState } from 'react';
import { useSuperadminExpenseCategories as useSuperadminExpenseCategories } from '@/app/superadmin/superadmin_accounting/expense-categories/superadmin_expense_categories_hooks/useSuperadminExpenseCategories';
import { SuperadminExpenseCategoriesHeader } from '@/app/superadmin/superadmin_accounting/expense-categories/superadmin_expense_categories_components/SuperadminExpenseCategoriesHeader';
import { SuperadminExpenseCategoriesCard } from '@/app/superadmin/superadmin_accounting/expense-categories/superadmin_expense_categories_components/SuperadminExpenseCategoriesCard';
import { SuperadminExpenseCategoriesAddDialog } from '@/app/superadmin/superadmin_accounting/expense-categories/superadmin_expense_categories_components/SuperadminExpenseCategoriesAddDialog';

export function SuperadminExpenseCategoriesClient() {
  const { categories, availableColors, handleAdd, handleDelete } = useSuperadminExpenseCategories();
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const onAddCategory = async (cat: unknown) => {
    // @ts-ignore
    await handleAdd(cat);
    showToast('âœ… Category added successfully');
  };

  const onDeleteCategory = async (id: number) => {
    await handleDelete(id);
    showToast('âœ… Category deleted');
  };

  return (
    <div className="relative p-2 sm:p-4">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-card border border-border shadow-xl rounded-md px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-semibold text-text-primary">{toast}</span>
        </div>
      )}

      {showAdd && (
        <SuperadminExpenseCategoriesAddDialog 
          availableColors={availableColors} 
          onClose={() => setShowAdd(false)} 
          onSave={onAddCategory} 
        />
      )}

      <SuperadminExpenseCategoriesHeader onAddClick={() => setShowAdd(true)} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {categories.map(category => (
          <SuperadminExpenseCategoriesCard 
            key={category.id} 
            category={category} 
            onDelete={onDeleteCategory} 
          />
        ))}
      </div>
    </div>
  );
}
