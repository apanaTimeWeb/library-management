'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2, Plus } from 'lucide-react';
import { shiftsSchema, type ShiftsData } from '@/app/superadmin/superadmin_shared_components/superadmin_schema';
import { SETUP_WIZARD_DATA as d } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setupWizard_constants';

const inputCls = (hasErr?: boolean) => `sa-input${hasErr ? ' sa-input--error' : ''}`;

export function SuperadminSetupWizardStep2({ onNext }: { onNext: (d: ShiftsData) => void }) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<ShiftsData>({
    resolver: zodResolver(shiftsSchema),
    defaultValues: { shifts: d.shifts },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'shifts' });

  return (
    <form id="step2-form" onSubmit={handleSubmit(onNext)} noValidate className="space-y-3">
      {fields.map((field, i) => (
        <div key={field.id} className="sa-wizard-row sa-wizard-row--shifts">
          <div className="space-y-1.5">
            <label className="sa-wizard-field-label--sm">Shift Name</label>
            <input {...register(`shifts.${i}.name`)} placeholder="e.g. Morning"
              className={inputCls(!!(errors.shifts?.[i]?.name))} />
            {errors.shifts?.[i]?.name && (
              <p className="sa-wizard-field-error">{errors.shifts[i].name?.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="sa-wizard-field-label--sm">Start</label>
            <input type="time" {...register(`shifts.${i}.start`)}
              className={`${inputCls()} [color-scheme:dark]`} />
          </div>
          <div className="space-y-1.5">
            <label className="sa-wizard-field-label--sm">End</label>
            <input type="time" {...register(`shifts.${i}.end`)}
              className={`${inputCls()} [color-scheme:dark]`} />
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
        onClick={() => append({ name: '', start: '06:00', end: '12:00' })}
        className="sa-btn-dashed"
      >
        <Plus size={15} /> Add Another Shift
      </button>
    </form>
  );
}
