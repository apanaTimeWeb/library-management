'use client';
// RESPONSIBILITY: Renders the SuperadminSetupWizardStep4 component.
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2, Plus } from 'lucide-react';
import { plansSchema, type PlansData } from '@/app/superadmin/superadmin_shared_components/superadmin_schema';
import { SETUP_WIZARD_DATA as d } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setupWizard_constants';

const inputCls = (hasErr?: boolean) => `w-full bg-bg-pageg-input border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 transition-all placeholder:text-text-tertiary ${hasErr ? 'border-danger focus:ring-danger' : 'border-border focus:ring-primary'}`;

import type { SuperadminSetupWizardStep4Props as Props } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setup_wizard_types/SuperadminSetupWizardTypes';

export function SuperadminSetupWizardStep4({ onNext }: Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<PlansData>({
    resolver: zodResolver(plansSchema),
    defaultValues: { plans: d.plans },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'plans' });

  return (
    <form id="step4-form" onSubmit={handleSubmit(onNext)} noValidate className="space-y-3">
      {fields.map((field, i) => (
        <div key={field.id} className="grid gap-4 items-end bg-bg-pageg-card p-4 rounded-xl border border-border shadow-sm grid-cols-[1fr_80px_120px_40px] md:grid-cols-[1fr_100px_140px_40px]">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 block">
              Plan Name <span className="text-danger ml-0.5">*</span>
            </label>
            <input {...register(`plans.${i}.name`)} placeholder="e.g. Monthly"
              className={inputCls(!!(errors.plans?.[i]?.name))} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 block">Days</label>
            <input type="number" min={1}
              {...register(`plans.${i}.days`, { valueAsNumber: true })}
              className={inputCls()} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 block">Price (₹)</label>
            <input type="number" min={0}
              {...register(`plans.${i}.price`, { valueAsNumber: true })}
              placeholder="1000"
              className={inputCls()} />
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            disabled={fields.length <= 1}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-transparent text-text-tertiary hover:text-danger hover:border-danger hover:bg-danger-bg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: '', days: 30, price: 0 })}
        className="w-full py-3 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border text-text-secondary font-medium hover:border-primary hover:text-primary hover:bg-primary-subtle transition-all"
      >
        <Plus size={15} /> Add Another Plan
      </button>
    </form>
  );
}
