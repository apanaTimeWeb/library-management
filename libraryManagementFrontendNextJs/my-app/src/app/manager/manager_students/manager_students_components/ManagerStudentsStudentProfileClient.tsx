// RESPONSIBILITY: Renders the ManagerStudentsStudentProfileClient.tsx component.
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, Armchair, Calendar, CreditCard, Shield } from 'lucide-react';
import { logger } from '@/lib/logger';
import { calcExpiryDate, formatDateIN } from '@/lib/whatsappUtils';
import { fetchStudentById } from '@/app/manager/manager_students/manager_students_api/manager_students_api';
import type { Student } from '@/app/manager/manager_students/manager_students_types';

export function ManagerStudentsStudentProfileClient({ id }: { id: string }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentById(id)
      .then(data => {
        setStudent(data as Student);
        setLoading(false);
      })
      .catch(err => {
        logger.error('Failed to load student profile', { id, message: err instanceof Error ? err.message : String(err) });
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-6 min-h-screen"><div className="bg-bg-card rounded-xl border border-border p-6" style={{ padding: 20 }}>Loading...</div></div>;
  }

  if (!student) {
    return (
      <div className="p-6 min-h-screen">
        <div className="bg-bg-card rounded-xl border border-border p-6">
          <div className="mgr-empty-state">
            <div className="mgr-empty-icon">🔍</div>
            <p className="mgr-empty-title">Student not found</p>
            <p className="mgr-empty-sub">ID: {id}</p>
          </div>
        </div>
      </div>
    );
  }

  const [dd, mm, yyyy] = student.joined.split('/');
  const joinDate = new Date(`${yyyy}-${mm}-${dd}`);
  const expiryDate = calcExpiryDate(joinDate, student.plan);

  return (
    <div className="p-6 min-h-screen">
      <div className="p-6 min-h-screen-header">
        <div>
          <Link href="/manager/manager_students" className="mgr-back-link">
            <ArrowLeft size={14} /> Back to Students
          </Link>
          <h1 className="text-[22px] font-bold text-text-primary">Student Profile</h1>
          <p className="mgr-breadcrumb">Manager › Students › {student.name}</p>
        </div>
        <div className="p-6 min-h-screen-actions">
          <Link href={`/manager/manager_students/${id}/edit`} className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 mgr-btn-sm">
            Edit
          </Link>
        </div>
      </div>

      <div className="mgr-dashboard-row2">
        <div className="bg-bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Personal Details</h2>
            <span className={
              student.status === 'Active'    ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success' :
              student.status === 'Suspended' ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-warning-bg text-warning' :
                                               'rounded-full px-2.5 py-0.5 text-[11px] font-semibold rounded-full px-2.5 py-0.5 text-[11px] font-semibold--danger'
            }>{student.status}</span>
          </div>
          <div className="">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div className="mgr-avatar" style={{ width: 56, height: 56, fontSize: 20, borderRadius: 14 }}>
                {student.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-[22px] font-bold text-text-primary" style={{ fontSize: 18 }}>{student.name}</p>
                <span className="mgr-smartid-chip">{student.smartId}</span>
              </div>
            </div>

            <div className="mgr-form-grid">
              <div className="mgr-form-field">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Phone</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Phone size={14} style={{ color: 'var(--primary)' }} />
                  <span style={{ color: 'var(--text-primary)' }}>{student.phone}</span>
                </div>
              </div>
              <div className="mgr-form-field">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Branch</label>
                <span style={{ color: 'var(--text-primary)' }}>{student.branch}</span>
              </div>
              <div className="mgr-form-field">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Shift</label>
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold rounded-full px-2.5 py-0.5 text-[11px] font-semibold--info">{student.shift}</span>
              </div>
              <div className="mgr-form-field">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Seat</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Armchair size={14} style={{ color: 'var(--primary)' }} />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{student.seat}</span>
                </div>
              </div>
              <div className="mgr-form-field">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Plan</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CreditCard size={14} style={{ color: 'var(--primary)' }} />
                  <span style={{ color: 'var(--text-primary)' }}>{student.plan}</span>
                </div>
              </div>
              <div className="mgr-form-field">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Dues</label>
                <span className={student.due > 0 ? 'mgr-text-danger' : 'mgr-text-success'} style={{ fontWeight: 700 }}>
                  {student.due > 0 ? `₹${student.due.toLocaleString('en-IN')}` : '✅ Clear'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-flex-col admin-gap-16">
          <div className="bg-bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-text-primary">Validity</h2>
            </div>
            <div className="">
              <div className="mgr-action-item">
                <span className="mgr-action-label">
                  <Calendar size={13} style={{ display: 'inline', marginRight: 6 }} />
                  Joined
                </span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{student.joined}</span>
              </div>
              <div className="mgr-action-item">
                <span className="mgr-action-label">
                  <Shield size={13} style={{ display: 'inline', marginRight: 6 }} />
                  Expires
                </span>
                <span style={{ color: 'var(--warning)', fontWeight: 600 }}>{formatDateIN(expiryDate)}</span>
              </div>
            </div>
          </div>

          <div className="bg-bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-text-primary">Quick Actions</h2>
            </div>
            <div className=" admin-flex-col admin-gap-8">
              <Link href={`/manager/manager_finance/collect-fee?id=${student.smartId}`} className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2 mgr-btn-full">
                Collect Fee
              </Link>
              <Link href={`/manager/manager_students/id-card?id=${student.smartId}`} className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 mgr-btn-full">
                View ID Card
              </Link>
              <Link href={`/manager/manager_finance/renewals?id=${student.smartId}`} className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 mgr-btn-full">
                Renew Subscription
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


