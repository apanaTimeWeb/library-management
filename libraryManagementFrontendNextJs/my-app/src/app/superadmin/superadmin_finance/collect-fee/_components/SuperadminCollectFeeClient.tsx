'use client';
// RESPONSIBILITY: Renders the SuperadminCollectFeeClient component.
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/Superadminsuperadmin_format';
import { Search, CheckCircle, IndianRupee, BookOpen } from 'lucide-react';
import { printThermal } from '@/lib/thermalPrint';
import type { SuperadminFinanceCollectFeeMode } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { useSuperadminCollectFeeClient } from '@/app/superadmin/superadmin_finance/collect-fee/_components/useSuperadminCollectFeeClient';
import { SuperadminCollectFeeReceiptModal } from '@/app/superadmin/superadmin_finance/collect-fee/_components/SuperadminCollectFeeReceiptModal';

const MODES = ['cash', 'upi', 'card', 'bank'] as const;
const MODE_LABELS: Record<SuperadminFinanceCollectFeeMode, string> = { cash: 'Cash', upi: 'UPI', card: 'Card', bank: 'Bank Transfer' };

function maskPhone(phone: string): string {
  const d = phone.replace(/\D/g, '').slice(-10);
  return `${d.slice(0, 2)}****${d.slice(6)}`;
}

