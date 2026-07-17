import { useState, useMemo } from 'react';
import { useAdmin } from '@/app/admin/admin_context/AdminContext';

export interface AdminStudentData {
  id: string;
  name: string;
  shift: string;
  seat: string;
  plan: string;
  status: string;
  branch: string;
}

export function useAdminStudents(initialStudents: AdminStudentData[]) {
  const [search, setSearch] = useState('');
  const { selectedBranch } = useAdmin();

  const filteredStudents = useMemo(() => {
    return initialStudents.filter(s => {
      if (selectedBranch !== 'All Branches' && s.branch !== selectedBranch) return false;
      return (s.name || '').toLowerCase().includes(search.toLowerCase());
    });
  }, [initialStudents, selectedBranch, search]);

  return {
    search,
    setSearch,
    selectedBranch,
    filteredStudents
  };
}
