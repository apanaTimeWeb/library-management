import { useState, useMemo } from 'react';
import { useAdmin } from '../../admin_context/AdminContext';

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
