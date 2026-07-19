'use client';
// RESPONSIBILITY: Renders the ManagerStudentsStudentProfileClient.tsx component.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, Armchair, Calendar, CreditCard, Shield } from 'lucide-react';
import { useManagerStudentsStudentProfile } from '@/app/manager/manager_students/manager_students_hooks/useManagerStudentsStudentProfile';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
import { formatDateIN } from '@/lib/whatsappUtils';

export function ManagerStudentsStudentProfileClient({ id }: { id: string }) {
  const { student, loading, expiryDate } = useManagerStudentsStudentProfile(id);

  if (loading) {
    return <div className="p-6 min-h-screen"><div className="bg-card rounded-xl border border-border p-6 p-[20px]">Loading...</div></div>;
  }

  if (!student) {
    return (
      <div className="p-6 min-h-screen">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-72">
            <div className="text-4xl mb-4 opacity-50">ðŸ”</div>
            <p className="text-lg font-bold text-text-primary mb-1">Student not found</p>
            <p className="text-sm text-text-secondary">ID: {id}</p>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="p-6 min-h-screen">
      <div className="p-6 min-h-screen-header">
        <div>
          <Link href={MANAGER_ROUTES.STUDENTS} className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-4">
            <ArrowLeft size={14} /> Back to Students
          </Link>
          <h1 className="text-[22px] font-bold text-text-primary">Student Profile</h1>
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary mt-1">Manager â€º Students â€º {student.name}</p>
        </div>
        <div className="p-6 min-h-screen-actions">
          <Link href={`${MANAGER_ROUTES.STUDENTS}/${id}/edit`} className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2">
            Edit
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Personal Details</h2>
            <span className={
              student.status === 'Active'    ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success' :
              student.status === 'Suspended' ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-warning-bg text-warning' :
                                               'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-danger-bg text-danger'
            }>{student.status}</span>
          </div>
          <div className="">
            <div className="flex items-center gap-[16px] mb-[24px]">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold shrink-0">
                {student.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">{student.name}</p>
                <span className="inline-block px-2 py-0.5 rounded-full bg-info-bg text-info text-xs font-semibold mt-1">{student.smartId}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-border">
              <div className="flex flex-col gap-1.5">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Phone</label>
                <div className="flex items-center gap-[8px]">
                  <Phone size={14} className="text-primary" />
                  <span className="text-text-primary">{student.phone}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Branch</label>
                <span className="text-text-primary">{student.branch}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Shift</label>
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-info-bg text-info">{student.shift}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Seat</label>
                <div className="flex items-center gap-[6px]">
                  <Armchair size={14} className="text-primary" />
                  <span className="text-text-primary font-semibold">{student.seat}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Plan</label>
                <div className="flex items-center gap-[6px]">
                  <CreditCard size={14} className="text-primary" />
                  <span className="text-text-primary">{student.plan}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Dues</label>
                <span className={student.due > 0 ? 'text-danger font-bold' : 'text-success font-bold'}>
                  {student.due > 0 ? `â‚¹${student.due.toLocaleString('en-IN')}` : 'âœ… Clear'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-text-primary">Validity</h2>
            </div>
            <div className="">
              <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <span className="text-sm font-medium text-text-secondary flex items-center">
                  <Calendar size={13} className="inline mr-[6px]" />
                  Joined
                </span>
                <span className="text-text-primary font-medium">{student.joined}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <span className="text-sm font-medium text-text-secondary flex items-center">
                  <Shield size={13} className="inline mr-[6px]" />
                  Expires
                </span>
                <span className="text-warning font-semibold">{formatDateIN(expiryDate)}</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-text-primary">Quick Actions</h2>
            </div>
            <div className="flex flex-col gap-3">
              <Link href={`${MANAGER_ROUTES.FINANCE_COLLECT_FEE}?id=${student.smartId}`} className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2 w-full justify-center">
                Collect Fee
              </Link>
              <Link href={`${MANAGER_ROUTES.STUDENTS_ID_CARD}?id=${student.smartId}`} className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 w-full justify-center">
                View ID Card
              </Link>
              <Link href={`${MANAGER_ROUTES.FINANCE_RENEWALS}?id=${student.smartId}`} className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 w-full justify-center">
                Renew Subscription
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


