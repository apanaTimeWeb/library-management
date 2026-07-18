// RESPONSIBILITY: Renders the FinanceCollectFeeClient component.
'use client';

import { Toaster } from 'react-hot-toast';
import { Search, CheckCircle, IndianRupee, BookOpen, MessageSquare, Printer, X } from 'lucide-react';
import { formatCurrency } from '@/app/admin/admin_finance/admin_finance_utils/format';
import { ADMIN_FINANCE_MODES } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import { useFinanceCollectFee, MODE_LABELS, maskPhone } from '@/app/admin/admin_finance/collect-fee/admin_finance_collect_fee_hooks/useFinanceCollectFee';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function FinanceCollectFeeClient() {
  const {
    search,
    setSearch,
    showDropdown,
    setShowDropdown,
    selectedStudent,
    amount,
    setAmount,
    mode,
    setMode,
    txnId,
    setTxnId,
    couponCode,
    setCouponCode,
    couponDiscount,
    couponStatus,
    lateFee,
    setLateFee,
    lateFeeOverride,
    setLateFeeOverride,
    remark,
    setRemark,
    isSubmitting,
    receiptData,
    setReceiptData,
    filteredStudents,
    total,
    baseAmount,
    lateFeeAmt,
    resetForm,
    handleStudentSelect,
    handleApplyCoupon,
    handleCollect,
    handlePrintReceipt
  } = useFinanceCollectFee();

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{
        style: { background: 'hsl(var(--bg-card))', color: 'hsl(var(--text-primary))', border: '1px solid hsl(var(--border))', fontSize: 13 }
      }} />

      {/* Receipt Modal */}
      {receiptData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto" onClick={() => setReceiptData(null)}>
          <div className="w-full max-w-md bg-card rounded-xl shadow-2xl border border-border flex flex-col my-auto" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20 rounded-t-xl">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2 text-primary">
                  🎉 Payment Collected!
                </h2>
                <Badge variant="secondary" className="mt-1 bg-success/10 text-success border-none font-bold text-xs gap-1">
                  <CheckCircle size={12} /> {receiptData.receiptNo}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setReceiptData(null)}>
                <X size={16} />
              </Button>
            </div>
            
            {/* Modal Body - Thermal Ticket */}
            <div className="p-6 bg-muted/5">
              <div className="bg-white text-black font-mono text-sm max-w-80 mx-auto shadow-sm border border-gray-200 relative overflow-hidden">
                {/* Top Zigzag */}
                <div className="absolute top-0 left-0 right-0 h-2 flex overflow-hidden">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex-1 border-t-8 border-l-8 border-r-8 border-t-bg-card border-l-transparent border-r-transparent -mt-1" />
                  ))}
                </div>

                <div className="p-6 pt-8 pb-8 flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full border-2 border-black flex items-center justify-center mb-2">
                    <BookOpen size={24} className="text-black" />
                  </div>
                  <p className="font-bold text-base tracking-widest uppercase mb-1">Smart Library 360</p>
                  <p className="text-xs uppercase tracking-widest border-b border-black/30 pb-2 mb-4 w-full text-center">Payment Receipt</p>
                  
                  <div className="w-full border border-black/20 p-2 mb-4 text-center bg-gray-50">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Receipt Number</p>
                    <p className="font-bold text-sm">{receiptData.receiptNo}</p>
                  </div>

                  <div className="w-full space-y-1.5 mb-4 text-xs">
                    {[
                      ['Date',    receiptData.date],
                      ['Student', receiptData.studentName],
                      ['Smart ID',receiptData.studentId],
                      ['Phone',   `+91-${maskPhone(receiptData.phone)}`],
                      ['Mode',    MODE_LABELS[receiptData.mode]],
                    ].map(([l, v]) => (
                      <div key={l} className="flex justify-between w-full">
                        <span className="text-gray-500">{l}</span>
                        <span className="font-bold text-right">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full border-t-2 border-dashed border-black/30 pt-3 pb-3 mb-4 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Paid</p>
                    <p className="text-2xl font-bold">₹{receiptData.total.toFixed(0)}</p>
                  </div>

                  <div className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                    <CheckCircle size={12} />
                    <span>Payment Received</span>
                  </div>

                  <p className="text-xs italic text-gray-500 text-center">"Knowledge is the best investment."</p>
                  <p className="text-xs font-bold mt-1">Thank you! Keep studying 😊</p>
                </div>

                {/* Bottom Zigzag */}
                <div className="absolute bottom-0 left-0 right-0 h-2 flex overflow-hidden">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex-1 border-b-8 border-l-8 border-r-8 border-b-bg-card border-l-transparent border-r-transparent -mb-1" />
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-muted/20 border-t border-border flex flex-col gap-3 rounded-b-xl">
              <Button 
                onClick={() => { /* openWhatsApp stub */ }}
                className="w-full bg-success hover:bg-success/90 text-white font-bold gap-2"
              >
                <MessageSquare size={16} /> Send Receipt on WhatsApp
              </Button>
              <Button 
                variant="outline"
                onClick={handlePrintReceipt}
                className="w-full font-bold gap-2 bg-bg-card"
              >
                <Printer size={16} /> Print Receipt (Thermal 80mm)
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setReceiptData(null)}
                className="w-full text-muted-foreground font-bold"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="h-full flex flex-col pb-10 space-y-6 relative">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
          <div>
            <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Finance</nav>
            <h1 className="text-2xl font-bold tracking-tight">Collect Fee</h1>
            <p className="text-sm text-muted-foreground mt-1">Record a new payment from a student.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left — Form */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="p-6 shadow-none border-border bg-card space-y-4">
              <h3 className="font-bold text-sm tracking-widest uppercase text-muted-foreground mb-4">Student <span className="text-danger">*</span></h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  className="pl-9 h-11 text-base" 
                  placeholder="Search by name or Smart ID..." 
                  value={search}
                  onChange={e => { setSearch(e.target.value); setShowDropdown(true); }}
                  onFocus={() => setShowDropdown(true)} 
                />
              </div>
              {showDropdown && search.length >= 2 && !selectedStudent && (
                <div className="absolute z-20 w-11/12 max-w-md mt-1 bg-card border border-border rounded-md shadow-xl max-h-60 overflow-y-auto">
                  {filteredStudents.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground text-center">No students found</div>
                  ) : filteredStudents.map(s => (
                    <button 
                      key={s.id} 
                      className="w-full text-left p-3 border-b border-border hover:bg-muted/30 transition-colors flex justify-between items-center last:border-b-0" 
                      onClick={() => handleStudentSelect(s)}
                    >
                      <div>
                        <div className="font-bold text-sm text-primary">{s.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.smartId} · {s.plan} · +91-{maskPhone(s.phone)}</div>
                      </div>
                      <Badge variant="secondary" className={`${s.status === 'active' ? 'bg-success/10 text-success' : s.status === 'suspended' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'} border-none uppercase tracking-wider font-bold text-xs`}>
                        {s.status}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}
              {selectedStudent && (
                <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/30 rounded-md">
                  <CheckCircle size={18} className="text-success" />
                  <span className="font-bold text-sm text-success">{selectedStudent.name}</span>
                  <span className="text-xs text-success/80 font-medium">({selectedStudent.smartId})</span>
                  <span className="text-xs text-success/80">· +91-{maskPhone(selectedStudent.phone)}</span>
                </div>
              )}
              {selectedStudent != null && selectedStudent.dueAmount > 0 && (
                <div className="p-3 bg-danger/10 border border-danger/30 rounded-md text-danger font-bold text-sm text-center">
                  🔴 Due Amount: {formatCurrency(selectedStudent.dueAmount)} pending
                </div>
              )}
            </Card>

            <Card className="p-6 shadow-none border-border bg-card space-y-5">
              <h3 className="font-bold text-sm tracking-widest uppercase text-muted-foreground mb-4">Payment Details</h3>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">Amount <span className="text-danger">*</span></label>
                <div className="relative">
                  <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    type="number" 
                    className="pl-9 h-11 text-base font-bold" 
                    placeholder="0.00" 
                    value={amount} 
                    onChange={e => setAmount(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">Payment Mode</label>
                <div className="flex gap-2 flex-wrap">
                  {ADMIN_FINANCE_MODES.map((m) => (
                    <Badge 
                      key={m} 
                      variant="secondary"
                      onClick={() => setMode(m)} 
                      className={`cursor-pointer px-4 py-2 border-none font-bold text-xs uppercase tracking-wider transition-colors ${mode === m ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                    >
                      {MODE_LABELS[m]}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {mode !== 'cash' && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1">
                  <label className="text-sm font-medium text-primary">Transaction ID <span className="text-danger">*</span></label>
                  <Input 
                    className="h-10" 
                    placeholder="Enter transaction reference" 
                    value={txnId} 
                    onChange={e => setTxnId(e.target.value)} 
                  />
                </div>
              )}
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">Coupon Code</label>
                <div className="flex gap-2">
                  <Input 
                    className="flex-1 h-10 uppercase" 
                    placeholder="e.g. SAVE50" 
                    value={couponCode}
                    onChange={e => { setCouponCode(e.target.value); }} 
                  />
                  <Button variant="secondary" onClick={handleApplyCoupon} className="font-bold">Apply</Button>
                </div>
                {couponStatus === 'valid' && <p className="text-xs font-bold text-success mt-1 flex items-center gap-1"><CheckCircle size={12}/> {formatCurrency(couponDiscount)} discount applied</p>}
                {couponStatus === 'invalid' && <p className="text-xs font-bold text-danger mt-1 flex items-center gap-1"><X size={12}/> Invalid/expired code</p>}
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-primary">Late Fee</label>
                  <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer hover:text-primary">
                    <input type="checkbox" checked={lateFeeOverride} onChange={e => setLateFeeOverride(e.target.checked)} className="rounded border-border" /> Override
                  </label>
                </div>
                <Input 
                  type="number" 
                  className="h-10" 
                  value={lateFee} 
                  onChange={e => setLateFee(e.target.value)} 
                  disabled={!lateFeeOverride} 
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">Remark (optional)</label>
                <Textarea 
                  className="resize-none" 
                  rows={2} 
                  placeholder="Any notes..." 
                  value={remark} 
                  onChange={e => setRemark(e.target.value)} 
                />
              </div>
            </Card>
          </div>

          {/* Right — Receipt Preview */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-4">
              <h3 className="font-bold text-sm tracking-widest uppercase text-muted-foreground mb-4">Receipt Preview</h3>
              <div className="bg-white text-black font-mono text-sm shadow-sm border border-border relative overflow-hidden rounded-lg opacity-90 transition-opacity hover:opacity-100">
                <div className="p-6 pt-8 pb-8 flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full border-2 border-black flex items-center justify-center mb-2">
                    <BookOpen size={20} className="text-black" />
                  </div>
                  <p className="font-bold text-sm tracking-widest uppercase mb-1">Smart Library 360</p>
                  <p className="text-xs uppercase tracking-widest border-b border-black/30 pb-2 mb-4 w-full text-center">Payment Receipt</p>
                  
                  <div className="w-full space-y-2 mb-4 text-xs">
                    <div className="flex justify-between w-full">
                      <span className="text-gray-500">Date</span>
                      <span className="font-bold text-right">{new Date().toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span className="text-gray-500">Student</span>
                      <span className="font-bold text-right">{selectedStudent?.name || '—'}</span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span className="text-gray-500">Smart ID</span>
                      <span className="font-bold text-right">{selectedStudent?.smartId || '—'}</span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span className="text-gray-500">Mode</span>
                      <span className="font-bold text-right">{MODE_LABELS[mode]}</span>
                    </div>
                  </div>

                  <div className="w-full border-t border-dashed border-black/30 pt-3 mb-4 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-xl font-bold">₹{total > 0 ? total.toFixed(0) : '0'}</p>
                  </div>
                  
                  <Button
                    onClick={handleCollect}
                    disabled={!selectedStudent || !amount || parseFloat(amount) <= 0 || isSubmitting}
                    className={`w-full h-12 font-bold text-sm rounded-none border-none transition-all ${(!selectedStudent || !amount || parseFloat(amount) <= 0 || isSubmitting) ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-success hover:bg-success/90 text-white shadow-lg shadow-success/20'}`}
                  >
                    <CheckCircle size={16} className="mr-2" />
                    {isSubmitting ? 'Processing...' : 'Received by Manager'}
                  </Button>
                  
                  <p className="text-xs italic text-muted-foreground text-center mt-4">"Knowledge is the best investment."</p>
                </div>
              </div>
              <Button variant="outline" className="w-full text-muted-foreground font-bold" onClick={resetForm}>🚫 Cancel & Reset</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
