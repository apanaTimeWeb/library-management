'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Save, PhoneCall } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { addEnquirySchema, type AddEnquiryFormData } from '@/app/superadmin/superadmin_crm/superadmin_crm_shared_components/schema';
import { CRM_CONSTANTS as data } from '@/app/superadmin/superadmin_crm/crm_constants';

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

    toast.success('Lead saved successfully!', { className: 'crm-toast crm-toast--success' });
    setTimeout(() => router.push('/superadmin/superadmin_crm/enquiries'), 600);
  };

  const handleClose = () => router.push('/superadmin/superadmin_crm/enquiries');

  return (
    <>
      <Toaster position="bottom-right" />

      {/* ── Overlay ── */}
      <div
        className="crm-drawer-overlay"
        onClick={handleClose}
        aria-label="Close drawer"
      />

      {/* ── Drawer ── */}
      <aside className="crm-drawer" role="dialog" aria-label="New Enquiry" aria-modal="true">

        {/* Header */}
        <div className="crm-drawer-header">
          <div className="crm-drawer-header-left">
            <div className="crm-drawer-icon">
              <PhoneCall size={18} color="var(--text-primary)" />
            </div>
            <div>
              <h2 className="crm-drawer-title">New Enquiry</h2>
              <p className="crm-drawer-subtitle">Capture a new prospective student</p>
            </div>
          </div>
          <button
            className="crm-btn-icon"
            onClick={handleClose}
            title="Close"
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body — Form */}
        <form id="add-enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="crm-drawer-body">
            <div className="crm-form-stack">

              {/* ── Name ── */}
              <div className="crm-field">
                <label htmlFor="enq-name" className="crm-label crm-label--required">
                  Full Name
                </label>
                <input
                  id="enq-name"
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Aarav Sharma"
                  className={`crm-input${errors.name ? ' crm-input--error' : ''}`}
                  {...register('name')}
                />
                {errors.name && <p className="crm-error">{errors.name.message}</p>}
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="crm-drawer-footer">
            <button
              type="button"
              className="crm-btn-ghost crm-btn-flex-1"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-enquiry-form"
              className="crm-btn-primary crm-btn-flex-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="crm-spinner" />
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
