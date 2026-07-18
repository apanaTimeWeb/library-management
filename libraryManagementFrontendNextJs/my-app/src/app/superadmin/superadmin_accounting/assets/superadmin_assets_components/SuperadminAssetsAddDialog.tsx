// RESPONSIBILITY: Modal dialog for onboarding and registering new physical or digital library assets.
// DATA FLOW: User Input -> useSuperadminAssetsAddDialog -> onSave callback

import React from 'react';
import { X, Loader } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import type { SuperadminAssetsAddDialogProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';
import { useSuperadminAssetsAddDialog } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_components/useSuperadminAssetsAddDialog';

export function SuperadminAssetsAddDialog({ categories, onClose, onSave }: Props) {
  const { form, saving, onSubmit, allCategories } = useSuperadminAssetsAddDialog({ categories, onClose, onSave });
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-card rounded-[var(--radius-lg)] shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-border bg-page/50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">➕ Add Asset</h2>
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors cursor-pointer"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={onSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Asset Name <span className="text-danger">*</span></label>
              <input 
                {...register('name')}
                className={`w-full bg-input border ${errors.name ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner`} 
                placeholder="e.g. AC Unit" 
              />
              {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Category</label>
              <SuperadminSearchableDropdown
                options={allCategories.map(c => ({ label: c, value: c }))}
                value={watch('category')}
                onChange={val => setValue('category', val, { shouldValidate: true })}
              />
              {errors.category && <p className="text-danger text-xs mt-1">{errors.category.message}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Purchase Date <span className="text-danger">*</span></label>
              <input 
                type="date"
                {...register('purchaseDate')}
                className={`w-full bg-input border ${errors.purchaseDate ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner`} 
              />
              {errors.purchaseDate && <p className="text-danger text-xs mt-1">{errors.purchaseDate.message}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Purchase Value ₹ <span className="text-danger">*</span></label>
              <input 
                type="number"
                {...register('purchaseValue', { valueAsNumber: true })}
                className={`w-full bg-input border ${errors.purchaseValue ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner`} 
                placeholder="0" 
              />
              {errors.purchaseValue && <p className="text-danger text-xs mt-1">{errors.purchaseValue.message}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Location <span className="text-danger">*</span></label>
              <input 
                {...register('location')}
                className={`w-full bg-input border ${errors.location ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner`} 
                placeholder="e.g. Ground Floor" 
              />
              {errors.location && <p className="text-danger text-xs mt-1">{errors.location.message}</p>}
            </div>
          </div>

          <div className="p-5 border-t border-border bg-page/50 flex justify-end gap-3">
            <button 
              type="button"
              className="px-4 py-2 bg-transparent border border-border text-text-primary text-sm font-bold rounded-[var(--radius-md)] hover:bg-input transition-colors cursor-pointer" 
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-success text-success-foreground text-sm font-bold rounded-[var(--radius-md)] hover:brightness-95 transition-colors disabled:opacity-50 shadow-sm cursor-pointer" 
              disabled={saving}
            >
              {saving ? <><Loader size={14} className="animate-spin" /> Saving...</> : 'Save Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
