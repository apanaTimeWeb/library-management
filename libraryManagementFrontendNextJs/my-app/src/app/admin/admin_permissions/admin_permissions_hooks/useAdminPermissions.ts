// RESPONSIBILITY: Renders the useAdminPermissions.ts component/hook.
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Permission, Role } from "./useAdminPermissions_types";

export const ROLES: Role[] = ['Manager'];

// DATA FLOW: API → useAdminPermissions.ts → AdminPermissionsComponent
export function useAdminPermissions(initialPermissions: Permission[]) {
  const [perms, setPerms] = useState<Permission[]>(initialPermissions);

  function toggle(moduleIdx: number, actionIdx: number, role: Role) {
    setPerms(prev => {
      return prev.map((m, mi) => mi !== moduleIdx ? m : {
        ...m,
        actions: m.actions.map((a, ai) => ai !== actionIdx ? a : {
          ...a,
          roles: { ...a.roles, [role]: !a.roles[role] },
        }),
      });
    });
  }

  function handleSave() {
    // In a real app, send `perms` to the backend
    toast.success('Permissions saved successfully.', { duration: 3000 });
  }

  return {
    perms,
    toggle,
    handleSave,
    roles: ROLES
  };
}

