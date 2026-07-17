export interface Student {
  id: string;
  smartId: string; 
  name: string; 
  phone: string;
  shift: string; 
  seat: string; 
  status: string;
  plan: string; 
  due: number; 
  joined: string;
  branch?: string;
  currentSeat?: string;
  currentShift?: string;
  locker?: string;
  balance?: number;
  joiningDate?: string;
  kycStatus?: string;
}

export type FetchState = 'idle' | 'loading' | 'success' | 'error';
