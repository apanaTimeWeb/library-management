// RESPONSIBILITY: Renders the ReceiptClient component.
'use client';

import { useRouter } from 'next/navigation';
import { Search, Receipt, Printer, Send } from 'lucide-react';
import { formatCurrency, formatDate } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useReceiptClient } from './useReceiptClient';
import type { SuperadminFinanceReceiptFilterMode } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';

const MODE_BADGE: Record<string, string> = {
  upi: 'bg-pay-upi/10 text-pay-upi border-pay-upi/20', 
  cash: 'bg-pay-cash/10 text-pay-cash border-pay-cash/20',
  card: 'bg-pay-card/10 text-pay-card border-pay-card/20', 
  'bank transfer': 'bg-pay-bank/10 text-pay-bank border-pay-bank/20',
};

export function ReceiptClient() {
  const router = useRouter();
  const {
    search, setSearch, modeFilter, setModeFilter, filtered,
    totalCollected, totalReceipts, thisMonthCount,
    handleWhatsApp, handlePrint,
  } = useReceiptClient();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-text-primary">Receipts</h1>
        <p className="text-[12px] text-text-secondary">View and share payment receipts for all transactions.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'TOTAL RECEIPTS', value: totalReceipts },
          { label: 'TOTAL COLLECTED', value: formatCurrency(totalCollected), success: true },
          { label: 'THIS MONTH', value: thisMonthCount },
        ].map((k) => (
          <div key={k.label} className="bg-card rounded-[var(--radius-lg)] border border-border p-4 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2 relative z-10">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${k.success ? 'text-success' : 'text-text-secondary'}`}>{k.label}</span>
              <div className={`w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${k.success ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                <Receipt size={16} />
              </div>
            </div>
            <p className={`text-[28px] font-black tracking-tight relative z-10 ${k.success ? 'text-success' : 'text-text-primary'}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 bg-card p-3 rounded-[var(--radius-lg)] border border-border w-fit">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input 
            className="w-full bg-input border border-border rounded-[var(--radius-md)] py-2 pl-9 pr-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" 
            placeholder="Search receipt no., name or ID..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <div className="w-48">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Modes', value: 'all' },
              { label: 'UPI', value: 'upi' },
              { label: 'Cash', value: 'cash' },
              { label: 'Card', value: 'card' },
              { label: 'Bank Transfer', value: 'bank transfer' }
            ]}
            value={modeFilter}
            onChange={(val) => setModeFilter(val as SuperadminFinanceReceiptFilterMode)}
          />
        </div>
      </div>

      <div className="bg-card rounded-[var(--radius-lg)] border border-border overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 uppercase text-[12px] font-semibold text-text-secondary border-b border-border">
              <th className="py-3 px-4">Receipt No.</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4 max-w-[180px]">Plan</th>
              <th className="py-3 px-4">Date</th>
              <th className="text-right py-3 px-4">Amount</th>
              <th className="py-3 px-4">Mode</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                    <div className="text-4xl text-text-secondary"><Receipt size={40} /></div>
                    <p className="text-[16px] text-text-secondary">No receipts found.</p>
                  </div>
                </td>
              </tr>
            ) : filtered.map((r) => (
              <tr 
                key={r.id} 
                className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors cursor-pointer group" 
                onClick={() => router.push(`/superadmin/superadmin_finance/receipt/${r.id}`)}
              >
                <td className="py-3 px-4">
                  <span className="font-mono text-[14px] font-bold text-text-primary">{r.receiptNumber}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-[14px] text-text-primary group-hover:text-primary transition-colors">{r.studentName}</div>
                  <div className="text-[12px] text-text-secondary">{r.studentId}</div>
                </td>
                <td className="py-3 px-4 text-[12px] text-text-secondary max-w-[180px] truncate">{r.planName}</td>
                <td className="py-3 px-4 text-[12px] text-text-secondary">{formatDate(r.date)}</td>
                <td className="py-3 px-4 text-right font-semibold text-[14px] text-text-primary">{formatCurrency(r.amount)}</td>
                <td className="py-3 px-4">
                  <span className={`${MODE_BADGE[r.paymentMode.toLowerCase()] || 'bg-info/10 text-info border-info/20'} px-2 py-0.5 rounded-[var(--radius-full)] text-[11px] font-bold border capitalize`}>
                    {r.paymentMode}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] bg-input text-text-primary border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors" 
                      onClick={(e) => { e.stopPropagation(); handlePrint(r); }} 
                      title="Print (Thermal)"
                    >
                      <Printer size={14} />
                    </button>
                    <button 
                      className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] bg-success/10 text-success border border-success/20 hover:bg-success hover:text-success-foreground transition-colors" 
                      onClick={(e) => { e.stopPropagation(); handleWhatsApp(r); }} 
                      title="Send WhatsApp"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
