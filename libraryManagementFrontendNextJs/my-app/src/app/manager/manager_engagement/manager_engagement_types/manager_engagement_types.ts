export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type AttStatus = 'present' | 'absent' | 'late' | null;

export interface StudentAttendance {
  id: string;
  smartId: string;
  name: string;
  initials: string;
  shift: string;
  consecutiveAbsent: number;
  status: AttStatus;
  inTime: string;
  outTime: string;
}
