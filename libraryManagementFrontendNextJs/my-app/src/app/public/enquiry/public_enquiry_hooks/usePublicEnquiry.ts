import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { publicEnquirySchema, type PublicEnquiryFormData } from '../public_enquiry_types/PublicEnquiryValidation';

// RESPONSIBILITY: Handles form state and submission logic for public enquiry.
// DATA FLOW: UI Input -> usePublicEnquiry -> Simulate API -> Success State

export function usePublicEnquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [submittedPhone, setSubmittedPhone] = useState('');

  const formMethods = useForm<PublicEnquiryFormData>({
    resolver: zodResolver(publicEnquirySchema),
    defaultValues: { name: '', phone: '+91 ', shift: '', message: '' },
  });

  const onSubmit = async (data: PublicEnquiryFormData) => {
    // Simulate API call for now
    await new Promise(res => setTimeout(res, 1200));
    setSubmittedName(data.name);
    setSubmittedPhone(data.phone);
    setSubmitted(true);
  };

  const resetForm = () => {
    formMethods.reset();
    setSubmitted(false);
    setSubmittedName('');
    setSubmittedPhone('');
  };

  return {
    submitted,
    submittedName,
    submittedPhone,
    formMethods,
    onSubmit: formMethods.handleSubmit(onSubmit),
    resetForm,
  };
}
