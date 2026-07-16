import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authForgotPasswordSchema } from '@/app/auth/auth_utils/auth_validation';
import type { AuthForgotPasswordPayload, FetchState } from '@/app/auth/auth_types/auth_types';
import { authApi } from '@/app/auth/auth_api/auth_api';

export function useAuthForgotPassword() {
  const [sent, setSent] = useState(false);
  const [sentTo, setSentTo] = useState('');
  
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForgotPasswordPayload>({
    resolver: zodResolver(authForgotPasswordSchema),
    defaultValues: { identity: '' },
  });

  const onSubmit = async (data: AuthForgotPasswordPayload) => {
    setFetchState('loading');
    setErrorMessage(null);
    
    const response = await authApi.forgotPassword({ identity: data.identity });
    
    if (!response.success) {
      setFetchState('error');
      setErrorMessage(response.message);
      return;
    }

    setSentTo(data.identity);
    setSent(true);
    setFetchState('success');
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
