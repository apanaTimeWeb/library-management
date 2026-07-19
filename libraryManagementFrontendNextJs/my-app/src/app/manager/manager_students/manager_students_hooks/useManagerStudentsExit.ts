// RESPONSIBILITY: Renders or handles logic for useManagerStudentsExit.ts.
import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';
import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { fetchStudents } from '@/app/manager/manager_students/manager_students_api/manager_students_api';
import type { Student } from '@/app/manager/manager_students/manager_students_types';
import { useManagerDebounce } from '@/app/manager/manager_shared_hooks/useManagerDebounce';

// DATA FLOW: Hook -> useManagerStudentsExit -> Consuming UI Component
export function useManagerStudentsExit() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useUrlState('search', '' as string);
  const debouncedSearch = useManagerDebounce(search, 300);
  const [selected, setSelected] = useState('');
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    fetchStudents().then(setStudents).catch((err) => logger.error('Failed to fetch students', err));
  }, []);

  const filtered = students.filter(s =>
    !search ||
    s.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    s.smartId.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const student = students.find(s => s.smartId === selected);

  function handleExit() {
    if (!selected || !reason) return;
    setConfirmed(true);
  }

  function reset() {
    setConfirmed(false);
    setSelected('');
    setReason('');
  }

  return {
    search,
    setSearch,
    selected,
    setSelected,
    reason,
    setReason,
    confirmed,
    filtered,
    student,
    handleExit,
    reset,
  };
}


