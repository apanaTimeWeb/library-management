/**
 * RESPONSIBILITY: Logic and state management for Enquiries add form.
 */
import { useRouter } from 'next/navigation';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/SuperadminUrlConfig';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { addEnquirySchema, type AddEnquiryFormData } from '@/app/superadmin/superadmin_crm/superadmin_crm_shared_components/SuperadminSchema';

export function useSuperadminAddClient() {
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

    toast.success('Lead saved successfully!');
    setTimeout(() => router.push(SUPERADMIN_ROUTES.CRM_ENQUIRIES), 600);
  };

  const handleClose = () => router.push(SUPERADMIN_ROUTES.CRM_ENQUIRIES);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    handleClose,
  };
}
