'use client';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';

// RESPONSIBILITY: Renders the AdminShiftMigrationClient component.
import { ArrowLeft, Search, ChevronDown, CreditCard, QrCode, Banknote, CheckCircle, Clock } from 'lucide-react';
import { useAdminShiftMigration, PayMode } from '@/app/admin/admin_seats_shifts_lockers/shift-migration/admin_seats_shifts_lockers_hooks/useAdminShiftMigration';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AdminShiftMigrationClient() {
  const {
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
  } = useAdminShiftMigration();

  return (
    <div className="h-full flex flex-col pb-24 relative">
      {/* page Header */}
      <div className="flex flex-col items-center text-center justify-center gap-2 border-b pb-6 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Shift Migration Wizard</h1>
        <p className="text-sm text-muted-foreground max-w-lg">Move a student to a different shift with automatic fee adjustment.</p>
      </div>

      {/* Stepper */}
      <div className="w-full max-w-3xl mx-auto mb-10 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2 rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300 w-[length:var(--w)]" style={{ '--w': `${((step - 1) / 2) * 100}%` } as React.CSSProperties} />
        </div>
        <div className="relative flex justify-between z-10">
          {ADMIN_SEATS_STEPS.map(s => (
            <div key={s.n} className="flex flex-col items-center gap-2 bg-card px-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${
                step >= s.n 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'bg-card border-muted-foreground/30 text-muted-foreground'
              }`}>
                {step > s.n ? <CheckCircle size={18} /> : s.n}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                step >= s.n ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto w-full">
        <div className="flex-1 flex flex-col gap-6">

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <Card className="p-6 shadow-sm border-border bg-card flex flex-col gap-6">
              <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-3">
                <Search size={18} className="text-primary" /> Select Student
              </h3>
              
              <div className="relative w-full">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  className="pl-9 h-12 text-base"
                  placeholder="Search by name or Smart ID..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setSelectedStudent(null); }}
                />
              </div>

              {search && (
                <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-2">
                  {filteredStudents.length === 0 ? (
                    <p className="text-sm font-medium text-muted-foreground p-4 bg-muted/20 rounded-md text-center">No students found.</p>
                  ) : filteredStudents.map(s => (
                    <button
                      key={s.id}
                      className={`flex flex-col text-left p-4 rounded-md border transition-all ${
                        selectedStudent?.id === s.id 
                          ? 'bg-primary/5 border-primary ring-1 ring-primary' 
                          : 'bg-card border-border hover:border-primary/50 hover:bg-muted/30'
                      }`}
                      onClick={() => {
                        setSelectedStudent(s);
                        setNewShift(s.currentShift);
                        setNewSeat(s.currentSeat);
                      }}
                    >
                      <p className="font-bold text-primary text-base">{s.name}</p>
                      <p className="text-xs font-medium text-muted-foreground mt-1">{s.smartId} <span className="mx-2">•</span> {s.currentShift}</p>
                    </button>
                  ))}
                </div>
              )}
              
              {selectedStudent && (
                <div className="bg-primary/5 border border-primary/20 rounded-md p-5 flex flex-col gap-2">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">Current Details — {selectedStudent.name}</p>
                  <p className="text-sm font-medium text-primary leading-relaxed">
                    Shift: <strong>{selectedStudent.currentShift}</strong> <span className="mx-2 text-muted-foreground">•</span> 
                    Seat: <strong>{selectedStudent.currentSeat}</strong> <span className="mx-2 text-muted-foreground">•</span> 
                    Valid Till: <strong>{selectedStudent.validTill}</strong> <span className="mx-2 text-muted-foreground">•</span> 
                    Plan: <strong>{selectedStudent.plan}</strong> <span className="mx-2 text-muted-foreground">•</span> 
                    Days Left: <strong className="text-primary">{daysLeft}</strong>
                  </p>
                </div>
              )}
            </Card>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <Card className="p-6 shadow-sm border-border bg-card flex flex-col gap-6">
              <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-3">
                <ChevronDown size={18} className="text-primary" /> Choose New Slot
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">New Shift <span className="text-danger">*</span></label>
                  <AdminSearchableDropdown 
                    className="flex h-11 w-full items-center justify-between rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2"
                    value={newShift} 
                    onChange={e => { setNewShift(e.target.value); setNewSeat(''); }}
                  >
                    <option value="">Select shift...</option>
                    {ADMIN_SEATS_MOCK_SHIFT_RATES.map(sh => (
                      <option key={sh.name} value={sh.name}>{sh.name} ({sh.seats} seats free)</option>
                    ))}
                  </AdminSearchableDropdown>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">New Seat <span className="text-danger">*</span></label>
                  <AdminSearchableDropdown 
                    className="flex h-11 w-full items-center justify-between rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    value={newSeat} 
                    onChange={e => setNewSeat(e.target.value)} 
                    disabled={!newShift}
                  >
                    <option value="">Select seat...</option>
                    {newShift && ['B-01', 'B-02', 'B-03', 'B-04'].map(seat => (
                      <option key={seat}>{seat}</option>
                    ))}
                  </AdminSearchableDropdown>
                </div>
              </div>

              {/* Optional Custom Slot */}
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`border-dashed gap-2 ${showCustomSlot ? 'bg-muted text-muted-foreground' : 'text-primary border-primary/50'}`}
                  onClick={() => setShowCustomSlot(v => !v)}
                >
                  <Clock size={14} />
                  {showCustomSlot ? 'Remove Custom Slot' : 'Add Custom Time Slot (Optional)'}
                </Button>
              </div>
              
              {showCustomSlot && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-md border border-border">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Custom Start Time</label>
                    <Input type="time" className="h-10" value={customStart} onChange={e => setCustomStart(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Custom End Time</label>
                    <Input type="time" className="h-10" value={customEnd} onChange={e => setCustomEnd(e.target.value)} />
                  </div>
                </div>
              )}

              {newShift && (
                <div className="bg-success/5 border border-success/20 rounded-md p-5 mt-2 flex flex-col gap-2">
                  <p className="text-xs font-bold text-success uppercase tracking-wider">Availability</p>
                  <p className="text-sm font-medium text-primary leading-relaxed">
                    <strong>{selectedShiftData?.seats}</strong> seats available in <strong>{newShift}</strong> shift. 
                    Rate: <strong>₹{newRate}/day</strong>.
                    {showCustomSlot && customStart && customEnd && (
                      <span className="block mt-1">Custom slot: <strong>{customStart} â€“ {customEnd}</strong>.</span>
                    )}
                  </p>
                </div>
              )}
            </Card>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <>
              <Card className="p-6 shadow-sm border-border bg-card flex flex-col gap-6">
                <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-3">
                  <CheckCircle size={18} className="text-primary" /> Fee Adjustment
                </h3>
                
                <div className="flex flex-col gap-3 bg-muted/10 p-5 rounded-md border border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Old Rate</span>
                    <span className="font-mono font-bold">₹{oldRate}/day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">New Rate</span>
                    <span className="font-mono font-bold">₹{newRate}/day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Days Remaining</span>
                    <span className="font-mono font-bold">{daysLeft} days</span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-primary">Fee Adjustment</span>
                    <span className={`text-xl font-black font-mono tracking-tighter ${isPaying ? 'text-danger' : 'text-success'}`}>
                      {isPaying ? '+' : ''}₹{Math.abs(adjustment)}
                    </span>
                  </div>
                </div>
                
                <div className={`p-4 rounded-md border ${isPaying ? 'bg-danger/5 border-danger/20 text-danger' : adjustment < 0 ? 'bg-info/5 border-info/20 text-info' : 'bg-success/5 border-success/20 text-success'}`}>
                  <p className="text-sm font-bold flex items-center gap-2">
                    {isPaying
                      ? '🔴 Student pays more — collect ₹' + adjustment + ' before confirming.'
                      : adjustment < 0
                        ? 'ðŸ”µ Refund ₹' + Math.abs(adjustment) + ' to student.'
                        : '✅ No fee adjustment needed.'}
                  </p>
                </div>
              </Card>

              {isPaying && (
                <Card className="p-6 shadow-sm border-border bg-card flex flex-col gap-6">
                  <h3 className="text-lg font-bold border-b pb-3">Payment</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Cash', 'UPI', 'Card'] as PayMode[]).map(m => (
                      <Button
                        key={m}
                        variant={payMode === m ? 'default' : 'outline'}
                        className={`h-14 flex flex-col gap-1 ${payMode === m ? '' : 'text-muted-foreground'}`}
                        onClick={() => setPayMode(m)}
                      >
                        {m === 'Cash' ? <Banknote size={18} /> : m === 'UPI' ? <QrCode size={18} /> : <CreditCard size={18} />}
                        <span className="text-xs">{m}</span>
                      </Button>
                    ))}
                  </div>
                  {payMode !== 'Cash' && (
                    <div className="space-y-1.5 mt-2">
                      <label className="text-sm font-medium text-primary">Transaction ID</label>
                      <Input className="h-11" placeholder="Enter transaction reference" value={txnId} onChange={e => setTxnId(e.target.value)} />
                    </div>
                  )}
                </Card>
              )}

              <Card className="p-6 shadow-sm border-border bg-card flex flex-col gap-3">
                <label className="text-sm font-medium text-primary">Remark (optional)</label>
                <textarea 
                  className="flex min-h-20 w-full rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
                  placeholder="Any notes about this migration..." 
                  value={remark} 
                  onChange={e => setRemark(e.target.value)} 
                />
              </Card>
            </>
          )}

        </div>

        {/* Sidebar summary */}
        {selectedStudent && (
          <div className="w-full lg:w-80 shrink-0">
            <Card className="p-6 shadow-sm border-border bg-card sticky top-6">
              <h4 className="text-lg font-black text-primary">{selectedStudent.name}</h4>
              <p className="text-xs font-mono text-muted-foreground mb-6">{selectedStudent.smartId}</p>
              
              <div className="space-y-4">
                {[
                  { label: 'Current Shift', value: selectedStudent.currentShift },
                  { label: 'Current Seat',  value: selectedStudent.currentSeat  },
                  { label: 'Valid Till',     value: selectedStudent.validTill    },
                  { label: 'Days Left',      value: `${daysLeft} days`           },
                  ...(newShift ? [{ label: 'New Shift', value: newShift, highlight: true }] : []),
                  ...(newSeat  ? [{ label: 'New Seat',  value: newSeat, highlight: true  }] : []),
                  ...(showCustomSlot && customStart && customEnd ? [{ label: 'Custom Slot', value: `${customStart} â€“ ${customEnd}`, highlight: true }] : []),
                ].map(({ label, value, highlight }) => (
                  <div key={label} className={`flex flex-col gap-1 pb-3 border-b border-border last:border-0 last:pb-0 ${highlight ? 'text-primary' : ''}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider ${highlight ? 'text-primary/70' : 'text-muted-foreground'}`}>{label}</p>
                    <p className={`text-sm font-bold ${highlight ? 'text-primary' : 'text-primary'}`}>{value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 z-40 bg-black/60 backdrop-blur-md border-t border-border shadow-md shadow-black/5">
        <div className="max-w-6xl mx-auto w-full px-6 py-4 flex items-center justify-between">
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={() => setStep(s => Math.max(1, s - 1))} 
            disabled={step === 1}
          >
            <ArrowLeft size={16} /> Back
          </Button>
          
          <div>
            {step < 3 ? (
              <Button
                variant="default"
                className="gap-2 px-8"
                disabled={step === 1 ? !selectedStudent : !newShift || !newSeat}
                onClick={() => setStep(s => s + 1)}
              >
                Next <ArrowLeft size={16} className="rotate-180" />
              </Button>
            ) : (
              <Button 
                variant="default" 
                className="bg-primary hover:bg-primary/90 gap-2 px-8 font-bold" 
                onClick={() => setShowConfirm(true)}
              >
                <CheckCircle size={16} /> Confirm Migration
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowConfirm(false)}>
          <Card className="w-full max-w-md shadow-lg border-border bg-card p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
              <CheckCircle size={24} /> Confirm Migration
            </h2>
            <p className="text-sm text-primary leading-relaxed bg-muted/30 p-4 rounded-md border border-border">
              Old Seat <strong>{selectedStudent.currentSeat}</strong> ({selectedStudent.currentShift}) will be freed.<br/>
              New Seat <strong>{newSeat}</strong> ({newShift}) assigned.<br/>
              {showCustomSlot && customStart && customEnd && <span className="block mt-2">Custom slot: <strong>{customStart} â€“ {customEnd}</strong>.<br/></span>}
              <span className="block mt-4 pt-4 border-t border-border text-base">
                Fee adjustment: <strong className={isPaying ? 'text-danger' : 'text-success'}>{isPaying ? '+' : ''}₹{Math.abs(adjustment)}</strong>
              </span>
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setShowConfirm(false)}>Cancel</Button>
              <Button variant="default" onClick={handleConfirmMigration}>Confirm</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

