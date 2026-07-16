import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authLoginSchema } from '../../auth_utils/auth_validation';
import { authApi } from '../../auth_api/auth_api';
import { AUTH_ROLES, AUTH_ROLE_DEST_LABEL } from '../../auth_constants';
import type { AuthLoginPayload, FetchState } from '../../auth_types/auth_types';

export function useAuthLogin() {
  const [showPw, setShowPw] = useState(false);
  const [selectedRole, setSelectedRole] = useState(AUTH_ROLES[0]);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AuthLoginPayload>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: { email: '', password: '', role: 'superadmin' },
  });

  const handleRoleSelect = (role: typeof AUTH_ROLES[0]) => {
    setSelectedRole(role);
    setValue('email', '', { shouldValidate: false });
    setValue('password', '', { shouldValidate: false });
    setValue('role', role.id as AuthLoginPayload['role']);
    setErrorMessage(null);
  };

  const getRedirectUrl = (role: typeof AUTH_ROLES[0]): string => {
    if (role.id === 'superadmin' && !role.setupComplete) return '/superadmin/superadmin_setup-wizard';
    return role.redirectTo;
  };

  const onSubmit = async (data: AuthLoginPayload) => {
    setFetchState('loading');
    setErrorMessage(null);
    
    const response = await authApi.login(data.email, data.password);
    
    if (!response.success) {
      setFetchState('error');
      setErrorMessage(response.message);
      return;
    }

    setFetchState('success');
    const userRole = response.data?.user?.role || data.role;
    const roleConfig = AUTH_ROLES.find(r => r.id === userRole);
    window.location.href = roleConfig ? getRedirectUrl(roleConfig) : `/${userRole}/dashboard`;
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
