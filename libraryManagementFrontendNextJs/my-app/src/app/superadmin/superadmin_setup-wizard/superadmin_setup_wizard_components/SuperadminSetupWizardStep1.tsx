'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { branchDetailsSchema, type BranchDetailsData } from '@/app/superadmin/superadmin_shared_components/superadmin_schema';
import { SETUP_WIZARD_DATA as d } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setupWizard_constants';

const inputCls = (hasErr?: boolean) => `sa-input${hasErr ? ' sa-input--error' : ''}`;

export function SuperadminSetupWizardStep1({ onNext }: { onNext: (d: BranchDetailsData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<BranchDetailsData>({
    resolver: zodResolver(branchDetailsSchema),
    defaultValues: { name: d.libraryName, address: d.address, city: d.city, gst: d.gst },
  });
  return (
    <form id="step1-form" onSubmit={handleSubmit(onNext)} noValidate className="space-y-4">
      <div className="space-y-1.5">
        <label className="sa-wizard-field-label">
          Library Name <span className="sa-wizard-field-required">*</span>
        </label>
        <input {...register('name')} placeholder="e.g. City Reading Hub" className={inputCls(!!errors.name)} />
        {errors.name && <p className="sa-wizard-field-error">{errors.name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="sa-wizard-field-label">
          Address <span className="sa-wizard-field-required">*</span>
        </label>
        <textarea {...register('address')} rows={3} placeholder="Full address..."
          className={`${inputCls(!!errors.address)} resize-none`} />
        {errors.address && <p className="sa-wizard-field-error">{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="sa-wizard-field-label">
            City <span className="sa-wizard-field-required">*</span>
          </label>
          <input {...register('city')} placeholder="City" className={inputCls(!!errors.city)} />
          {errors.city && <p className="sa-wizard-field-error">{errors.city.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="sa-wizard-field-label">
            GST Number <span className="sa-wizard-field-optional">(optional)</span>
          </label>
          <input {...register('gst')} placeholder="22AAAAA0000A1Z5" className={inputCls()} />
        </div>
      </div>
    </form>
  );
}
