import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSignupSchema } from '../../auth_utils/auth_validation';
import { authApi } from '../../auth_api/auth_api';
import { AUTH_SIGNUP_PRESETS } from '../../auth_constants';
import type { AuthSignupPayload, FetchState } from '../../auth_types/auth_types';

export function useAuthSignup() {
  const [shows, setShows] = useState({ pw: false, confirm: false });
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthSignupPayload>({
    resolver: zodResolver(authSignupSchema),
    defaultValues: {
      ownerName:       AUTH_SIGNUP_PRESETS.ownerName,
      libraryName:     AUTH_SIGNUP_PRESETS.libraryName,
      email:           AUTH_SIGNUP_PRESETS.email,
      phone:           AUTH_SIGNUP_PRESETS.phone,
      password:        '',
      confirmPassword: '',
    },
  });

  const password        = watch('password');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = async (data: AuthSignupPayload) => {
    setFetchState('loading');
    setErrorMessage(null);
    
    const response = await authApi.signup(data);
    
    if (!response.success) {
      setFetchState('error');
      setErrorMessage(response.message);
      return;
    }

    setFetchState('success');
    window.location.href = '/superadmin/superadmin_setup-wizard';
  };

  return {
    shows,
    setShows,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    password,
    confirmPassword,
    fetchState,
    errorMessage
  };
}
