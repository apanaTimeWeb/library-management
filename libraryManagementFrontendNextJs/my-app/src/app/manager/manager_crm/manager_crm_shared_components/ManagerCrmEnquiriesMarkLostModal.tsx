'use client';
// RESPONSIBILITY: Renders the ManagerCrmEnquiriesMarkLostModal.tsx component/page.
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, XCircle } from 'lucide-react';
import { type MarkLostModalProps } from '@/app/manager/manager_crm/manager_crm_types';
import { markLostSchema, type MarkLostFormData } from '@/app/manager/manager_crm/manager_crm_shared_components/manager_crm_schema';

export function MarkLostModal({ onConfirm, onCancel, isSubmitting }: MarkLostModalProps) {
  const { register, handleSubmit } = useForm<MarkLostFormData>({
    resolver: zodResolver(markLostSchema),
    defaultValues: { reason: '' },
  });
  const onSubmit = (d: MarkLostFormData) => onConfirm(d.reason ?? '');

  return (
    <div className="fixed inset-0 bg-bg-pagelack/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95">
        <div className="p-5 border-b border-border flex items-center gap-3">
          <div className="bg-danger/10 text-danger p-2 rounded-full shrink-0">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Mark as Lost?</h3>
            <p className="text-sm text-text-secondary">This will move the enquiry to the Lost column.</p>
          </div>
        </div>
        <form id="mark-lost-form" onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lost-reason" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Reason <span className="lowercase font-normal opacity-70">(optional)</span>
            </label>
            <textarea
              id="lost-reason"
              rows={3}
              placeholder="e.g. Didn't respond..."
              className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-input text-text-primary border border-border outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15"
              {...register('reason')}
            />
          </div>
        </form>
        <div className="p-4 border-t border-border flex gap-3">
          <button type="button" onClick={onCancel} className="flex-1 py-2 text-sm font-medium border border-border rounded-lg hover:bg-card transition-colors">Cancel</button>
          <button type="submit" form="mark-lost-form" disabled={isSubmitting} className="flex-1 py-2 text-sm font-medium bg-danger text-white rounded-lg hover:bg-danger/90 transition-colors inline-flex justify-center items-center gap-2">
            {isSubmitting ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <><XCircle size={15} /> Mark as Lost</>}
          </button>
        </div>
      </div>
    </div>
  );
}


