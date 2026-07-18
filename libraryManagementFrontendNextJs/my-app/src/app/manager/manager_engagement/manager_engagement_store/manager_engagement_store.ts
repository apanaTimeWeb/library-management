import { create } from 'zustand';
import type { FetchState, StudentAttendance, AttStatus } from '@/app/manager/manager_engagement/manager_engagement_types/manager_engagement_types';
import { INIT_STUDENTS } from '@/app/manager/manager_engagement/manager_engagement_constants/manager_engagement_constants';


export interface ManagerEngagementState {
  attendance: StudentAttendance[];
  attendanceStatus: FetchState;
  attendanceError: string | null;
  fetchAttendance: () => Promise<void>;
  updateAttendanceStatus: (id: string, status: AttStatus) => void;
  updateAttendanceTime: (id: string, field: 'inTime'|'outTime', val: string) => void;
  saveAttendance: () => Promise<void>;
}

// DATA FLOW: API -> Store -> Hook -> Component
export const useManagerEngagementStore = create<ManagerEngagementState>((set, get) => ({
  attendance: INIT_STUDENTS,
  attendanceStatus: 'idle',
  attendanceError: null,

  fetchAttendance: async () => {
    // Simulated fetch
    set({ attendanceStatus: 'loading' });
    setTimeout(() => {
      set({ attendance: INIT_STUDENTS, attendanceStatus: 'success' });
    }, 500);
  },

  updateAttendanceStatus: (id, status) => {
    set((state) => ({
      attendance: state.attendance.map((s) => s.id === id ? { ...s, status } : s)
    }));
  },

  updateAttendanceTime: (id, field, val) => {
    set((state) => ({
      attendance: state.attendance.map((s) => s.id === id ? { ...s, [field]: val } : s)
    }));
  },

  saveAttendance: async () => {
    // In reality this would post to the backend. We'll just mock success.
    return new Promise(resolve => setTimeout(resolve, 500));
  }
}));
