'use client';
import { useState } from 'react';
// RESPONSIBILITY: Renders the AdminBranchesView component.

import { Plus, Pencil, Trash2, CheckCircle, Search, AlertTriangle } from 'lucide-react';
import { useAdminBranches, type Branch } from '@/app/admin/admin_branches/admin_branches_hooks/useAdminBranches';
import AdminBranchesEmptyState from '@/app/admin/admin_branches/admin_branches_components/AdminBranchesEmptyState/AdminBranchesEmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { TablePagination } from '@/components/ui/table-pagination';
import { AdminBranchesViewProps } from "./AdminBranchesView_types";

export function AdminBranchesView({ initialBranches }: AdminBranchesViewProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    branches,
    filtered,
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
  } = useAdminBranches(initialBranches);

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* page Header */}
      <div className="border-b border-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Smart Library 360 <span className="opacity-50">›</span> Admin <span className="opacity-50">›</span> Branches
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Branch Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage multiple branches and their managers.</p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus size={16} /> Add Branch
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search by branch name, city or manager…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="flex-1 min-h-96 border border-border rounded-lg bg-card overflow-hidden flex flex-col shadow-sm">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-semibold">Branch Name</th>
                <th className="px-6 py-4 font-semibold">City</th>
                <th className="px-6 py-4 font-semibold">Manager</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold">Capacity</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.slice((page - 1) * limit, page * limit).map((branch) => (
                  <tr key={branch.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{branch.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{branch.city}</td>
                    <td className="px-6 py-4 text-muted-foreground">{branch.manager}</td>
                    <td className="px-6 py-4 font-mono text-muted-foreground">{branch.phone}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">{branch.students}</span>
                      <span className="text-muted-foreground"> / {branch.seats} Seats</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className={`border-none ${branch.status === 'Active' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                        {branch.status === 'Active' ? '✅ Active' : '🔴 Inactive'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(branch)}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(branch.id)}
                          className="h-8 w-8 text-danger hover:bg-danger/10 hover:text-danger"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12">
                    <AdminBranchesEmptyState title="No branches found" description={search ? "Try a different search term" : "Click 'Add Branch' to get started"} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          <TablePagination
            page={page}
            limit={limit}
            totalItems={filtered.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </div>

      {/* Add / Edit Modal */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Branch' : 'Add New Branch'}</DialogTitle>
            <DialogDescription>
              {editId ? 'Update the details of this branch.' : 'Enter the details for the new branch.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Branch Name <span className="text-danger">*</span></label>
              <Input
                value={form.name}
                onChange={handleFieldChange('name')}
                placeholder="e.g. Main Branch"
                className={errors.name ? 'border-danger focus-visible:ring-danger' : ''}
              />
              {errors.name && <p className="text-xs text-danger font-medium">{errors.name}</p>}
            </div>
            
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Address <span className="text-danger">*</span></label>
              <Input
                value={form.address}
                onChange={handleFieldChange('address')}
                placeholder="Full address"
                className={errors.address ? 'border-danger focus-visible:ring-danger' : ''}
              />
              {errors.address && <p className="text-xs text-danger font-medium">{errors.address}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">City <span className="text-danger">*</span></label>
              <Input
                value={form.city}
                onChange={handleFieldChange('city')}
                placeholder="Pune"
                className={errors.city ? 'border-danger focus-visible:ring-danger' : ''}
              />
              {errors.city && <p className="text-xs text-danger font-medium">{errors.city}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone <span className="text-danger">*</span></label>
              <Input
                value={form.phone}
                onChange={handleFieldChange('phone')}
                placeholder="Contact number"
                className={errors.phone ? 'border-danger focus-visible:ring-danger' : ''}
              />
              {errors.phone && <p className="text-xs text-danger font-medium">{errors.phone}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Manager Name <span className="text-danger">*</span></label>
              <Input
                value={form.manager}
                onChange={handleFieldChange('manager')}
                placeholder="Assigned manager"
                className={errors.manager ? 'border-danger focus-visible:ring-danger' : ''}
              />
              {errors.manager && <p className="text-xs text-danger font-medium">{errors.manager}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Seats <span className="text-danger">*</span></label>
              <Input
                type="number"
                value={form.seats}
                onChange={handleFieldChange('seats')}
                placeholder="e.g. 50"
                className={errors.seats ? 'border-danger focus-visible:ring-danger' : ''}
              />
              {errors.seats && <p className="text-xs text-danger font-medium">{errors.seats}</p>}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <CheckCircle size={15} /> {editId ? 'Save Changes' : 'Add Branch'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Modal */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="bg-danger/10 text-danger p-2 rounded-full shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <DialogTitle className="text-danger">Delete Branch</DialogTitle>
              </div>
            </div>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-foreground">
              Are you sure you want to delete <strong>{branches.find(b => b.id === deleteId)?.name}</strong>? This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Branch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
