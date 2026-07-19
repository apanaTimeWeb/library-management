'use client';
// RESPONSIBILITY: Renders the SuperadminSetupWizardStep1 component.
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { branchDetailsSchema, type BranchDetailsData } from '@/app/superadmin/superadmin_shared_components/Superadminsuperadmin_schema';
import { SETUP_WIZARD_DATA as d } from '@/app/superadmin/superadmin_setup-wizard/Superadminsuperadmin_setupWizard_constants';

const inputCls = (hasErr?: boolean) => `w-full bg-input border rounded-lg px-3.5 py-2.5 text-base text-text-primary focus:outline-none focus:ring-2 transition-all placeholder:text-text-tertiary ${hasErr ? 'border-danger focus:ring-danger/20 focus:border-danger' : 'border-border focus:ring-primary/20 focus:border-primary'}`;

import type { SuperadminSetupWizardStep1Props as Props } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setup_wizard_types/SuperadminSetupWizardTypes';

export function SuperadminSetupWizardStep1({ onNext }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<BranchDetailsData>({
    resolver: zodResolver(branchDetailsSchema),
    defaultValues: { name: d.libraryName, address: d.address, city: d.city, gst: d.gst },
  });
  return (
    <form id="step1-form" onSubmit={handleSubmit(onNext)} noValidate className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 block">
          Library Name <span className="text-danger ml-1">*</span>
        </label>
        <input {...register('name')} placeholder="e.g. City Reading Hub" className={inputCls(!!errors.name)} />
        {errors.name && <p className="text-xs text-danger mt-1.5">{errors.name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 block">
          Address <span className="text-danger ml-1">*</span>
        </label>
        <textarea {...register('address')} rows={3} placeholder="Full address..."
          className={`${inputCls(!!errors.address)} resize-none`} />
        {errors.address && <p className="text-xs text-danger mt-1.5">{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 block">
            City <span className="text-danger ml-1">*</span>
          </label>
          <input {...register('city')} placeholder="City" className={inputCls(!!errors.city)} />
          {errors.city && <p className="text-xs text-danger mt-1.5">{errors.city.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 block">
            GST Number <span className="text-text-tertiary font-normal text-xs ml-1 lowercase">(optional)</span>
          </label>
          <input {...register('gst')} placeholder="22AAAAA0000A1Z5" className={inputCls()} />
        </div>
      </div>
    </form>
  );
}
