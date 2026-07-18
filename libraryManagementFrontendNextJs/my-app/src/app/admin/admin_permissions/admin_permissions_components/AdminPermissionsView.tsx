'use client';
// RESPONSIBILITY: Renders the admin permissions matrix.
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Shield, CheckCircle , Search} from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useAdminPermissions, type Permission } from '@/app/admin/admin_permissions/admin_permissions_hooks/useAdminPermissions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TablePagination } from '@/components/ui/table-pagination';
import { AdminPermissionsViewProps } from "./AdminPermissionsView_types";
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

export function AdminPermissionsView({ initialPermissions }: AdminPermissionsViewProps) {

    const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { perms, toggle, handleSave, roles } = useAdminPermissions(initialPermissions);

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
            fontSize: 13,
          },
        }}
      />

      <div className="pb-10">
        {/* page Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4 mb-6">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Smart Library 360 › Admin › Permissions</p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Role Permissions</h1>
            <p className="text-sm text-muted-foreground mt-1">Configure what Managers are allowed to do across branches.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button onClick={handleSave} className="gap-2">
              <CheckCircle size={16} /> Save Changes
            </Button>
          </div>
        </div>

        {/* Permissions Card */}
        <Card className="max-w-4xl overflow-hidden bg-card border-border shadow-sm">
          <div className="overflow-x-auto">
            
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>


      <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground sticky top-0 z-10 border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-semibold uppercase text-xs tracking-wider w-72">Permission Module &amp; Action</th>
                  {roles.map(role => (
                    <th key={role} className="px-6 py-3 font-semibold text-right">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-xs">{role}</Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {perms.filter(row => JSON.stringify(row).toLowerCase().includes(searchTerm.toLowerCase())).slice((page - 1) * limit, page * limit).map((module, mIdx) => (
                  <React.Fragment key={`module-${module.module}`}>
                    {/* Module header row */}
                    <tr className="bg-muted/20">
                      <td colSpan={roles.length + 1} className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <Shield size={15} className="text-success" />
                          <span className="font-semibold text-foreground text-xs uppercase tracking-wider">{module.module}</span>
                        </div>
                      </td>
                    </tr>
                    {/* Action rows */}
                    {module.actions.map((action, aIdx) => (
                      <tr key={action.key} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-3 pl-10 text-muted-foreground font-medium text-sm border-r border-border/50">
                          {action.label}
                        </td>
                        {roles.map(role => (
                          <td key={role} className="px-6 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => toggle(mIdx, aIdx, role)}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page ${
                                action.roles[role] ? 'bg-success' : 'bg-muted'
                              }`}
                              aria-label={action.roles[role] ? 'Disable' : 'Enable'}
                            >
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-bg-card shadow-lg ring-0 transition-transform ${
                                  action.roles[role] ? 'translate-x-4' : 'translate-x-0'
                                }`}
                              />
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

          <TablePagination
            page={page}
            limit={limit}
            totalItems={perms.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      </div>
    </>
  );
}
