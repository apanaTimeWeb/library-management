import { useManagerDebounce } from '@/app/manager/manager_shared_hooks/useManagerDebounce';
// RESPONSIBILITY: Renders the ManagerStudentsIdCardClient.tsx component.
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Printer, MessageSquare, IdCard, CheckCircle2 } from 'lucide-react';
import ManagerStudentsIdCard, { type IdCardData } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsIdCard';
import {
  formatIdCardMessage,
  openWhatsApp,
  calcExpiryDate,
  formatDateIN,
  type StudentWhatsAppData,
} from '@/lib/whatsappUtils';
import { printThermal } from '@/lib/thermalPrint';
import { fetchStudents } from '@/app/manager/manager_students/manager_students_api/manager_students_api';
import type { Student } from '@/app/manager/manager_students/manager_students_types';

export function ManagerStudentsIdCardClient() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [search, setSearch]         = useState('');
  const debouncedSearch = useManagerDebounce(search, 300);

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
    const [dd, mm, yyyy] = selected.joined.split('/');
    const joinDate   = new Date(`${yyyy}-${mm}-${dd}`);
    const expiryDate = calcExpiryDate(joinDate, selected.plan);
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
// RESPONSIBILITY: Renders the ManagerStudentsIdCardClient.tsx component.
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Printer, MessageSquare, IdCard, CheckCircle2 } from 'lucide-react';
import ManagerStudentsIdCard, { type IdCardData } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsIdCard';
import {
  formatIdCardMessage,
  openWhatsApp,
  calcExpiryDate,
  formatDateIN,
  type StudentWhatsAppData,
} from '@/lib/whatsappUtils';
import { printThermal } from '@/lib/thermalPrint';
import { fetchStudents } from '@/app/manager/manager_students/manager_students_api/manager_students_api';
import type { Student } from '@/app/manager/manager_students/manager_students_types';

export function ManagerStudentsIdCardClient() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [search, setSearch]         = useState('');
  const debouncedSearch = useManagerDebounce(search, 300);

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
    const [dd, mm, yyyy] = selected.joined.split('/');
    const joinDate   = new Date(`${yyyy}-${mm}-${dd}`);
    const expiryDate = calcExpiryDate(joinDate, selected.plan);
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

  return (
    <div className="p-6 min-h-screen">
      <div className="p-6 min-h-screen-header">
        <div>
          <Link href="/manager/manager_students" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-4">
            <ArrowLeft size={14} /> Back to Students
          </Link>
          <h1 className="text-[22px] font-bold text-text-primary">ID Card Generator</h1>
          <p className="text-[13px] text-text-secondary mt-1.5">Search → click student → preview → print or send via WhatsApp</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT — selector */}
        <div>
          <div className="bg-bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-text-primary">
                <IdCard size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
                Select Student
              </h2>
              {selected && (
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success">
                  <CheckCircle2 size={11} /> {selected.name}
                </span>
              )}
            </div>
            <div className="">
              <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap" style={{ marginBottom: 14 }}>
                <Search size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
                <input
                  className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon"
                  placeholder="Search name, Smart ID, phone…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="mt-4 max-h-[400px] overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                {filtered.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[200px]">
                    <div className="text-4xl mb-4 opacity-50">🔍</div>
                    <p className="text-lg font-bold text-text-primary mb-1">No students found</p>
                  </div>
                )}
                {filtered.map(s => {
                  const initials = s.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
                  return (
                    <button
                      key={s.smartId}
                      onClick={() => setSelectedId(s.smartId)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left ${s.smartId === selectedId ? 'bg-primary-subtle border-primary/20' : ''}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{initials}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary truncate">{s.name}</p>
                        <p className="text-xs text-text-secondary mt-0.5 truncate">{s.smartId} · {s.shift} · Seat {s.seat}</p>
                      </div>
                      <span className={
                        s.status === 'Active'    ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success' :
                        s.status === 'Suspended' ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-warning-bg text-warning' :
                                                   'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-danger-bg text-danger'
                      }>{s.status}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {selected && cardData && (
            <div className="bg-bg-card rounded-xl border border-border p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-text-primary">Actions</h2>
              </div>
              <div className="flex flex-col gap-3">
                <button className="bg-[#25D366] text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-[#20bd5a] transition-colors inline-flex items-center gap-2 w-full justify-center shadow-sm" onClick={handleSendWhatsApp}>
                  <MessageSquare size={16} />
                  Send ID Card via WhatsApp
                </button>
                <button
                  className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2"
                  onClick={handlePrint}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Printer size={15} />
                  Print ID Card (Thermal)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — preview */}
        <div className="flex flex-col items-center justify-center bg-bg-page border border-dashed border-border rounded-xl p-8 sticky top-24">
          {cardData ? (
            <>
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-6">
                Preview — {selected?.name}
              </p>
              <ManagerStudentsIdCard data={cardData} />
              <p className="text-[11px] text-text-secondary mt-6 text-center max-w-72">
                Use buttons on the left to print (80mm thermal) or send via WhatsApp
              </p>
            </>
          ) : (
            <div className="bg-bg-card rounded-xl border border-border p-6 w-full max-w-sm">
              <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[200px]">
                <div className="text-4xl mb-4 opacity-50">🪪</div>
                <p className="text-lg font-bold text-text-primary mb-1">No student selected</p>
                <p className="text-sm text-text-secondary">Search and click a student to preview their ID card.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
