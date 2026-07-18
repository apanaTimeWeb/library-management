import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';
import { useState, useMemo, useEffect } from 'react';
import { fetchStudents } from '@/app/manager/manager_students/manager_students_api/manager_students_api';
import type { Student } from '@/app/manager/manager_students/manager_students_types';
import { useManagerDebounce } from '@/app/manager/manager_shared_hooks/useManagerDebounce';
import { IdCardData } from '@/app/manager/manager_students/manager_students_types';
import { formatIdCardMessage, openWhatsApp, calcExpiryDate, formatDateIN, type StudentWhatsAppData } from '@/lib/whatsappUtils';
import { printThermal } from '@/lib/thermalPrint';

// DATA FLOW: Hook -> useManagerStudentsIdCard -> Consuming UI Component
export function useManagerStudentsIdCard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [search, setSearch] = useUrlState('search', '');
  const debouncedSearch = useManagerDebounce(search, 300);

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    fetchStudents().then(setStudents).catch(console.error);
  }, []);

  const filtered = useMemo(() =>
    students.filter(s =>
      !search ||
      s.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      s.smartId.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      s.phone.includes(debouncedSearch)
    ),
    [students, debouncedSearch]
  );

  const selected = useMemo(
    () => students.find(s => s.smartId === selectedId),
    [students, selectedId]
  );

  const cardData: IdCardData | null = useMemo(() => {
    if (!selected) return null;
    const joinedStr = selected.joined || selected.joiningDate || '01/01/2024';
    let dd, mm, yyyy;
    if (joinedStr.includes('/')) {
      [dd, mm, yyyy] = joinedStr.split('/');
    } else {
      const d = new Date(joinedStr);
      dd = String(d.getDate()).padStart(2, '0');
      mm = String(d.getMonth() + 1).padStart(2, '0');
      yyyy = String(d.getFullYear());
    }
    const joinDate   = new Date(`${yyyy}-${mm}-${dd}`);
    const expiryDate = calcExpiryDate(joinDate, selected.plan || 'Monthly');
    return {
      name:       selected.name,
      smartId:    selected.smartId,
      phone:      selected.phone,
      shift:      selected.shift,
      seat:       selected.seat,
      locker:     'None',
      plan:       selected.plan,
      joinDate:   formatDateIN(joinDate),
      expiryDate: formatDateIN(expiryDate),
      branch:     selected.branch,
    };
  }, [selected]);

  const waData: StudentWhatsAppData | null = useMemo(() => {
    if (!cardData || !selected) return null;
    const paid = selected.due > 0 ? (1500 - selected.due) : 1500;
    return {
      ...cardData,
      parentPhone:  undefined,
      amountPaid:   paid,
      totalPayable: 1500,
      discount:     0,
      paymentMode:  'UPI',
    };
  }, [cardData, selected]);

  function handleSendWhatsApp() {
    if (!waData || !selected) return;
    openWhatsApp(selected.phone, formatIdCardMessage(waData));
  }

  function handlePrint() {
    if (!cardData || !selected) return;
    printThermal({
      type:        'idcard',
      shopName:    'Smart Library 360',
      branch:      selected.branch,
      studentName: cardData.name,
      smartId:     cardData.smartId,
      phone:       cardData.phone,
      shift:       cardData.shift,
      seat:        cardData.seat,
      locker:      cardData.locker,
      plan:        cardData.plan,
      joinDate:    cardData.joinDate,
      expiryDate:  cardData.expiryDate,
    });
  }

  return {
    search,
    setSearch,
    selectedId,
    setSelectedId,
    filtered,
    selected,
    cardData,
    handleSendWhatsApp,
    handlePrint,
  };
}
