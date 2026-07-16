/**
 * RESPONSIBILITY: Manages local state for admin staff users, including filtering,
 * form handling, and statistics calculation.
 */
import { useState, useMemo } from 'react';

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Manager' | 'Staff';
  branch: string;
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

export interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleId: string;
  branchId: string;
}

const EMPTY: FormState = { firstName: '', lastName: '', email: '', phone: '', roleId: 'role-staff-id', branchId: 'main-branch-id' };

// DATA FLOW: API → useAdminStaff.ts → AdminStaffComponent
export function useAdminStaff(initialStaff: StaffMember[]) {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return staff.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [staff, search]);

  const stats = useMemo(() => [
    { label: 'Admin',   count: staff.filter(s => s.role === 'Admin').length,   color: 'var(--purple)' },
    { label: 'Manager', count: staff.filter(s => s.role === 'Manager').length, color: 'var(--info)'   },
    { label: 'Staff',   count: staff.filter(s => s.role === 'Staff').length,   color: 'var(--success)'},
    { label: 'Total',   count: staff.length,                                   color: 'var(--primary)'},
  ], [staff]);

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function openAdd() {
    setEditId(null); 
    setForm(EMPTY); 
    setErrors({}); 
    setShowForm(true);
  }

  function openEdit(s: StaffMember) {
    setEditId(s.id);
    const parts = s.name.split(' ');
    setForm({ 
      firstName: parts[0] || '', 
      lastName: parts.slice(1).join(' ') || '', 
      email: s.email, 
      phone: s.phone, 
      roleId: s.role === 'Admin' ? 'role-admin-id' : s.role === 'Manager' ? 'role-manager-id' : 'role-staff-id', 
      branchId: 'main-branch-id' 
    });
    setErrors({}); 
    setShowForm(true);
  }

  function handleSave() {
    if (!validate()) return;
    if (editId) {
      setStaff(prev => prev.map(s => s.id === editId ? { ...s, name: `${form.firstName} ${form.lastName}`, email: form.email, phone: form.phone } : s));
    } else {
      setStaff(prev => [...prev, {
        id: `S${Date.now()}`, 
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        role: 'Staff',
        branch: 'Main Branch',
        status: 'Active',
        joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }),
      }]);
    }
    setShowForm(false);
  }

  function handleDelete() {
    if (deleteId) setStaff(prev => prev.filter(s => s.id !== deleteId));
    setDeleteId(null);
  }

  const handleFieldChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [k]: e.target.value as FormState[typeof k] }));
    setErrors(p => ({ ...p, [k]: undefined }));
  };

  return {
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
  };
}

