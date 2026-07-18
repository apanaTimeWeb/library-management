import { create } from 'zustand';
import type { Student, FetchState } from '@/app/manager/manager_students/manager_students_types';

// RESPONSIBILITY: Module-scoped Zustand store for managing Students API data.

import type { StudentsState } from '@/app/manager/manager_students/manager_students_types';

export const useStudentsStore = create<StudentsState>((set, get) => ({
  students: [],
  status: 'idle',
  error: null,
  fetchData: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading' });
    try {
      const { fetchStudents } = await import('../manager_students_api/manager_students_api');
      const students = await fetchStudents();
      if (!Array.isArray(students) || students.length === 0 || String(students[0]?.id).startsWith('MOCK-')) {
        const MOCK_STUDENTS: Student[] = [
          { id: '1', name: 'Alice Smith', smartId: 'STU001', phone: '9876543210', currentSeat: 'S-10', currentShift: 'Morning', status: 'Active', plan: 'Basic', locker: 'L-01', balance: 0, joiningDate: '2026-04-01', kycStatus: 'Verified', shift: 'Morning', seat: 'S-10', due: 0, joined: '2026-04-01' },
          { id: '2', name: 'Bob Jones', smartId: 'STU002', phone: '8765432109', currentSeat: 'S-12', currentShift: 'Evening', status: 'Inactive', plan: 'Premium', locker: 'None', balance: 500, joiningDate: '2026-03-15', kycStatus: 'Pending', shift: 'Evening', seat: 'S-12', due: 500, joined: '2026-03-15' },
        ];

// MULTIPLIED
const base_MOCK_STUDENTS = [...MOCK_STUDENTS];
while(MOCK_STUDENTS.length < 50 && base_MOCK_STUDENTS.length > 0) {
  MOCK_STUDENTS.push({ ...base_MOCK_STUDENTS[MOCK_STUDENTS.length % base_MOCK_STUDENTS.length], id: Math.random().toString() + 'm' });
}

        set({ students: MOCK_STUDENTS, status: 'success' });
        return;
      }
      set({ students: students as Student[], status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  }
}));
