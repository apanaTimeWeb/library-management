'use client';
// RESPONSIBILITY: Renders the SuperadminSetupWizardStep3 component.
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { seatsSchema, type SeatsData } from '@/app/superadmin/superadmin_shared_components/Superadminsuperadmin_schema';
import { SETUP_WIZARD_DATA as d } from '@/app/superadmin/superadmin_setup-wizard/Superadminsuperadmin_setupWizard_constants';

const inputCls = (hasErr?: boolean) => `w-full bg-bg-pageg-input border rounded-lg px-3.5 py-2.5 text-base text-text-primary focus:outline-none focus:ring-2 transition-all placeholder:text-text-tertiary ${hasErr ? 'border-danger focus:ring-danger/20 focus:border-danger' : 'border-border focus:ring-primary/20 focus:border-primary'}`;

import type { SuperadminSetupWizardStep3Props as Props } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setup_wizard_types/SuperadminSetupWizardTypes';

export function SuperadminSetupWizardStep3({ onNext }: Props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SeatsData>({
    resolver: zodResolver(seatsSchema),
    defaultValues: { count: d.seatCount, prefix: d.seatPrefix },
  });
  const count  = watch('count')  || 0;
  const prefix = watch('prefix') || '';

  const preview =
    Array.from({ length: Math.min(count, 5) }, (_, i) =>
      `${prefix}${String(i + 1).padStart(2, '0')}`
    ).join(', ') + (count > 5 ? ` ... ${prefix}${String(count).padStart(2, '0')}` : '');

  const seatCellClass = (i: number) => {
    const base = 'w-12 h-12 flex items-center justify-center rounded-lg text-xs font-bold font-mono transition-colors border';
    if (i === 0) return `${base} bg-danger-bg border-danger text-danger`;
    if (i === 1) return `${base} bg-warning-bg border-warning text-warning`;
    return `${base} bg-bg-pageg-elevated border-border text-text-secondary`;
  };

  return (
    <form id="step3-form" onSubmit={handleSubmit(onNext)} noValidate className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 block">
            Total Seats <span className="text-danger ml-1">*</span>
          </label>
          <input type="number" min={1}
            {...register('count', { valueAsNumber: true })}
            className={inputCls(!!errors.count)} />
          {errors.count && <p className="text-xs text-danger mt-1.5">{errors.count.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 block">
            Seat Prefix <span className="text-text-tertiary font-normal text-xs ml-1 lowercase">(max 3)</span>
          </label>
          <input maxLength={3} {...register('prefix')} placeholder="e.g. SL-"
            className={inputCls(!!errors.prefix)} />
          {errors.prefix && <p className="text-xs text-danger mt-1.5">{errors.prefix.message}</p>}
        </div>
      </div>

      <div className="bg-info-bg/30 border border-info/20 rounded-xl p-5">
        <p className="text-sm font-semibold text-info mb-1.5">💡 Seats will be generated as:</p>
        <p className="text-base font-mono text-text-primary tracking-wide mb-1">
          {prefix ? preview : '(enter prefix to preview)'}
        </p>
        <p className="text-xs text-text-secondary font-medium">
          {count} seat{count !== 1 ? 's' : ''} total
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Sample grid preview:</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: Math.min(count, 20) }, (_, i) => (
            <div key={i} className={seatCellClass(i)}>
              {prefix}{String(i + 1).padStart(2, '0')}
            </div>
          ))}
          {count > 20 && (
            <div className="w-12 h-12 flex items-center justify-center rounded-lg text-xs font-bold font-mono transition-colors border bg-bg-pageg-input border-dashed border-border text-text-tertiary">
              +{count - 20}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
