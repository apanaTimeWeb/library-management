/**
 * RESPONSIBILITY: Renders the thermal receipt modal and handles printing/sharing.
 */
import React from 'react';
import { BookOpen, CheckCircle, MessageSquare, Printer, X } from 'lucide-react';
import { openWhatsApp } from '@/lib/whatsappUtils';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import type { SuperadminFinanceReceiptData, SuperadminFinanceCollectFeeMode } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';

interface Props {
  receiptData: SuperadminFinanceReceiptData;
  onClose: () => void;
  onPrint: () => void;
}

const MODE_LABELS: Record<SuperadminFinanceCollectFeeMode, string> = { cash: 'Cash', upi: 'UPI', card: 'Card', bank: 'Bank Transfer' };

function maskPhone(phone: string): string {
  const d = phone.replace(/\D/g, '').slice(-10);
  return `${d.slice(0, 2)}****${d.slice(6)}`;
}

export function CollectFeeReceiptModal({ receiptData, onClose, onPrint }: Props) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} role="dialog" aria-modal="true">
      <div className="relative w-full max-w-2xl bg-card rounded-[var(--radius-xl)] shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        
        {/* Left Side: Thermal Receipt Preview */}
        <div className="flex-1 bg-page p-6 md:p-8 border-r border-border flex flex-col items-center justify-center">
          <div className="w-full max-w-sm bg-white text-black shadow-lg relative overflow-hidden" style={{ fontFamily: 'monospace' }}>
            <div className="h-2 w-full flex space-x-1 absolute top-0">
              {Array.from({ length: 20 }).map((_, i) => <div key={i} className="w-4 h-4 bg-page rotate-45 -mt-2" />)}
            </div>
            
            <div className="p-6 pt-8 pb-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center mb-2"><BookOpen size={24} className="text-black" /></div>
              <p className="font-bold text-lg">Smart Library 360</p>
              <p className="text-sm font-medium mb-4">Payment Receipt</p>
              
              <div className="border border-dashed border-gray-400 p-2 w-full mb-4">
                <p className="text-xs text-gray-500">Receipt Number</p>
                <p className="font-bold">{receiptData.receiptNo}</p>
              </div>
              
              <div className="w-full text-sm space-y-1 mb-4 text-left">
                {[
                  ['Date',    receiptData.date],
                  ['Student', receiptData.studentName],
                  ['Smart ID',receiptData.studentId],
                  ['Phone',   `+91-${maskPhone(receiptData.phone)}`],
                  ['Mode',    MODE_LABELS[receiptData.mode]],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between">
                    <span className="text-gray-600">{l}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              
              <div className="w-full border-t border-dashed border-gray-400 pt-3 pb-3 mb-4 flex justify-between items-center">
                <p className="text-sm font-bold text-gray-600">Total Paid</p>
                <p className="text-xl font-bold">₹{receiptData.total.toFixed(0)}</p>
              </div>
              
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full mb-4">
                <CheckCircle size={14} />
                <span className="text-xs font-bold uppercase">Payment Received</span>
              </div>
              
              <p className="text-[10px] italic text-gray-500">&quot;Knowledge is the best investment.&quot;</p>
              <p className="text-[10px] font-bold mt-1">Thank you! Keep studying 😊</p>
            </div>
            
            <div className="h-2 w-full flex space-x-1 absolute bottom-0">
              {Array.from({ length: 20 }).map((_, i) => <div key={i} className="w-4 h-4 bg-page rotate-45 mb-[-8px]" />)}
            </div>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="w-full md:w-80 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text-primary">🎉 Success!</h2>
              <button className="text-text-secondary hover:text-danger transition-colors cursor-pointer" onClick={onClose} aria-label="Close"><X size={18} /></button>
            </div>
            
            <p className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-3">Send / Print Receipt</p>
            
            <div className="space-y-3">
              <button 
                className="w-full bg-[#25D366] text-white px-4 py-2.5 rounded-[var(--radius-md)] text-[14px] font-bold flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-sm cursor-pointer"
                onClick={() => openWhatsApp(receiptData.phone, receiptData.waMessage)}
              >
                <MessageSquare size={16} /> Send WhatsApp Receipt
              </button>
              <p className="text-[11px] text-text-secondary text-center">📱 +91-{maskPhone(receiptData.phone)}</p>
              
              <div className="h-px w-full bg-border my-4" />
              
              <button 
                className="w-full bg-transparent border-2 border-border text-text-primary px-4 py-2.5 rounded-[var(--radius-md)] text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-input transition-all cursor-pointer"
                onClick={onPrint}
              >
                <Printer size={15} /> Print Thermal (80mm)
              </button>
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="bg-input rounded-[var(--radius-md)] p-3 text-[12px] space-y-2">
              <div className="flex justify-between"><span className="text-text-secondary">Receipt</span><span className="font-semibold text-text-primary">{receiptData.receiptNo}</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Amount</span><span className="font-bold text-success">{formatCurrency(receiptData.total)}</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Mode</span><span className="font-semibold text-text-primary">{MODE_LABELS[receiptData.mode]}</span></div>
            </div>
            <button 
              className="w-full bg-border text-text-primary px-4 py-2 rounded-[var(--radius-md)] text-[14px] font-bold hover:bg-border-focus transition-all cursor-pointer"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
