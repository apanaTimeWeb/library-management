'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { seatsSchema, type SeatsData } from '@/app/superadmin/superadmin_shared_components/superadmin_schema';
import { SETUP_WIZARD_DATA as d } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setupWizard_constants';

const inputCls = (hasErr?: boolean) => `sa-input${hasErr ? ' sa-input--error' : ''}`;

export function SuperadminSetupWizardStep3({ onNext }: { onNext: (d: SeatsData) => void }) {
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
    if (i === 0) return 'sa-wizard-seat-cell sa-wizard-seat-cell--occupied';
    if (i === 1) return 'sa-wizard-seat-cell sa-wizard-seat-cell--expiring';
    return 'sa-wizard-seat-cell sa-wizard-seat-cell--free';
  };

  return (
    <form id="step3-form" onSubmit={handleSubmit(onNext)} noValidate className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="sa-wizard-field-label">
            Total Seats <span className="sa-wizard-field-required">*</span>
          </label>
          <input type="number" min={1}
            {...register('count', { valueAsNumber: true })}
            className={inputCls(!!errors.count)} />
          {errors.count && <p className="sa-wizard-field-error">{errors.count.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="sa-wizard-field-label">
            Seat Prefix <span className="sa-wizard-field-optional">(max 3)</span>
          </label>
          <input maxLength={3} {...register('prefix')} placeholder="e.g. SL-"
            className={inputCls(!!errors.prefix)} />
          {errors.prefix && <p className="sa-wizard-field-error">{errors.prefix.message}</p>}
        </div>
      </div>

      <div className="sa-wizard-preview-card">
        <p className="sa-wizard-preview-label">💡 Seats will be generated as:</p>
        <p className="sa-wizard-seat-preview-text">
          {prefix ? preview : '(enter prefix to preview)'}
        </p>
        <p className="sa-wizard-seat-preview-sub">
          {count} seat{count !== 1 ? 's' : ''} total
        </p>
      </div>

      <div>
        <p className="sa-wizard-seat-grid-label">Sample grid preview:</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: Math.min(count, 20) }, (_, i) => (
            <div key={i} className={seatCellClass(i)}>
              {prefix}{String(i + 1).padStart(2, '0')}
            </div>
          ))}
          {count > 20 && (
            <div className="sa-wizard-seat-cell sa-wizard-seat-cell--more">
              +{count - 20}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
