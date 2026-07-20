// RESPONSIBILITY: Renders or handles logic for useAuthSignup.ts.
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSignupSchema } from '@/app/auth/auth_utils/auth_validation';
import { AUTH_SIGNUP_PRESETS } from '@/app/auth/auth_constants';
import type { AuthSignupPayload } from '@/app/auth/auth_types/auth_types';
import { useAuthStore } from '@/app/auth/auth_store/auth_store';
import toast from 'react-hot-toast';

// DATA FLOW: UI Component → useAuthSignup.ts → useAuthStore → authApi
export function useAuthSignup() {
  const [shows, setShows] = useState({ pw: false, confirm: false });
  
  const { signup, fetchState, errorMessage, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthSignupPayload>({
    resolver: zodResolver(authSignupSchema),
    defaultValues: {
      name:            AUTH_SIGNUP_PRESETS.ownerName, // Reusing ownerName as name preset
      email:           AUTH_SIGNUP_PRESETS.email,
      phone:           AUTH_SIGNUP_PRESETS.phone,
      roleName:        'superadmin',
      tenantId:        '',
      branchId:        '',
      password:        '',
      confirmPassword: '',
    },
  });

  const password        = watch('password');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = async (data: AuthSignupPayload) => {
    clearError();
    const res = await signup(data);

    if (res.success) {
      toast.success(res.message || 'Account created successfully');
      window.location.href = '/superadmin/superadmin_setup-wizard';
    }
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

