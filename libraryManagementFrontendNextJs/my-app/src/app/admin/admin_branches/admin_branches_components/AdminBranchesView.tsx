'use client';

import { useMemo } from 'react';
import { Plus, Pencil, Trash2, CheckCircle, Search } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme , AdminGridCell } from '@/app/admin/admin_reusable/gridTheme';
import { useAdminBranches, type Branch } from '@/app/admin/admin_branches/admin_branches_hooks/useAdminBranches';

ModuleRegistry.registerModules([AllCommunityModule]);

interface AdminBranchesViewProps {
  initialBranches: Branch[];
}

export function AdminBranchesView({ initialBranches }: AdminBranchesViewProps) {
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

  const colDefs = useMemo<any[]>(() => [
    { field: 'name', headerName: 'Branch Name', flex: 1.5, minWidth: 150 },
    { field: 'city', headerName: 'City', flex: 1, minWidth: 120 },
    { field: 'manager', headerName: 'Manager', flex: 1.5, minWidth: 150 },
    { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 130 },
    {
      field: 'seats',
      headerName: 'Capacity',
      flex: 1,
      minWidth: 120,
      cellRenderer: (params: AdminGridCell) => (
        <span style={{ fontSize: 13, fontWeight: 500 }}>{params.data.students} / {params.value} Seats</span>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 120,
      cellRenderer: (params: AdminGridCell) => (
        <span className={`admin-badge ${params.value === 'Active' ? 'admin-badge-success' : 'admin-badge-danger'}`}>
          {params.value === 'Active' ? '✅ Active' : '🔴 Inactive'}
        </span>
      )
    },
    {
      headerName: 'Actions',
      flex: 1,
      minWidth: 100,
      sortable: false,
      cellRenderer: (params: AdminGridCell) => (
        <div style={{ display: 'flex', gap: 6, height: '100%', alignItems: 'center' }}>
          <button className="admin-btn-icon" onClick={() => openEdit(params.data)} title="Edit">
            <Pencil size={14} />
          </button>
          <button className="admin-btn-icon" onClick={() => setDeleteId(params.data.id)} title="Delete" style={{ color: 'var(--danger)' }}>
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ], []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingBottom: 40 }}>
      {/* Page Header */}
      <div className="admin-page-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 24 }}>
        <div>
          <p className="admin-breadcrumb">Smart Library 360 › Admin › Branches</p>
          <h1 className="admin-page-title">Branch Management</h1>
          <p className="admin-page-subtitle">Manage multiple branches and their managers.</p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn-primary" onClick={openAdd}>
            <Plus size={15} /> Add Branch
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16, position: 'relative', maxWidth: 360 }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input
          className="admin-input"
          style={{ paddingLeft: 38 }}
          placeholder="Search by branch name, city or manager…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* AG Grid */}
      <div className="admin-table-wrapper" style={{ flex: 1, minHeight: 400 }}>
        <AgGridReact
          rowData={filtered}
          columnDefs={colDefs}
          theme={gridTheme}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
          headerHeight={44}
          rowHeight={56}
        />
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h2 className="admin-modal-title">{editId ? 'Edit Branch' : 'Add New Branch'}</h2>
            <div className="admin-form-grid">
              <div className="admin-form-field admin-form-field-full">
                <label className="admin-label admin-label-required">Branch Name</label>
                <input className={`admin-input${errors.name ? ' admin-input-error' : ''}`} value={form.name} onChange={handleFieldChange('name')} placeholder="e.g. Main Branch" />
                {errors.name && <p className="admin-error">{errors.name}</p>}
              </div>
              <div className="admin-form-field admin-form-field-full">
                <label className="admin-label admin-label-required">Address</label>
                <input className={`admin-input${errors.address ? ' admin-input-error' : ''}`} value={form.address} onChange={handleFieldChange('address')} placeholder="Full address" />
                {errors.address && <p className="admin-error">{errors.address}</p>}
              </div>
              <div className="admin-form-field">
                <label className="admin-label admin-label-required">City</label>
                <input className={`admin-input${errors.city ? ' admin-input-error' : ''}`} value={form.city} onChange={handleFieldChange('city')} placeholder="Pune" />
                {errors.city && <p className="admin-error">{errors.city}</p>}
              </div>
              <div className="admin-form-field">
                <label className="admin-label admin-label-required">Phone</label>
                <input className={`admin-input${errors.phone ? ' admin-input-error' : ''}`} value={form.phone} onChange={handleFieldChange('phone')} placeholder="Contact number" />
                {errors.phone && <p className="admin-error">{errors.phone}</p>}
              </div>
              <div className="admin-form-field">
                <label className="admin-label admin-label-required">Manager Name</label>
                <input className={`admin-input${errors.manager ? ' admin-input-error' : ''}`} value={form.manager} onChange={handleFieldChange('manager')} placeholder="Assigned manager" />
                {errors.manager && <p className="admin-error">{errors.manager}</p>}
              </div>
              <div className="admin-form-field">
                <label className="admin-label admin-label-required">Total Seats</label>
                <input className={`admin-input${errors.seats ? ' admin-input-error' : ''}`} type="number" value={form.seats} onChange={handleFieldChange('seats')} placeholder="e.g. 50" />
                {errors.seats && <p className="admin-error">{errors.seats}</p>}
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="admin-btn-primary" onClick={handleSave}>
                <CheckCircle size={14} /> {editId ? 'Save Changes' : 'Add Branch'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <h2 className="admin-modal-title" style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Trash2 size={18} /> Delete Branch
            </h2>
            <p className="admin-modal-desc">
              Are you sure you want to delete <strong>{branches.find(b => b.id === deleteId)?.name}</strong>? This action cannot be undone.
            </p>
            <div className="admin-modal-footer">
              <button className="admin-btn-ghost" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="admin-btn-danger" onClick={handleDelete}>Delete Branch</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
