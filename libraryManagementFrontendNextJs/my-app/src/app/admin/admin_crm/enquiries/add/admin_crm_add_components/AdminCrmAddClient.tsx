// RESPONSIBILITY: Entry page for the admin_crm module.
'use client';
// DATA FLOW: Next.js Router -> Page -> Components

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Save, PhoneCall } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { addEnquirySchema, type AddEnquiryFormData } from '@/app/admin/admin_crm/admin_crm_components/AdminCrmschema/AdminCrmschema';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface AdminCrmAddClientProps { onClose?: () => void; }
export function AdminCrmAddClient({ onClose }: AdminCrmAddClientProps = {}) {
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
    toast.success('Lead saved successfully!');
    setTimeout(() => { if (onClose) { onClose(); } else { router.push('/admin/admin_crm/enquiries'); } }, 600);
  };

  const handleClose = () => { if (onClose) { onClose(); } else { router.push('/admin/admin_crm/enquiries'); } };

  return (
    <>
      <Toaster position="bottom-right" />

      {/* ── Overlay ── */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={handleClose}
        aria-label="Close drawer"
      />

      {/* ── Drawer ── */}
      <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-bg-card border-l border-border shadow-xl sm:max-w-sm flex flex-col animate-in slide-in-from-right duration-300" role="dialog" aria-label="New Enquiry" aria-modal="true">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/20">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <PhoneCall size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">New Enquiry</h2>
              <p className="text-sm text-muted-foreground">Capture a new prospective student</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted"
            title="Close"
            aria-label="Close drawer"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Body — Form */}
        <form id="add-enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* ── Name ── */}
            <div className="space-y-2">
              <label htmlFor="enq-name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Full Name <span className="text-danger">*</span>
              </label>
              <Input
                id="enq-name"
                type="text"
                autoComplete="off"
                placeholder="e.g. Aarav Sharma"
                className={errors.name ? 'border-danger focus-visible:ring-danger' : ''}
                {...register('name')}
              />
              {errors.name && <p className="text-xs text-danger font-medium mt-1">{errors.name.message}</p>}
            </div>

            {/* In a real scenario, more fields would go here */}

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/20 flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="add-enquiry-form"
              className=" gap-2" style={{ flex: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Lead
                </>
              )}
            </Button>
          </div>
        </form>
      </aside>
    </>
  );
}
