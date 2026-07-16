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
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Manager' | 'Staff';
  branch: string;
}

const EMPTY: FormState = { name: '', email: '', phone: '', role: 'Staff', branch: 'Main Branch' };

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
    if (!form.name.trim())  e.name  = 'Name is required';
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
    setForm({ name: s.name, email: s.email, phone: s.phone, role: s.role, branch: s.branch });
    setErrors({}); 
    setShowForm(true);
  }

  function handleSave() {
    if (!validate()) return;
    if (editId) {
      setStaff(prev => prev.map(s => s.id === editId ? { ...s, ...form } : s));
    } else {
      setStaff(prev => [...prev, {
        id: `S${Date.now()}`, ...form, status: 'Active',
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
    setForm(p => ({ ...p, [k]: e.target.value as any }));
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
