import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authLoginSchema } from '@/app/auth/auth_utils/auth_validation';
import { AUTH_ROLES, AUTH_ROLE_DEST_LABEL } from '@/app/auth/auth_constants';
import type { AuthLoginPayload } from '@/app/auth/auth_types/auth_types';
import { useAuthStore } from '@/app/auth/auth_store/auth_store';

// DATA FLOW: UI Component → useAuthLogin.ts → useAuthStore → authApi
export function useAuthLogin() {
  const [showPw, setShowPw] = useState(false);
  const [selectedRole, setSelectedRole] = useState(AUTH_ROLES[0]);
  
  const { login, fetchState, errorMessage, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AuthLoginPayload>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: { phone: '3333333333', password: 'password123' },
  });

  const handleRoleSelect = (role: typeof AUTH_ROLES[0]) => {
    setSelectedRole(role);
    const phoneMap: Record<string, string> = {
      'superadmin': '3333333333',
      'admin': '1111111111',
      'manager': '2222222222'
    };
    setValue('phone', phoneMap[role.id] || '9876543210', { shouldValidate: false });
    setValue('password', 'password123', { shouldValidate: false });
    clearError();
  };

  const getRedirectUrl = (role: typeof AUTH_ROLES[0]): string => {
    if (role.id === 'superadmin' && !role.setupComplete) return '/superadmin/superadmin_setup-wizard';
    return role.redirectTo;
  };

  const onSubmit = async (data: AuthLoginPayload) => {
    const res = await login(data);

    if (res.success) {
      // Use selectedRole.id from the UI, as the mock backend always returns 'superadmin'
      const userRole = selectedRole.id;
      const roleConfig = AUTH_ROLES.find(r => r.id === userRole);
      window.location.href = roleConfig ? getRedirectUrl(roleConfig) : `/${userRole}/dashboard`;
    }
  };

  return {
    showPw,
    setShowPw,
    selectedRole,
    handleRoleSelect,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    fetchState,
    errorMessage,
    roles: AUTH_ROLES,
    roleDestLabel: AUTH_ROLE_DEST_LABEL
  };
}
