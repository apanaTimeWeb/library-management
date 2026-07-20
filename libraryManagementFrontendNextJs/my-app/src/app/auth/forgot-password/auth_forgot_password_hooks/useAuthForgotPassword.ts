// RESPONSIBILITY: Renders or handles logic for useAuthForgotPassword.ts.
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authForgotPasswordSchema } from '@/app/auth/auth_utils/auth_validation';
import type { AuthForgotPasswordPayload } from '@/app/auth/auth_types/auth_types';
import { useAuthStore } from '@/app/auth/auth_store/auth_store';

// DATA FLOW: UI Component → useAuthForgotPassword.ts → useAuthStore → authApi
export function useAuthForgotPassword() {
  const [sent, setSent] = useState(false);
  const [sentTo, setSentTo] = useState('');
  
  const { forgotPassword, fetchState, errorMessage, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForgotPasswordPayload>({
    resolver: zodResolver(authForgotPasswordSchema),
    defaultValues: { phone: '' },
  });

  const onSubmit = async (data: AuthForgotPasswordPayload) => {
    clearError();
    const res = await forgotPassword(data);
    
    if (res.success) {
      setSentTo(data.phone);
      setSent(true);
    }
  };

  return {
    sent,
    sentTo,
    fetchState,
    errorMessage,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
}

