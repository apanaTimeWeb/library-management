// RESPONSIBILITY: Renders the AddClient component.
'use client';

import { X, Save, PhoneCall, Loader2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useAddClient } from './useAddClient';

export function AddClient() {
  const { register, handleSubmit, errors, isSubmitting, onSubmit, handleClose } = useAddClient();

  return (
    <>
      <Toaster position="bottom-right" />

      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in cursor-pointer" onClick={handleClose} aria-label="Close drawer" />

      {/* Drawer */}
      <aside className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-300" role="dialog" aria-label="New Enquiry" aria-modal="true">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <PhoneCall size={18} />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-text-primary leading-tight">New Enquiry</h2>
              <p className="text-[12px] font-medium text-text-secondary mt-0.5">Capture a new prospective student</p>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:bg-input hover:text-text-primary transition-colors cursor-pointer" onClick={handleClose} title="Close" aria-label="Close drawer">
            <X size={18} />
          </button>
        </div>

        {/* Body — Form */}
        <form id="add-enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="enq-name" className="text-[12px] font-bold text-text-secondary block mb-1">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  id="enq-name"
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Aarav Sharma"
                  className={`w-full bg-input border ${errors.name ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'} rounded-[var(--radius-md)] py-2.5 px-3 text-[14px] font-medium text-text-primary focus:outline-none transition-colors h-10`}
                  {...register('name')}
                />
                {errors.name && <p className="text-[12px] font-bold text-danger mt-1">{errors.name.message}</p>}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-muted border-t border-border flex gap-3">
            <button type="button" className="flex-1 px-4 py-2 border border-border text-text-primary text-[14px] font-bold rounded-[var(--radius-md)] hover:bg-input transition-colors cursor-pointer" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" form="add-enquiry-form" className="flex-[2] flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-[14px] font-bold rounded-[var(--radius-md)] hover:brightness-95 transition-all disabled:opacity-50 cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 size={16} className="animate-spin" /> Saving…</>
              ) : (
                <><Save size={16} /> Save Lead</>
              )}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
