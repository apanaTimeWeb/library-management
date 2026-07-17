// RESPONSIBILITY: Renders the ManagerStudentsAdmissionSuccessModal.tsx component.
'use client';

import { useRouter } from 'next/navigation';
import { X, Printer, MessageSquare, Users, CheckCircle } from 'lucide-react';
import ManagerStudentsIdCard from '@/app/manager/manager_students/manager_students_components/ManagerStudentsIdCard';
import { AdmittedData, ManagerStudentsAdmissionSuccessModalProps } from '@/app/manager/manager_students/manager_students_types';
import { formatIdCardMessage, openWhatsApp, type StudentWhatsAppData } from '@/lib/whatsappUtils';
import { printThermal } from '@/lib/thermalPrint';
import { ManagerRecord } from '@/app/manager/manager_reusable/gridTheme';

export default function ManagerStudentsAdmissionSuccessModal({ data, onClose }: ManagerStudentsAdmissionSuccessModalProps) {
  const router  = useRouter();
  const balance = data.totalPayable - data.amountPaid;

  const waData: StudentWhatsAppData = {
    name: data.name, smartId: data.smartId, phone: data.phone,
    parentPhone: data.parentPhone, shift: data.shift, seat: data.seat,
    locker: data.locker, plan: data.plan, amountPaid: data.amountPaid,
    totalPayable: data.totalPayable, discount: data.discount,
    paymentMode: data.paymentMode, transactionId: data.transactionId,
    joinDate: data.joinDate, expiryDate: data.expiryDate, branch: data.branch,
  };

  function handleSendIdCard() {
    openWhatsApp(data.phone, formatIdCardMessage(waData));
  }

  function handleSendParent() {
    if (data.parentPhone) openWhatsApp(data.parentPhone, formatIdCardMessage(waData));
  }

  function handlePrintReceipt() {
    printThermal({
      type: 'receipt', shopName: 'Smart Library 360', branch: data.branch,
      studentName: data.name, smartId: data.smartId, phone: data.phone,
      shift: data.shift, seat: data.seat, plan: data.plan,
      joinDate: data.joinDate, expiryDate: data.expiryDate,
      totalPayable: data.totalPayable, amountPaid: data.amountPaid,
      discount: data.discount, balance,
      paymentMode: data.paymentMode, transactionId: data.transactionId,
      date: new Date().toLocaleString('en-IN'),
    });
  }

  function handlePrintIdCard() {
    printThermal({
      type: 'idcard', shopName: 'Smart Library 360', branch: data.branch,
      studentName: data.name, smartId: data.smartId, phone: data.phone,
      shift: data.shift, seat: data.seat, locker: data.locker, plan: data.plan,
      joinDate: data.joinDate, expiryDate: data.expiryDate,
    });
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      onClick={onClose}
    >
      <div className="bg-bg-page w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto" onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between p-6 border-b border-border bg-bg-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <h2 className="text-xl font-bold text-text-primary" id="success-modal-title">🎉 Admission Confirmed!</h2>
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success inline-flex items-center gap-1"><CheckCircle size={12} /> Active</span>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-secondary transition-colors" onClick={onClose} aria-label="Close">
            <X size={15} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 p-8 overflow-y-auto max-h-[80vh]">

          <ManagerStudentsIdCard data={data} />

          <div className="flex-1 flex flex-col gap-3 min-w-72">
            <p className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2">Quick Actions</p>

            <button className="bg-[#25D366] text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-[#20bd5a] transition-colors inline-flex items-center gap-2 w-full justify-center shadow-sm" onClick={handleSendIdCard}>
              <MessageSquare size={16} /> Send ID Card via WhatsApp
            </button>

            {data.parentPhone && (
              <button className="bg-transparent border border-[#25D366] text-[#25D366] rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-[#25D366]/10 transition-colors inline-flex items-center gap-2 w-full justify-center" onClick={handleSendParent}>
                <MessageSquare size={16} /> Send to Parent WhatsApp
              </button>
            )}

            <div className="h-[1px] w-full bg-border my-2" />

            <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2" onClick={handlePrintIdCard} style={{ width: '100%', justifyContent: 'center' }}>
              <Printer size={15} /> Print ID Card (Thermal)
            </button>

            <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2" onClick={handlePrintReceipt} style={{ width: '100%', justifyContent: 'center' }}>
              <Printer size={15} /> Print Fee Receipt (Thermal)
            </button>

            <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2" onClick={() => { onClose(); router.push('/manager/manager_students'); }} style={{ width: '100%', justifyContent: 'center' }}>
              <Users size={15} /> Go to Students
            </button>

            <div className="bg-bg-card border border-border rounded-xl p-5 mt-4 flex flex-col gap-3">
              {[
                { label: 'Smart ID',    value: data.smartId,     mono: true },
                { label: 'Plan',        value: data.plan },
                { label: 'Valid Until', value: data.expiryDate },
                { label: 'Paid',        value: `₹${data.amountPaid.toLocaleString('en-IN')}`, color: 'var(--success)' },
                ...(balance > 0 ? [{ label: 'Balance Due', value: `₹${balance.toLocaleString('en-IN')}`, color: 'var(--danger)' }] : []),
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-secondary">{r.label}</span>
                  <span className="text-sm font-bold text-text-primary" style={{ fontFamily: (r as never as Record<string, string | boolean>).mono ? 'monospace' : undefined, color: (r as never as Record<string, string | boolean>).color as string }}>
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


