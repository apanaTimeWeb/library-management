'use client';
import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';

// RESPONSIBILITY: Renders the ManagerSeatsShiftMigrationClient.tsx component UI.
import { useState } from 'react';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, ManagerSeatsSeatMatrixModalProps, ShiftData, Student, PayMode } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, SHIFTS_DATA, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import toast from 'react-hot-toast';
import { ArrowLeft, Search, ChevronDown, CreditCard, QrCode, Banknote, CheckCircle, Clock } from 'lucide-react';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { SHIFTS, daysRemaining } from './ManagerSeatsShiftMigrationHelpers';


export function ManagerSeatsShiftMigrationClient() {
  const [step, setStep]                         = useState(1);
  const [search, setSearch] = useUrlState('search', '' as string);
  const [selectedStudent, setSelectedStudent]   = useState<Student | null>(null);
  const [newShift, setNewShift]                 = useState('');
  const [newSeat, setNewSeat]                   = useState('');
  const [showCustomSlot, setShowCustomSlot]     = useState(false);
  const [customStart, setCustomStart]           = useState('');
  const [customEnd, setCustomEnd]               = useState('');
  const [payMode, setPayMode]                   = useState<PayMode>('Cash');
  const [txnId, setTxnId]                       = useState('');
  const [remark, setRemark]                     = useState('');
  const [showConfirm, setShowConfirm]           = useState(false);

  const filteredStudents = STUDENTS_DATA.filter((s: Student) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.smartId?.toLowerCase() || "").includes(search.toLowerCase())
  );

  const daysLeft       = selectedStudent ? daysRemaining(selectedStudent.validTill || "") : 0;
  const selectedShiftData = SHIFTS.find(s => s.name === newShift);
  const newRate        = selectedShiftData?.rate ?? 0;
  const oldRate        = selectedStudent?.dailyRate ?? 0;
  const adjustment     = (newRate - oldRate) * daysLeft;
  const isPaying       = adjustment > 0;

  function handleConfirmMigration() {
    setShowConfirm(false);
    toast.success(`✅ ${selectedStudent?.name} migrated to ${newShift} — Seat ${newSeat}`);
    setStep(1); setSelectedStudent(null); setSearch('');
    setNewShift(''); setNewSeat(''); setTxnId(''); setRemark('');
    setShowCustomSlot(false); setCustomStart(''); setCustomEnd('');
  }

  const STEPS = [
    { n: 1, label: 'Select Student' },
    { n: 2, label: 'Choose New Slot' },
    { n: 3, label: 'Review & Pay' },
  ];

  return (
    <>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full pb-24">
        <div className="flex flex-col items-center justify-center text-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-text-primary text-3xl font-bold text-text-primary">Shift Migration Wizard</h1>
          <p className="text-text-secondary mt-1 text-sm text-text-secondary mt-2 text-base">Move a student to a different shift with automatic fee adjustment.</p>
        </div>

        <div className="relative max-w-xl mx-auto mb-12">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 rounded-full" />
          <div className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-500 w-full" style={{ width: `${((step - 1) / 2) * 100}%` }} />
          <div className="relative flex justify-between max-w-md mx-auto">
            {STEPS.map(s => (
              <div key={s.n} className="flex flex-col items-center gap-2 bg-bg-base px-2">
                <div className={`relative max-w-xl mx-auto mb-12__circle ${step >= s.n ? 'relative max-w-xl mx-auto mb-12__circle--active' : 'relative max-w-xl mx-auto mb-12__circle--inactive'}`}>
                  {step > s.n ? <CheckCircle size={18} /> : s.n}
                </div>
                <span className={`relative max-w-xl mx-auto mb-12__label ${step >= s.n ? 'relative max-w-xl mx-auto mb-12__label--active' : 'relative max-w-xl mx-auto mb-12__label--inactive'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <div className="bg-card border border-border rounded-xl overflow-hidden p-6 hover:border-primary/50 transition-colors">
                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4 border-b border-border pb-2">
                  <Search size={18} className="text-primary" />
                  Select Student
                </h3>
                <div className="relative w-full max-w-md">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Search by name or Smart ID..."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setSelectedStudent(null); }}
                  />
                </div>
                {search && (
                  <div className="mt-4 space-y-2 max-h-64 overflow-y-auto border border-border rounded-lg p-2 bg-bg-elevated">
                    {filteredStudents.length === 0 ? (
                      <p className="text-text-secondary text-xs text-text-secondary font-medium tracking-wide uppercase">No students found.</p>
                    ) : filteredStudents.map((s: Student) => (
                      <button
                        key={s.id}
                        className={`p-3 border border-border rounded-lg flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors bg-card${selectedStudent?.id === s.id ? ' border-primary bg-primary/5 ring-1 ring-primary/20' : ''}`}
                        onClick={() => {
                          setSelectedStudent(s);
                          setNewShift(s.currentShift);
                          setNewSeat(s.currentSeat || "");
                        }}
                      >
                        <p className="font-semibold text-text-primary text-sm">{s.name}</p>
                        <p className="text-xs text-text-secondary mt-0.5">{s.smartId} · {s.currentShift}</p>
                      </button>
                    ))}
                  </div>
                )}
                {selectedStudent && (
                  <div className="bg-bg-elevated p-4 rounded-lg border border-border mt-6">
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">Current Details — {selectedStudent.name}</p>
                      <p className="text-sm text-text-secondary leading-relaxed bg-bg-elevated p-4 rounded-lg border border-border">
                        Shift: <strong>{selectedStudent.currentShift}</strong> · Seat: <strong>{selectedStudent.currentSeat}</strong> · Valid Till: <strong>{selectedStudent.validTill}</strong> · Plan: <strong>{selectedStudent.plan}</strong> · Days Left: <strong>{daysLeft}</strong>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="bg-card border border-border rounded-xl overflow-hidden p-6 hover:border-primary/50 transition-colors">
                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4 border-b border-border pb-2">
                  <ChevronDown size={18} className="text-primary" />
                  Choose New Slot
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary flex justify-between">New Shift <span className="text-danger">*</span></label>
                    <div className="relative w-full">
                      <ManagerSearchableDropdown
                        value={newShift}
                        onChange={v => { setNewShift(v); setNewSeat(''); }}
                        options={[
                          { label: 'Select shift...', value: '' },
                          ...SHIFTS.map(s => ({
                            label: `${s.name} (${s.seats} seats free)`,
                            value: s.name
                          }))
                        ]}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary flex justify-between">New Seat <span className="text-danger">*</span></label>
                    <ManagerSearchableDropdown
                      options={newShift ? ['B-01', 'B-02', 'B-03', 'B-04'].map(s => ({label: s, value: s})) : []}
                      value={newSeat}
                      onChange={(v) => setNewSeat(v)}
                      placeholder="Select seat..."
                      className={!newShift ? 'opacity-50 pointer-events-none' : ''}
                    />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <button
                    className={`flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm px-3 py-1.5 text-xs font-medium mt-6 pt-4 border-t border-border flex items-center justify-between__btn`}
                    onClick={() => setShowCustomSlot(v => !v)}
                  >
                    <Clock size={13} />
                    {showCustomSlot ? 'Remove Custom Slot' : '+ Add Custom Time Slot (Optional)'}
                  </button>
                </div>
                {showCustomSlot && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-dashed border-border bg-bg-elevated/50 p-4 rounded-lg">
                    <div>
                      <label className="text-sm font-medium text-text-secondary flex justify-between">Custom Start Time</label>
                      <input type="time" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3" value={customStart} onChange={e => setCustomStart(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary flex justify-between">Custom End Time</label>
                      <input type="time" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3" value={customEnd} onChange={e => setCustomEnd(e.target.value)} />
                    </div>
                  </div>
                )}

                {newShift && (
                  <div className="bg-bg-elevated p-4 rounded-lg border border-border mt-6">
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">Availability</p>
                      <p className="text-sm text-text-secondary leading-relaxed bg-bg-elevated p-4 rounded-lg border border-border">
                        {selectedShiftData?.seats} seats available in {newShift} shift. Rate: ₹{newRate}/day.
                        {showCustomSlot && customStart && customEnd && (
                          <> Custom slot: <strong>{customStart} – {customEnd}</strong>.</>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <>
                <div className="bg-card border border-border rounded-xl overflow-hidden p-6 hover:border-primary/50 transition-colors">
                  <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4 border-b border-border pb-2">
                    <CheckCircle size={18} className="text-primary" />
                    Fee Adjustment
                  </h3>
                  <div className="space-y-3 bg-bg-elevated p-4 rounded-lg border border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Old Rate</span>
                      <span className="text-sm font-semibold text-text-primary font-mono tracking-tight">₹{oldRate}/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">New Rate</span>
                      <span className="text-sm font-semibold text-text-primary font-mono tracking-tight">₹{newRate}/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Days Remaining</span>
                      <span className="text-sm font-semibold text-text-primary font-mono tracking-tight">{daysLeft} days</span>
                    </div>
                    <div className="w-full h-px bg-border my-4" />
                    <div className="flex justify-between items-center pt-4 border-t border-dashed border-border mt-2 font-bold text-lg">
                      <span className="text-text-primary">Fee Adjustment</span>
                      <span className={`text-primary ${isPaying ? 'text-danger' : 'text-success'}`}>
                        {isPaying ? '+' : ''}₹{Math.abs(adjustment)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-bg-elevated p-4 rounded-lg border border-border mt-6">
                    <div>
                      <p className="text-sm text-text-secondary leading-relaxed bg-bg-elevated p-4 rounded-lg border border-border">
                        {isPaying
                          ? '🔴 Student pays more — collect ₹' + adjustment + ' before confirming.'
                          : adjustment < 0
                            ? '🔵 Refund ₹' + Math.abs(adjustment) + ' to student.'
                            : '✅ No fee adjustment needed.'}
                      </p>
                    </div>
                  </div>
                </div>

                {isPaying && (
                  <div className="bg-card border border-border rounded-xl overflow-hidden p-6 hover:border-primary/50 transition-colors">
                    <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4 border-b border-border pb-2">Payment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {(['Cash', 'UPI', 'Card'] as PayMode[]).map(m => (
                        <button
                          key={m}
                          onClick={() => setPayMode(m)}
                          className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-colors border border-border bg-card hover:bg-bg-elevated text-text-primary py-2.5 px-5 ${payMode === m ? 'flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm' : 'flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm'}`}
                        >
                          {m === 'Cash' ? <Banknote size={15} /> : m === 'UPI' ? <QrCode size={15} /> : <CreditCard size={15} />}
                          {m}
                        </button>
                      ))}
                    </div>
                    {payMode !== 'Cash' && (
                      <div className="flex flex-col gap-1.5 mt-6">
                        <label className="text-sm font-medium text-text-secondary flex justify-between">Transaction ID</label>
                        <input className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3" placeholder="Enter transaction reference" value={txnId} onChange={e => setTxnId(e.target.value)} />
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-card border border-border rounded-xl overflow-hidden p-6 hover:border-primary/50 transition-colors">
                  <label className="text-sm font-medium text-text-secondary flex justify-between">Remark (optional)</label>
                  <textarea className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-y" rows={2} placeholder="Any notes about this migration..." value={remark} onChange={e => setRemark(e.target.value)} />
                </div>
              </>
            )}
          </div>

          {selectedStudent && (
            <div className="flex flex-col gap-6">
              <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold text-text-primary mt-4">{selectedStudent.name}</h4>
                <p className="text-sm font-mono text-text-secondary mt-1 bg-bg-elevated px-2 py-0.5 rounded border border-border">{selectedStudent.smartId}</p>
                <div className="w-full mt-6 space-y-3">
                  {[
                    { label: 'Current Shift', value: selectedStudent.currentShift },
                    { label: 'Current Seat',  value: selectedStudent.currentSeat  },
                    { label: 'Valid Till',     value: selectedStudent.validTill    },
                    { label: 'Days Left',      value: `${daysLeft} days`           },
                    ...(newShift ? [{ label: 'New Shift', value: newShift }] : []),
                    ...(newSeat  ? [{ label: 'New Seat',  value: newSeat  }] : []),
                    ...(showCustomSlot && customStart && customEnd ? [{ label: 'Custom Slot', value: `${customStart} – ${customEnd}` }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                      <p className="text-sm text-text-secondary">{label}</p>
                      <p className="text-sm font-semibold text-text-primary">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-border z-40 lg:left-[260px]">
          <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm mr-auto" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}>
              <ArrowLeft size={15} />Back
            </button>
            <div className="flex gap-3">
              {step < 3 ? (
               <button
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm ml-auto"
                  disabled={step === 1 ? !selectedStudent : !newShift || !newSeat}
                  onClick={() => setStep(s => s + 1)}
                >
                  Next →
                </button>
              ) : (
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm ml-auto" onClick={() => setShowConfirm(true)}>
                  ✅ Confirm Migration
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showConfirm && selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowConfirm(false)}>
          <div className="bg-card w-full max-w-md md:max-w-lg rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-text-primary p-6 pb-0">✅ Confirm Migration</h2>
            <p className="text-text-secondary p-6 pt-2 pb-0 text-sm leading-relaxed">
              Old Seat <strong>{selectedStudent.currentSeat}</strong> ({selectedStudent.currentShift}) will be freed.
              New Seat <strong>{newSeat}</strong> ({newShift}) assigned.
              {showCustomSlot && customStart && customEnd && <> Custom slot: <strong>{customStart} – {customEnd}</strong>.</>}
              {' '}Fee adjustment: <strong>{isPaying ? '+' : ''}₹{Math.abs(adjustment)}</strong>. Confirm?
            </p>
            <div className="flex justify-end gap-3 p-6 border-t border-border bg-bg-elevated/30">
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={handleConfirmMigration}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

