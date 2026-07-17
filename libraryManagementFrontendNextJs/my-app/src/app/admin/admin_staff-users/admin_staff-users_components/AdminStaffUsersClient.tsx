'use client';

import { UserPlus, Pencil, Trash2, CheckCircle, Search, Users, X } from 'lucide-react';
import { useAdminStaff, type StaffMember } from '@/app/admin/admin_staff-users/admin_staff-users_hooks/useAdminStaff';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface AdminStaffUsersClientProps {
  initialStaff: StaffMember[];
}

export function AdminStaffUsersClient({ initialStaff }: AdminStaffUsersClientProps) {
  const {
    staff,
    filtered,
    stats,
    search,
    setSearch,
    showForm,
    setShowForm,
    editId,
    deleteId,
    setDeleteId,
    form,
    errors,
    openAdd,
    openEdit,
    handleSave,
    handleDelete,
    handleFieldChange
  } = useAdminStaff(initialStaff);

  const getRoleBadgeClass = (role: string) => {
    if (role === 'Admin')   return 'bg-info/10 text-info hover:bg-info/20';
    if (role === 'Manager') return 'bg-info/10 text-info hover:bg-info/20';
    return 'bg-success/10 text-success hover:bg-success/20';
  };

  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Smart Library 360 › Admin › Staff & Users</p>
          <h1 className="text-2xl font-bold tracking-tight">Staff & Users</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage staff accounts and their branch assignments.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={openAdd} variant="default" className="flex items-center gap-2">
            <UserPlus size={16} /> Add Staff
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="p-4 flex items-center gap-4 shadow-none border-border bg-card">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" 
              style={{ backgroundColor: `color-mix(in srgb, ${s.color} 12%, transparent)` }}
            >
              <Users size={18} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">{s.label}</p>
              <p className="text-2xl font-bold text-primary leading-none">{s.count}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9 h-10"
          placeholder="Search by name, email or role…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Tailwind Native Table */}
      <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col">
        <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-y text-muted-foreground text-xs font-medium uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Branch</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((staff) => (
                <tr 
                  key={staff.id} 
                  className="hover:bg-muted/10 transition-colors group"
                >
                  <td className="px-4 py-4 font-bold text-sm text-primary">
                    {staff.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {staff.email}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium">
                    {staff.phone}
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant="secondary" className={`${getRoleBadgeClass(staff.role)} border-none tracking-wide font-bold`}>
                      {staff.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium">
                    {staff.branch}
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {staff.joinedDate}
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant="secondary" className={`${staff.status === 'Active' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'} border-none uppercase tracking-wide font-bold`}>
                      {staff.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEdit(staff)} title="Edit">
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-danger" onClick={() => setDeleteId(staff.id)} title="Delete">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                    No staff found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <Card className="w-full max-w-lg shadow-lg border-border bg-card p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">{editId ? 'Edit Staff Member' : 'Add Staff Member'}</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setShowForm(false)}>
                <X size={16} />
              </Button>
            </div>
            
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name <span className="text-danger">*</span></label>
                  <Input className={`${errors.firstName ? 'border-danger' : ''}`} value={form.firstName} onChange={handleFieldChange('firstName')} placeholder="First name" />
                  {errors.firstName && <p className="text-xs text-danger font-medium">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name <span className="text-danger">*</span></label>
                  <Input className={`${errors.lastName ? 'border-danger' : ''}`} value={form.lastName} onChange={handleFieldChange('lastName')} placeholder="Last name" />
                  {errors.lastName && <p className="text-xs text-danger font-medium">{errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email <span className="text-danger">*</span></label>
                <Input type="email" className={`${errors.email ? 'border-danger' : ''}`} value={form.email} onChange={handleFieldChange('email')} placeholder="email@library.com" />
                {errors.email && <p className="text-xs text-danger font-medium">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone <span className="text-danger">*</span></label>
                <Input className={`${errors.phone ? 'border-danger' : ''}`} value={form.phone} onChange={handleFieldChange('phone')} placeholder="9876543210" />
                {errors.phone && <p className="text-xs text-danger font-medium">{errors.phone}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <select 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={form.roleId} 
                    onChange={handleFieldChange('roleId')}
                  >
                    <option value="role-admin-id">Admin</option>
                    <option value="role-manager-id">Manager</option>
                    <option value="role-staff-id">Staff</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Branch</label>
                  <select 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={form.branchId} 
                    onChange={handleFieldChange('branchId')}
                  >
                    <option value="main-branch-id">Main Branch</option>
                    <option value="branch-2-id">Branch 2</option>
                    <option value="kothrud-center-id">Kothrud Center</option>
                    <option value="nashik-branch-id">Nashik Branch</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button variant="default" onClick={handleSave} className="gap-2">
                <CheckCircle size={16} /> {editId ? 'Save Changes' : 'Add Staff'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <Card className="w-full max-w-sm shadow-lg border-danger/20 bg-card p-6 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold flex items-center gap-2 text-danger">
              <Trash2 size={20} /> Remove Staff Member
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to remove <strong className="text-primary">{staff.find(s => s.id === deleteId)?.name}</strong>? Their account will be deactivated and they will lose access.
            </p>
            <div className="flex items-center justify-end gap-3 pt-4 border-t mt-2">
              <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Remove Staff</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
