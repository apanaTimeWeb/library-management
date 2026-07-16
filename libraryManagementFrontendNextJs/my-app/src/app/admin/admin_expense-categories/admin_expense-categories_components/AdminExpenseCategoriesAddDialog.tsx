// RESPONSIBILITY: Modal dialog for creating an expense category using React Hook Form + Zod (`Rule 16`, `Rule 38`).
// DATA FLOW: Dialog Form -> useAdminExpenseCategories -> Store -> Backend API (`Rule 39`).

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { Tag, X, Loader2 } from 'lucide-react';
import { adminExpenseCategoryFormSchema, AdminExpenseCategoryFormData } from '@/app/admin/admin_expense-categories/admin_expense-categories_types/admin_expense-categories_types';

interface AdminExpenseCategoriesAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminExpenseCategoryFormData) => Promise<{ success: boolean; message: string }>;
}

export function AdminExpenseCategoriesAddDialog({ isOpen, onClose, onSubmit }: AdminExpenseCategoriesAddDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useReactHookForm<AdminExpenseCategoryFormData>({
    resolver: zodResolver(adminExpenseCategoryFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // Intercept beforeunload when form is modified (`Rule 48`)
  // Dependency array monitors isDirty and isOpen (`Rule 55`)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    if (isDirty && isOpen) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty, isOpen]);

  if (!isOpen) return null;

  const onFormSubmit = async (data: AdminExpenseCategoryFormData) => {
    setIsSubmitting(true);
    try {
      const res = await onSubmit(data);
      if (res.success) {
        reset();
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (isDirty) {
      if (window.confirm('You have unsaved changes in this form. Are you sure you want to discard them? (`Rule 48`)')) {
        reset();
        onClose();
      }
    } else {
      reset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-50">
      <div className="bg-card border border-border rounded-xl shadow-2xl max-w-md w-full p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5 text-primary font-semibold text-lg">
            <Tag size={20} />
            <h2>Create Expense Category</h2>
          </div>
          <button
            type="button"
            onClick={handleModalClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-muted-foreground m-0">
          Define a new category to organize and group expenses recorded in daily settlements.
        </p>

        {/* Form (`Rule 16`) */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="cat-name" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
              Category Name *
            </label>
            <input
              id="cat-name"
              type="text"
              {...register('name')}
              placeholder="e.g. Marketing"
              className="admin-input w-full font-medium"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-xs text-danger mt-1 font-medium">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="cat-desc" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              id="cat-desc"
              rows={3}
              {...register('description')}
              placeholder="Brief description of this expense type…"
              className="admin-input w-full resize-none py-2"
              disabled={isSubmitting}
            />
            {errors.description && <p className="text-xs text-danger mt-1 font-medium">{errors.description.message}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={handleModalClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 size={15} className="animate-spin" />}
              {isSubmitting ? 'Creating…' : 'Save Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
