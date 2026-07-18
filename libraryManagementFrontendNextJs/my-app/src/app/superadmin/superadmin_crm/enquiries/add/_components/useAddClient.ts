/**
 * RESPONSIBILITY: Logic and state management for Enquiries add form.
 */
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { addEnquirySchema, type AddEnquiryFormData } from '@/app/superadmin/superadmin_crm/superadmin_crm_shared_components/superadmin_schema';

export function useAddClient() {
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
    setTimeout(() => router.push('/superadmin/superadmin_crm/enquiries'), 600);
  };

  const handleClose = () => router.push('/superadmin/superadmin_crm/enquiries');

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    handleClose,
  };
}
