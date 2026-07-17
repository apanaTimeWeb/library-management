// RESPONSIBILITY: Modal dialog for creating an expense category using React Hook Form + Zod (`Rule 16`, `Rule 38`).
// DATA FLOW: Dialog Form -> useAdminExpenseCategories -> Store -> Backend API (`Rule 39`).

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { Tag, Loader2 } from 'lucide-react';
import { adminExpenseCategoryFormSchema, AdminExpenseCategoryFormData } from '@/app/admin/admin_expense-categories/admin_expense-categories_types/admin_expense-categories_types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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

  const handleModalClose = (open: boolean) => {
    if (open) return;
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
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary font-semibold text-lg mb-1">
            <Tag size={20} />
            <DialogTitle>Create Expense Category</DialogTitle>
          </div>
          <DialogDescription>
            Define a new category to organize and group expenses recorded in daily settlements.
          </DialogDescription>
        </DialogHeader>

        {/* Form (`Rule 16`) */}
        <form id="cat-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-4">
          <div className="space-y-1.5">
            <label htmlFor="cat-name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Category Name <span className="text-danger">*</span>
            </label>
            <Input
              id="cat-name"
              type="text"
              {...register('name')}
              placeholder="e.g. Marketing"
              className={errors.name ? 'border-danger focus-visible:ring-danger font-medium' : 'font-medium'}
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-xs text-danger font-medium">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="cat-desc" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Description
            </label>
            <Textarea
              id="cat-desc"
              rows={3}
              {...register('description')}
              placeholder="Brief description of this expense type…"
              className={errors.description ? 'border-danger focus-visible:ring-danger resize-none' : 'resize-none'}
              disabled={isSubmitting}
            />
            {errors.description && <p className="text-xs text-danger font-medium">{errors.description.message}</p>}
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleModalClose(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="cat-form"
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting && <Loader2 size={15} className="animate-spin" />}
            {isSubmitting ? 'Creating…' : 'Save Category'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
