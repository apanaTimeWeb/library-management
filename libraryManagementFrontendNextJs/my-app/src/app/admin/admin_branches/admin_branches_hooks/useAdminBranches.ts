import { useUrlState } from '@/app/admin/admin_shared_hooks/useUrlState';
// RESPONSIBILITY: Renders the useAdminBranches.ts component/hook.
import { useState, useMemo } from 'react';


export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  manager: string;
  students: number;
  seats: number;
  status: 'Active' | 'Inactive';
}
export interface FormState {
  name: string;
  address: string;
  city: string;
  phone: string;
  manager: string;
  seats: string;
}

const EMPTY_FORM: FormState = { name: '', address: '', city: '', phone: '', manager: '', seats: '' };

// DATA FLOW: API → useAdminBranches.ts → AdminBranchesComponent
export function useAdminBranches(initialBranches: Branch[]) {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [search, setSearch] = useUrlState('search', '');

  const filtered = useMemo(() => {
    return branches.filter(b =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.city.toLowerCase().includes(search.toLowerCase()) ||
      b.manager.toLowerCase().includes(search.toLowerCase())
    );
  }, [branches, search]);

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim())    e.name    = 'Branch name is required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim())    e.city    = 'City is required';
    if (!form.phone.trim())   e.phone   = 'Phone is required';
    if (!form.manager.trim()) e.manager = 'Manager name is required';
    if (!form.seats || isNaN(Number(form.seats))) e.seats = 'Valid seat count required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function openAdd() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowForm(true);
  }

  function openEdit(b: Branch) {
    setEditId(b.id);
    setForm({ name: b.name, address: b.address, city: b.city, phone: b.phone, manager: b.manager, seats: String(b.seats) });
    setErrors({});
    setShowForm(true);
  }

  function handleSave() {
    if (!validate()) return;
    if (editId) {
      setBranches(prev => prev.map(b => b.id === editId ? { ...b, ...form, seats: Number(form.seats) } : b));
    } else {
      setBranches(prev => [...prev, {
        id: `B${Date.now()}`, ...form, seats: Number(form.seats), students: 0, status: 'Active'
      }]);
    }
    setShowForm(false);
  }

  function handleDelete() {
    if (deleteId) setBranches(prev => prev.filter(b => b.id !== deleteId));
    setDeleteId(null);
  }

  const handleFieldChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrors(p => ({ ...p, [k]: undefined }));
  };

  return {
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
  };
}

