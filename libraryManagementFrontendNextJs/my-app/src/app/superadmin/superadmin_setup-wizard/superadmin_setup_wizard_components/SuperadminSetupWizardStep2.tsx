// RESPONSIBILITY: Renders the SuperadminSetupWizardStep2 component.
'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2, Plus } from 'lucide-react';
import { shiftsSchema, type ShiftsData } from '@/app/superadmin/superadmin_shared_components/superadmin_schema';
import { SETUP_WIZARD_DATA as d } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setupWizard_constants';

const inputCls = (hasErr?: boolean) => `w-full bg-bg-input border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 transition-all placeholder:text-text-tertiary ${hasErr ? 'border-danger focus:ring-danger' : 'border-border focus:ring-primary'}`;

import type { SuperadminSetupWizardStep2Props as Props } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setup_wizard_types/SuperadminSetupWizardTypes';

export function SuperadminSetupWizardStep2({ onNext }: Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<ShiftsData>({
    resolver: zodResolver(shiftsSchema),
    defaultValues: { shifts: d.shifts },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'shifts' });

  return (
    <form id="step2-form" onSubmit={handleSubmit(onNext)} noValidate className="space-y-3">
      {fields.map((field, i) => (
        <div key={field.id} className="grid gap-4 items-end bg-bg-card p-4 rounded-xl border border-border shadow-sm grid-cols-[1fr_120px_120px_40px] md:grid-cols-[1fr_140px_140px_40px]">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 block">Shift Name</label>
            <input {...register(`shifts.${i}.name`)} placeholder="e.g. Morning"
              className={inputCls(!!(errors.shifts?.[i]?.name))} />
            {errors.shifts?.[i]?.name && (
              <p className="text-xs text-danger mt-1.5">{errors.shifts[i].name?.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 block">Start</label>
            <input type="time" {...register(`shifts.${i}.start`)}
              className={`${inputCls()} [color-scheme:dark]`} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 block">End</label>
            <input type="time" {...register(`shifts.${i}.end`)}
              className={`${inputCls()} [color-scheme:dark]`} />
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
        onClick={() => append({ name: '', start: '06:00', end: '12:00' })}
        className="w-full py-3 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border text-text-secondary font-medium hover:border-primary hover:text-primary hover:bg-primary-subtle transition-all"
      >
        <Plus size={15} /> Add Another Shift
      </button>
    </form>
  );
}
