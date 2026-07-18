

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
export interface IdCardData {
  name: string;
  smartId: string;
  phone: string;
  shift: string;
  seat: string;
  locker: string;
  plan: string;
  joinDate: string;
  expiryDate: string;
  branch?: string;
  college?: string;
  id?: string; avatar?: string; bloodGroup?: string; emergencyContact?: string; validTill?: string; qrCode?: string;
}
export interface ManagerStudentsIdCardProps {
  data: IdCardData;
}
export interface ManagerStudentsAdmissionSuccessModalProps {
  data: AdmittedData;
  onClose: () => void;
}
export interface ManagerStudentsErrorBoundaryProps {
  children: React.ReactNode;
}
export interface ManagerStudentsErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
export interface StudentsState {
  students: Student[];
  status: FetchState;
  error: string | null;
  fetchData: () => Promise<void>;
}
export interface ReferralData {
  id: string;
  referrer: string;
  referred: string;
  date: string;
  status: 'Claimed' | 'Pending' | 'Approved';
  bonus: string;
  method: string;
}
export interface AlumniData {
  id: string;
  name: string;
  phone: string;
  leftDate: string;
  duration: string;
  exam: string;
  currentStatus: string;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type AdmittedData = IdCardData & {
  phone: string;
  parentPhone?: string;
  amountPaid: number;
  totalPayable: number;
  discount: number;
  paymentMode: string;
  transactionId?: string;
};
