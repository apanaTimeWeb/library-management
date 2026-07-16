'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Save, PhoneCall } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { addEnquirySchema, type AddEnquiryFormData } from '@/app/manager/manager_crm/manager_crm_shared_components/manager_crm_schema';
import data from '@/app/manager/manager_crm/manager_crm_shared_components/hardcoded.json';
import { MANAGER_CRM_URLS } from '@/app/manager/manager_crm/manager_crm_url_config';

// RESPONSIBILITY: Renders the Add Enquiry drawer.

export default function AddEnquiryPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddEnquiryFormData>({
    resolver: zodResolver(addEnquirySchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (formData: AddEnquiryFormData) => {
    await new Promise((r) => setTimeout(r, 800));
    // Handle form submission
    toast.success('Lead saved successfully!', { className: 'crm-toast crm-toast--success' });
    setTimeout(() => router.push(MANAGER_CRM_URLS.ENQUIRIES), 600);
  };

  const handleClose = () => router.push(MANAGER_CRM_URLS.ENQUIRIES);

  return (
    <>
      <Toaster position="bottom-right" />

      {/* ── Overlay ── */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
        onClick={handleClose}
        aria-label="Close drawer"
      />

      {/* ── Drawer ── */}
      <aside className="fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-bg-drawer border-l border-border z-[101] flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 shadow-2xl" role="dialog" aria-label="New Enquiry" aria-modal="true">

        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple flex items-center justify-center shadow-lg shadow-primary/30 shrink-0">
              <PhoneCall size={18} color="var(--text-primary)" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-text-primary m-0">New Enquiry</h2>
              <p className="text-xs text-text-secondary mt-0.5 mb-0">Capture a new prospective student</p>
            </div>
          </div>
          <button
            className="p-1.5 text-text-secondary hover:text-primary transition-colors rounded-md hover:bg-primary/10 shrink-0"
            onClick={handleClose}
            title="Close"
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body — Form */}
        <form id="add-enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            <div className="flex flex-col gap-5">

              {/* ── Name ── */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="enq-name" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1 after:content-['*'] after:text-danger after:ml-1">
                  Full Name
                </label>
                <input
                  id="enq-name"
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Aarav Sharma"
                  className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-bg-input text-text-primary border outline-none transition-all placeholder:text-text-secondary focus:ring-4 ${errors.name ? 'border-danger focus:ring-danger/15' : 'border-border focus:border-primary focus:ring-primary/15'}`}
                  {...register('name')}
                />
                {errors.name && <p className="text-xs text-danger mt-1 mb-0">{errors.name.message}</p>}
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-border flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-transparent text-text-primary border border-border hover:bg-border/40 hover:border-text-secondary transition-all"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-enquiry-form"
              className="flex-[2] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white hover:brightness-110 active:scale-95 transition-all disabled:opacity-55 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  Saving…
                </>
              ) : (
                <>
                  <Save size={15} />
                  Save Lead
                </>
              )}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