export function SuperadminCollectFeeClient() {
  const {
    form, search, setSearch, showDropdown, setShowDropdown,
    selectedStudent, filteredStudents, handleSelectStudent,
    couponStatus, setCouponStatus, setCouponDiscount, handleApplyCoupon,
    isSubmitting, receiptData, setReceiptData, total, currentMode,
    lateFeeOverride, onSubmit, resetForm
  } = useSuperadminCollectFeeClient();

  const { register, formState: { errors }, watch, setValue } = form;
  const currentAmount = watch('amount');

  function handlePrintReceipt() {
    if (!receiptData) return;
    printThermal({
      type: 'receipt', shopName: 'Smart Library 360', branch: 'Main Branch',
      studentName: receiptData.studentName, smartId: receiptData.studentId,
      phone: receiptData.phone, shift: receiptData.student.shift,
      seat: receiptData.student.seat, plan: receiptData.student.plan,
      billNumber: receiptData.receiptNo, date: receiptData.date,
      totalPayable: receiptData.amount + receiptData.lateFee,
      amountPaid: receiptData.total, discount: receiptData.couponDiscount,
      balance: 0, paymentMode: MODE_LABELS[receiptData.mode],
      transactionId: receiptData.txnId || undefined,
    });
  }

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{
        className: 'bg-card text-text-primary border border-border text-sm'
      }} />

      {receiptData && (
        <SuperadminCollectFeeReceiptModal 
          receiptData={receiptData} 
          onClose={() => setReceiptData(null)} 
          onPrint={handlePrintReceipt} 
        />
      )}

      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Collect Fee</h1>
          <p className="text-xs text-text-secondary">Record a new payment from a student.</p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left — Form */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <p className="text-sm font-bold text-text-secondary uppercase tracking-wider block mb-1">Student <span className="text-danger">*</span></p>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input 
                  className="w-full bg-input border border-border rounded-md py-2.5 pl-9 pr-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" 
                  placeholder="Search by name or Smart ID..." 
                  value={search}
                  onChange={e => { setSearch(e.target.value); handleSelectStudent(null); setShowDropdown(true); }}
                  onFocus={() => setShowDropdown(true)} 
                />
              </div>
              
              {showDropdown && search.length >= 2 && !selectedStudent && (
                <div className="absolute z-10 w-full max-w-md bg-card border border-border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {filteredStudents.length === 0 ? (
                    <div className="p-4 text-center text-xs text-text-secondary">No students found</div>
                  ) : filteredStudents.map((s) => (
                    <button key={s.id} type="button" className="w-full text-left p-3 border-b border-border hover:bg-primary/5 transition-colors flex justify-between items-center" onClick={() => handleSelectStudent(s)}>
                      <div>
                        <div className="font-medium text-text-primary">{s.name}</div>
                        <div className="text-xs text-text-secondary">{s.smartId} · {s.plan} · +91-{maskPhone(s.phone)}</div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.status === 'active' ? 'bg-success text-success-foreground' : s.status === 'suspended' ? 'bg-danger text-danger-foreground' : 'bg-warning text-warning-foreground'}`}>{s.status}</span>
                    </button>
                  ))}
                </div>
              )}
              
              {selectedStudent && (
                <div className="flex items-center gap-2 bg-success/10 text-success border border-success/20 p-3 rounded-md">
                  <CheckCircle size={16} />
                  <span className="font-bold text-sm">{selectedStudent.name}</span>
                  <span className="text-xs">({selectedStudent.smartId})</span>
                  <span className="text-xs">· +91-{maskPhone(selectedStudent.phone)}</span>
                </div>
              )}
              
              {selectedStudent != null && selectedStudent.dueAmount > 0 && (
                <div className="bg-danger text-danger-foreground text-xs font-semibold p-2 rounded flex justify-center">
                  🔴 Due Amount: {formatCurrency(selectedStudent.dueAmount)} pending
                </div>
              )}
            </div>

            <div className="bg-card rounded-lg border border-border p-6 space-y-5">
              <p className="text-sm font-bold text-text-secondary uppercase tracking-wider block border-b border-border pb-2">Payment Details</p>
              
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Amount <span className="text-danger">*</span></label>
                <div className="relative mt-1">
                  <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input 
                    type="number" 
                    {...register('amount', { valueAsNumber: true })}
                    className={`w-full bg-input border ${errors.amount ? 'border-danger' : 'border-border'} rounded-md py-2.5 pl-8 pr-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors`} 
                    placeholder="0.00" 
                  />
                </div>
                {errors.amount && <p className="text-danger text-xs mt-1">{errors.amount.message}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-text-secondary block mb-2">Payment Mode</label>
                <div className="flex gap-2 flex-wrap">
                  {MODES.map((m) => (
                    <button 
                      key={m} 
                      type="button"
                      onClick={() => setValue('mode', m, { shouldValidate: true })} 
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${currentMode === m ? 'bg-primary/10 text-primary border-primary ring-2 ring-primary/30' : 'bg-transparent text-text-secondary border-border hover:bg-input'}`}
                    >
                      {MODE_LABELS[m]}
                    </button>
                  ))}
                </div>
              </div>
              
              {currentMode !== 'cash' && (
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1">Transaction ID <span className="text-danger">*</span></label>
                  <input 
                    {...register('txnId')}
                    className={`w-full bg-input border ${errors.txnId ? 'border-danger' : 'border-border'} rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors`} 
                    placeholder="Enter transaction reference" 
                  />
                  {errors.txnId && <p className="text-danger text-xs mt-1">{errors.txnId.message}</p>}
                </div>
              )}
              
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Coupon Code</label>
                <div className="flex gap-2 mt-1">
                  <input 
                    {...register('couponCode')}
                    className="flex-1 bg-input border border-border rounded-md py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" 
                    placeholder="e.g. SAVE50" 
                    onChange={e => { setValue('couponCode', e.target.value); setCouponStatus('idle'); setCouponDiscount(0); }} 
                  />
                  <button type="button" className="px-4 py-2 bg-input border border-border text-text-primary text-xs font-bold rounded-md hover:bg-bg-pageorder transition-colors cursor-pointer" onClick={handleApplyCoupon}>Apply</button>
                </div>
                {couponStatus === 'valid' && <p className="text-success text-xs mt-1 font-semibold">{formatCurrency(watch('amount') ? watch('amount') * 0.1 : 0)} discount applied (assuming logic applies)</p>}
                {couponStatus === 'invalid' && <p className="text-danger text-xs mt-1">❌ Invalid/expired code</p>}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-text-secondary block mb-1">Late Fee</label>
                  <label className="flex items-center gap-1 text-xs font-semibold text-text-secondary cursor-pointer">
                    <input type="checkbox" {...register('lateFeeOverride')} className="rounded border-border bg-input" /> Override
                  </label>
                </div>
                <input 
                  type="number" 
                  {...register('lateFee', { valueAsNumber: true })} 
                  className={`w-full bg-input border ${errors.lateFee ? 'border-danger' : 'border-border'} rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors ${!lateFeeOverride ? 'opacity-60' : ''}`}
                  readOnly={!lateFeeOverride} 
                />
                {errors.lateFee && <p className="text-danger text-xs mt-1">{errors.lateFee.message}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Remark (optional)</label>
                <textarea 
                  {...register('remark')}
                  className="w-full bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" 
                  rows={2} 
                  placeholder="Any notes..." 
                />
              </div>
            </div>
          </div>

          {/* Right — Receipt Preview (Static Layout representation) */}
          <div className="lg:col-span-2">
            <div className="sticky top-6">
              <div className="bg-white text-black rounded-lg overflow-hidden shadow-md flex flex-col font-mono relative p-6 items-center">
                
                {/* Thermal receipt zig-zag top */}
                <div className="h-2 w-full flex space-x-1 absolute top-0">
                  {Array.from({ length: 20 }).map((_, i) => <div key={i} className="w-4 h-4 bg-page rotate-45 -mt-2" />)}
                </div>

                <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center mb-2 mt-4"><BookOpen size={24} className="text-black" /></div>
                <p className="font-bold text-lg text-center leading-tight">Smart Library 360</p>
                <p className="text-sm font-medium mb-6 text-center text-text-secondary">Payment Receipt</p>
                
                <div className="w-full text-sm space-y-2 mb-6">
                  {[
                    ['Date',    new Date().toLocaleDateString('en-IN')],
                    ['Student', selectedStudent?.name || '—'],
                    ['Smart ID',selectedStudent?.smartId || '—'],
                    ['Phone',   selectedStudent ? `+91-${maskPhone(selectedStudent.phone)}` : '—'],
                    ['Mode',    MODE_LABELS[currentMode]],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between border-b border-border pb-1">
                      <span className="text-text-secondary">{l}</span>
                      <span className="font-semibold text-right">{v}</span>
                    </div>
                  ))}
                </div>
                
                <div className="w-full border-t border-dashed border-border pt-4 pb-4 mb-4 flex justify-between items-center">
                  <p className="text-sm font-bold text-text-secondary">Total Amount</p>
                  <p className="text-xl font-bold">₹{total > 0 ? total.toFixed(0) : '0'}</p>
                </div>
                
                <button
                  type="submit"
                  disabled={!selectedStudent || !currentAmount || currentAmount <= 0 || isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded text-sm font-bold transition-all ${(!selectedStudent || !currentAmount || currentAmount <= 0 || isSubmitting) ? 'bg-bg-pageorder text-text-secondary cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 shadow-md cursor-pointer'}`}
                >
                  <CheckCircle size={18} />
                  <span>{isSubmitting ? 'Processing...' : 'Collect Payment'}</span>
                </button>
                
                <p className="text-xs italic text-text-secondary mt-6 text-center">&quot;Knowledge is the best investment.&quot;</p>
                
                {/* Thermal receipt zig-zag bottom */}
                <div className="h-2 w-full flex space-x-1 absolute bottom-0">
                  {Array.from({ length: 20 }).map((_, i) => <div key={i} className="w-4 h-4 bg-page rotate-45 mb-[-8px]" />)}
                </div>
              </div>
              
              <div className="mt-4">
                <button type="button" className="w-full bg-transparent border border-border text-text-primary px-4 py-2.5 rounded-md text-sm font-bold hover:bg-input transition-all cursor-pointer" onClick={resetForm}>
                  🚫 Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

