// RESPONSIBILITY: Centralized Role-Based Access Control (RBAC) hook for the admin module.
import { useMemo } from 'react';

// Mock current role for demonstration. In reality, this comes from an AuthContext or token.
type AdminRole = 'Superadmin' | 'Admin' | 'Manager';

export function usePermissions() {
  const currentRole = 'Admin' as AdminRole; // Mocked
  
  return useMemo(() => ({
    role: currentRole,
    canDelete: currentRole === 'Superadmin',
    canEdit: currentRole === 'Superadmin' || currentRole === 'Admin',
    canViewFinancials: currentRole === 'Superadmin' || currentRole === 'Admin',
    canManageUsers: currentRole === 'Superadmin',
  }), [currentRole]);
}
