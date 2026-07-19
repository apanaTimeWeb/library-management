// RESPONSIBILITY: Renders an individual CRM enquiry card within the kanban board.
import { Phone, CalendarDays, CheckCircle, User, Clock } from 'lucide-react';
import { maskPhone } from '@/app/manager/manager_crm/manager_crm_utils';
import type { Enquiry } from '@/app/manager/manager_crm/manager_crm_types';

// RESPONSIBILITY: Renders an individual Kanban card. No API calls.

function FollowUpBadge({ isOverdue, isToday, isUpcoming }: Pick<Enquiry, 'isOverdue' | 'isToday' | 'isUpcoming'>) {
  if (isOverdue) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold text-danger bg-danger-bg"><Clock size={10} /> Overdue</span>;
  if (isToday) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold text-warning bg-warning-bg"><Clock size={10} /> Today</span>;
  if (isUpcoming) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold text-success bg-success-bg"><Clock size={10} /> Upcoming</span>;
  return null;
}

import type { ManagerCrmKanbanCardProps } from '@/app/manager/manager_crm/manager_crm_types/ManagerCrmTypes';

// Props interface centralized.

export function ManagerCrmKanbanCard({ enq, colClass, onClick }: ManagerCrmKanbanCardProps) {
  return (
    <div className={`bg-card border border-border p-4 rounded-xl shadow-sm cursor-pointer hover:-translate-y-1 hover:border-text-secondary transition-all focus:outline-none focus:ring-2 focus:ring-primary ${colClass}`} onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <div className="flex flex-col gap-1 mb-3">
        <p className="font-semibold text-text-primary text-[15px] leading-tight">{enq.name}</p>
        <p className="flex items-center gap-1.5 text-xs text-text-secondary font-mono">
          <Phone size={11} />
          {maskPhone(enq.phone)}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold text-info bg-info-bg">{enq.shift}</span>
        <FollowUpBadge isOverdue={enq.isOverdue} isToday={enq.isToday} isUpcoming={enq.isUpcoming} />
      </div>
      <div className="flex items-center justify-between text-[11px] text-text-tertiary pt-3 border-t border-border/50">
        <span className="flex items-center gap-1.5"><CalendarDays size={11} />{enq.addedDate}</span>
        {enq.convertedDate && (
          <span className="flex items-center gap-1.5 text-success font-medium"><CheckCircle size={11} />{enq.convertedDate}</span>
        )}
        <span className="flex items-center gap-1.5"><User size={11} />{enq.handledBy.split(' ')[0]}</span>
      </div>
    </div>
  );
}
