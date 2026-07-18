// RESPONSIBILITY: Renders the useAdminStudents.ts component/hook.
import { useState, useMemo } from 'react';
import { useAdmin } from '@/app/admin/admin_store/AdminContext';
import type { AdminStudentData } from '@/app/admin/admin_students/admin_students_types/admin_students_types';

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
