import { useState, useMemo } from 'react';
import { useAdmin } from '@/app/admin/admin_context/AdminContext';

// DATA FLOW: API → useAdminStudents.ts → AdminStudentsComponent
export function useAdminStudents(initialStudents: any[]) {
  const [search, setSearch] = useState('');
  const { selectedBranch } = useAdmin();

  const filteredStudents = useMemo(() => {
    return initialStudents.filter((s: any) => {
      if (selectedBranch !== 'All Branches' && s.branch !== selectedBranch) return false;
      return s.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [initialStudents, selectedBranch, search]);

  return {
    search,
    setSearch,
    selectedBranch,
    filteredStudents
  };
}
