'use client';

import { useMemo } from 'react';
import { UserPlus, Pencil, Trash2, CheckCircle, Search, Users } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '../../admin_reusable/gridTheme';
import { useAdminStaff, type StaffMember } from '../admin_staff-users_hooks/useAdminStaff';

ModuleRegistry.registerModules([AllCommunityModule]);

interface AdminStaffViewProps {
  initialStaff: StaffMember[];
}

export function AdminStaffView({ initialStaff }: AdminStaffViewProps) {
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

  const roleBadgeClass = (role: string) => {
    if (role === 'Admin')   return 'admin-badge admin-badge-purple';
    if (role === 'Manager') return 'admin-badge admin-badge-info';
    return 'admin-badge admin-badge-success';
  };

  const colDefs = useMemo<any[]>(() => [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 200 },
    { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 120 },
    {
      field: 'role', headerName: 'Role', flex: 1, minWidth: 120,
      cellRenderer: (params: any) => (
        <span className={roleBadgeClass(params.value)}>{params.value}</span>
      )
    },
    { field: 'branch', headerName: 'Branch', flex: 1, minWidth: 150 },
    { field: 'joinedDate', headerName: 'Joined', flex: 1, minWidth: 120 },
    {
      field: 'status', headerName: 'Status', flex: 1, minWidth: 120,
      cellRenderer: (params: any) => (
        <span className={`admin-badge ${params.value === 'Active' ? 'admin-badge-success' : 'admin-badge-danger'}`}>
          {params.value}
        </span>
      )
    },
    {
      headerName: 'Actions',
      flex: 1,
      minWidth: 120,
      sortable: false,
      cellRenderer: (params: any) => (
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
          <p className="admin-breadcrumb">Smart Library 360 › Admin › Staff &amp; Users</p>
          <h1 className="admin-page-title">Staff &amp; Users</h1>
          <p className="admin-page-subtitle">Manage staff accounts and their branch assignments.</p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn-primary" onClick={openAdd}>
            <UserPlus size={15} /> Add Staff
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {stats.map(s => (
          <div key={s.label} className="admin-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `color-mix(in srgb, ${s.color} 12%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users size={16} style={{ color: s.color }} />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>{s.label}</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{s.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16, position: 'relative', maxWidth: 360 }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input
          className="admin-input"
          style={{ paddingLeft: 38 }}
          placeholder="Search by name, email or role…"
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
            <h2 className="admin-modal-title">{editId ? 'Edit Staff Member' : 'Add Staff Member'}</h2>
            <div className="admin-form-grid">
              <div className="admin-form-field admin-form-field-full">
                <label className="admin-label admin-label-required">Full Name</label>
                <input className={`admin-input${errors.name ? ' admin-input-error' : ''}`} value={form.name} onChange={handleFieldChange('name')} placeholder="Full name" />
                {errors.name && <p className="admin-error">{errors.name}</p>}
              </div>
              <div className="admin-form-field admin-form-field-full">
                <label className="admin-label admin-label-required">Email</label>
                <input className={`admin-input${errors.email ? ' admin-input-error' : ''}`} type="email" value={form.email} onChange={handleFieldChange('email')} placeholder="email@library.com" />
                {errors.email && <p className="admin-error">{errors.email}</p>}
              </div>
              <div className="admin-form-field">
                <label className="admin-label admin-label-required">Phone</label>
                <input className={`admin-input${errors.phone ? ' admin-input-error' : ''}`} value={form.phone} onChange={handleFieldChange('phone')} placeholder="9876543210" />
                {errors.phone && <p className="admin-error">{errors.phone}</p>}
              </div>
              <div className="admin-form-field">
                <label className="admin-label">Role</label>
                <select className="admin-select" style={{ width: '100%', padding: '10px 14px' }} value={form.role} onChange={handleFieldChange('role')}>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <div className="admin-form-field admin-form-field-full">
                <label className="admin-label">Branch</label>
                <select className="admin-select" style={{ width: '100%', padding: '10px 14px' }} value={form.branch} onChange={handleFieldChange('branch')}>
                  <option value="Main Branch">Main Branch</option>
                  <option value="Branch 2">Branch 2</option>
                  <option value="Kothrud Center">Kothrud Center</option>
                  <option value="Nashik Branch">Nashik Branch</option>
                </select>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="admin-btn-primary" onClick={handleSave}>
                <CheckCircle size={14} /> {editId ? 'Save Changes' : 'Add Staff'}
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
              <Trash2 size={18} /> Remove Staff Member
            </h2>
            <p className="admin-modal-desc">
              Are you sure you want to remove <strong>{staff.find(s => s.id === deleteId)?.name}</strong>? Their account will be deactivated.
            </p>
            <div className="admin-modal-footer">
              <button className="admin-btn-ghost" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="admin-btn-danger" onClick={handleDelete}>Remove Staff</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
