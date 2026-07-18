import Link from 'next/link';
import { Eye, Pencil, MessageSquare } from 'lucide-react';
import { openWhatsApp } from '@/lib/whatsappUtils';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
import type { Student } from '@/app/manager/manager_students/manager_students_types';
import { MANAGER_BRANCH } from '@/app/manager/manager_students/manager_students_constants';

// RESPONSIBILITY: Micro-components for AG Grid cells

export function NameCell({ data }: { data: Student }) {
  const initials = data.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="flex items-center gap-[10px] h-full">
      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{initials}</div>
      <div>
        <p className="text-sm font-semibold text-text-primary">{data.name}</p>
        <p className="text-xs text-text-secondary mt-0.5">{data.phone}</p>
      </div>
    </div>
  );
}

export function ShiftCell({ data }: { data: Student }) {
  return (
    <div className="flex flex-col justify-center h-full">
      <span className="text-sm font-semibold text-text-primary">{data.shift}</span>
      <span className="text-xs text-text-secondary mt-0.5">{data.seat}</span>
    </div>
  );
}

export function StatusCell({ value }: { value: string }) {
  const cls = value === 'Active' ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success'
    : value === 'Suspended' ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-warning-bg text-warning'
    : 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-danger-bg text-danger';
  return <span className={cls}>{value}</span>;
}

export function DueCell({ value }: { value: number }) {
  return (
    <span className={`font-semibold ${value > 0 ? 'text-danger' : 'text-success'}`}>
      {value > 0 ? `₹${value.toLocaleString('en-IN')}` : '✅ Clear'}
    </span>
  );
}

export function ActionsCell({ data }: { data: Student }) {
  function sendDuesReminder() {
    if (data.due <= 0) return;
    const W = 42;
    const line = '─'.repeat(W);
    const c = (t: string) => ' '.repeat(Math.max(0, Math.floor((W - t.length) / 2))) + t;
    const row = (l: string, v: string) => l + ' '.repeat(Math.max(1, W - l.length - v.length)) + v;
    const msg = [
      c('★ SMART LIBRARY 360 ★'),
      c(MANAGER_BRANCH),
      line,
      c('[ FEE REMINDER ]'),
      line,
      row('Name    :', data.name),
      row('Smart ID:', data.smartId),
      '',
      line,
      row('DUE AMT :', `Rs.${data.due.toLocaleString('en-IN')}`),
      line,
      '',
      c('⚠️ Please clear dues to avoid'),
      c('seat suspension.'),
      '',
      c('Smart Library 360 | Main Branch'),
    ].join('\n');
    openWhatsApp(data.phone, msg);
  }

  const profileUrl = `${MANAGER_ROUTES.STUDENTS}/${data.id || data.smartId}`;

  return (
    <div className="flex items-center gap-[6px] h-full">
      
      <Link href={`${profileUrl}/edit`} className="w-8 h-8 rounded-lg border border-border text-text-secondary inline-flex items-center justify-center hover:bg-primary-subtle hover:text-primary transition-colors" title="Edit">
        <Pencil size={13} />
      </Link>
      {data.due > 0 && (
        <button
          className="w-8 h-8 rounded-lg border border-border text-text-secondary inline-flex items-center justify-center hover:bg-success/20 hover:text-success transition-colors"
          title={`Send dues reminder — ₹${data.due}`}
          onClick={(e) => { e.stopPropagation(); sendDuesReminder(); }}
        >
          <MessageSquare size={13} />
        </button>
      )}
    </div>
  );
}


