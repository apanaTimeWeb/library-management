import { useUrlState } from '@/app/admin/admin_shared_hooks/useUrlState';
// RESPONSIBILITY: Renders the useAdminShiftMigration.ts component/hook.
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { ADMIN_SEATS_MOCK_STUDENTS, ADMIN_SEATS_MOCK_SHIFT_RATES, ADMIN_SEATS_STEPS } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_shifts_lockers_utils/AdminSeatsMockData';


export interface Student {
  id: string; 
  name: string; 
  smartId: string;
  currentShift: string; 
  currentSeat: string; 
  validTill: string; 
  plan: string; 
  dailyRate: number;
}
export type PayMode = 'Cash' | 'UPI' | 'Card';

export function daysRemaining(validTill: string): number {
  const diff = new Date(validTill).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

export function useAdminShiftMigration() {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useUrlState('search', '' as string);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newShift, setNewShift] = useState('');
  const [newSeat, setNewSeat] = useState('');
  const [showCustomSlot, setShowCustomSlot] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [payMode, setPayMode] = useState<PayMode>('Cash');
  const [txnId, setTxnId] = useState('');
  const [remark, setRemark] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const filteredStudents = useMemo(() => {
    return ADMIN_SEATS_MOCK_STUDENTS.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.smartId.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const daysLeft = selectedStudent ? daysRemaining(selectedStudent.validTill) : 0;
  const selectedShiftData = ADMIN_SEATS_MOCK_SHIFT_RATES.find(s => s.name === newShift);
  const newRate = selectedShiftData?.rate ?? 0;
  const oldRate = selectedStudent?.dailyRate ?? 0;
  const adjustment = (newRate - oldRate) * daysLeft;
  const isPaying = adjustment > 0;

  function handleConfirmMigration() {
    setShowConfirm(false);
    toast.success(`✅ ${selectedStudent?.name} migrated to ${newShift} — Seat ${newSeat}`);
    setStep(1); 
    setSelectedStudent(null); 
    setSearch('');
    setNewShift(''); 
    setNewSeat(''); 
    setTxnId(''); 
    setRemark('');
    setShowCustomSlot(false); 
    setCustomStart(''); 
    setCustomEnd('');
  }

  return {
    step, setStep,
    search, setSearch,
    selectedStudent, setSelectedStudent,
    newShift, setNewShift,
    newSeat, setNewSeat,
    showCustomSlot, setShowCustomSlot,
    customStart, setCustomStart,
    customEnd, setCustomEnd,
    payMode, setPayMode,
    txnId, setTxnId,
    remark, setRemark,
    showConfirm, setShowConfirm,
    filteredStudents,
    daysLeft,
    selectedShiftData,
    newRate,
    oldRate,
    adjustment,
    isPaying,
    handleConfirmMigration,
    ADMIN_SEATS_STEPS,
    ADMIN_SEATS_MOCK_SHIFT_RATES
  };
}
