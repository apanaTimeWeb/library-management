// RESPONSIBILITY: Renders the admin permissions matrix.
'use client';

import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useAdminPermissions, type Permission } from '@/app/admin/admin_permissions/admin_permissions_hooks/useAdminPermissions';

interface AdminPermissionsViewProps {
  initialPermissions: Permission[];
}

export function AdminPermissionsView({ initialPermissions }: AdminPermissionsViewProps) {
  const { perms, toggle, handleSave, roles } = useAdminPermissions(initialPermissions);

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            fontSize: 13,
          },
        }}
      />

      <div style={{ paddingBottom: 40 }}>
        {/* Page Header */}
        <div className="admin-page-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 24 }}>
          <div>
            <p className="admin-breadcrumb">Smart Library 360 › Admin › Permissions</p>
            <h1 className="admin-page-title">Role Permissions</h1>
            <p className="admin-page-subtitle">Configure what Managers are allowed to do across branches.</p>
          </div>
          <div className="admin-page-actions">
            <button className="admin-btn-primary" onClick={handleSave}>
              <CheckCircle size={16} /> Save Changes
            </button>
          </div>
        </div>

        {/* Permissions Card */}
        <div className="admin-card" style={{ maxWidth: 700, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-perm-table">
              <thead>
                <tr>
                  <th className="admin-perm-th" style={{ width: 300 }}>Permission Module &amp; Action</th>
                  {roles.map(role => (
                    <th key={role} className="admin-perm-th" style={{ textAlign: 'right', paddingRight: 32 }}>
                      <span className="admin-badge admin-badge-primary">{role}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {perms.map((module, mIdx) => (
                  <React.Fragment key={`module-${module.module}`}>
                    {/* Module header row */}
                    <tr style={{ background: 'var(--bg-card)' }}>
                      <td colSpan={roles.length + 1} className="admin-perm-td" style={{ borderBottom: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Shield size={15} style={{ color: 'var(--success)' }} />
                          <span className="admin-perm-module">{module.module}</span>
                        </div>
                      </td>
                    </tr>
                    {/* Action rows */}
                    {module.actions.map((action, aIdx) => (
                      <tr key={action.key} className="admin-perm-row">
                        <td className="admin-perm-td" style={{ paddingLeft: 36, color: 'var(--text-secondary)', fontSize: 13, borderRight: '1px solid var(--border)' }}>
                          {action.label}
                        </td>
                        {roles.map(role => (
                          <td key={role} className="admin-perm-td" style={{ textAlign: 'right', paddingRight: 32 }}>
                            <button
                              onClick={() => toggle(mIdx, aIdx, role)}
                              className={`admin-perm-toggle ${action.roles[role] ? 'admin-perm-toggle-on' : 'admin-perm-toggle-off'}`}
                              aria-label={action.roles[role] ? 'Disable' : 'Enable'}
                            >
                              <span className="admin-perm-toggle-thumb" />
                            </button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

