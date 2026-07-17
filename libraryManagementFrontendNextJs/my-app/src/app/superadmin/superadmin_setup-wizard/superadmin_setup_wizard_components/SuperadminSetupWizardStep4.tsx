'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2, Plus } from 'lucide-react';
import { plansSchema, type PlansData } from '@/app/superadmin/superadmin_shared_components/superadmin_schema';
import { SETUP_WIZARD_DATA as d } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setupWizard_constants';

const inputCls = (hasErr?: boolean) => `sa-input${hasErr ? ' sa-input--error' : ''}`;

export function SuperadminSetupWizardStep4({ onNext }: { onNext: (d: PlansData) => void }) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<PlansData>({
    resolver: zodResolver(plansSchema),
    defaultValues: { plans: d.plans },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'plans' });

  return (
    <form id="step4-form" onSubmit={handleSubmit(onNext)} noValidate className="space-y-3">
      {fields.map((field, i) => (
        <div key={field.id} className="sa-wizard-row sa-wizard-row--plans">
          <div className="space-y-1.5">
            <label className="sa-wizard-field-label--sm">
              Plan Name <span className="sa-wizard-field-required">*</span>
            </label>
            <input {...register(`plans.${i}.name`)} placeholder="e.g. Monthly"
              className={inputCls(!!(errors.plans?.[i]?.name))} />
          </div>
          <div className="space-y-1.5">
            <label className="sa-wizard-field-label--sm">Days</label>
            <input type="number" min={1}
              {...register(`plans.${i}.days`, { valueAsNumber: true })}
              className={inputCls()} />
          </div>
          <div className="space-y-1.5">
            <label className="sa-wizard-field-label--sm">Price (₹)</label>
            <input type="number" min={0}
              {...register(`plans.${i}.price`, { valueAsNumber: true })}
              placeholder="1000"
              className={inputCls()} />
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            disabled={fields.length <= 1}
            className="sa-wizard-remove-btn"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: '', days: 30, price: 0 })}
        className="sa-btn-dashed"
      >
        <Plus size={15} /> Add Another Plan
      </button>
    </form>
  );
}
