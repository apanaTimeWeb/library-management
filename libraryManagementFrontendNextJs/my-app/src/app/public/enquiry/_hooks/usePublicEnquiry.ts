import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { publicEnquirySchema, type PublicEnquiryFormData } from '@/app/public/enquiry/_types/PublicEnquiryValidation';
import { usePublicStore } from '@/app/public/_store/public_store';

// RESPONSIBILITY: Handles form state and submission logic for public enquiry.
// DATA FLOW: UI Input -> usePublicEnquiry -> usePublicStore -> publicApi

export function usePublicEnquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const { submitEnquiry, clearError } = usePublicStore();

  const formMethods = useForm<PublicEnquiryFormData>({
    resolver: zodResolver(publicEnquirySchema),
    defaultValues: { name: '' },
  });

  const onSubmit = async (data: PublicEnquiryFormData) => {
    clearError();
    const res = await submitEnquiry(data);
    
    if (res.success) {
      setSubmittedName(data.name);
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    formMethods.reset();
    setSubmitted(false);
    setSubmittedName('');
  };

  return {
    submitted,
    submittedName,
    formMethods,
    onSubmit: formMethods.handleSubmit(onSubmit),
    resetForm,
  };
}
