import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authForgotPasswordSchema } from '../../auth_utils/auth_validation';
import type { AuthForgotPasswordPayload } from '../../auth_types/auth_types';

export function useAuthForgotPassword() {
  const [sent, setSent] = useState(false);
  const [sentTo, setSentTo] = useState('');
  
  // Note: Replace this with actual authApi.forgotPassword later when implemented
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForgotPasswordPayload>({
    resolver: zodResolver(authForgotPasswordSchema),
    defaultValues: { identity: '' },
  });

  const onSubmit = async (data: AuthForgotPasswordPayload) => {
    setIsSubmitting(true);
    // Stub api call
    await new Promise(res => setTimeout(res, 1100));
    setSentTo(data.identity);
    setSent(true);
    setIsSubmitting(false);
  };

  return {
    sent,
    sentTo,
    isSubmitting,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
}
