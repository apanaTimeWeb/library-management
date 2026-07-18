// RESPONSIBILITY: Renders CRM pipeline board / list view with status columns and quick conversion actions.
'use client';

import { useRouter } from 'next/navigation';
import {
  Search, LayoutGrid, List, Plus, Phone, CheckCircle, XCircle, MoreHorizontal, PhoneCall, Clock, CalendarDays, User,
} from 'lucide-react';
import {
  type Enquiry, type EnquiryStatus, KANBAN_COLUMNS, STATUS_BADGE, maskPhone,
} from '@/app/superadmin/superadmin_crm/superadmin_crm_shared_components/superadmin_types';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useEnquiriesClient } from './useEnquiriesClient';

/* ── Helpers ─────────────────────────────────────────────── */
function StatusBadge({ status }: { status: EnquiryStatus }) {
  const cls = STATUS_BADGE[status];
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold ${cls}`}>{status}</span>;
}

function FollowUpBadge({ isOverdue, isToday, isUpcoming }: { isOverdue?: boolean; isToday?: boolean; isUpcoming?: boolean; }) {
  if (isOverdue)
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold bg-danger/10 text-danger"><Clock size={10} /> Overdue</span>;
  if (isToday)
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold bg-warning/10 text-warning"><Clock size={10} /> Today</span>;
  if (isUpcoming)
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold bg-success/10 text-success"><Clock size={10} /> Upcoming</span>;
  return null;
}

const DOT_CLASS: Record<EnquiryStatus, string> = {
  New: 'bg-info', Visited: 'bg-primary', Interested: 'bg-warning', Converted: 'bg-success', Lost: 'bg-danger',
};

function KanbanCard({ enq, onClick }: { enq: Enquiry; colClass: string; onClick: () => void; }) {
  return (
    <div className="bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col gap-3" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && onClick()}>
      <div>
        <p className="text-[14px] font-bold text-text-primary leading-tight truncate" title={enq.name}>{enq.name}</p>
        <p className="text-[12px] text-text-secondary flex items-center gap-1 mt-1"><Phone size={11} /> {maskPhone(enq.phone)}</p>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <span className="inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold bg-info/10 text-info">{enq.shift}</span>
        <FollowUpBadge isOverdue={enq.isOverdue} isToday={enq.isToday} isUpcoming={enq.isUpcoming} />
      </div>
      <div className="flex items-center justify-between text-[11px] text-text-secondary font-medium pt-3 border-t border-border mt-1">
        <span className="flex items-center gap-1"><CalendarDays size={11} /> {enq.addedDate}</span>
        {enq.convertedDate && <span className="flex items-center gap-1 text-success"><CheckCircle size={11} /> {enq.convertedDate}</span>}
        <span className="flex items-center gap-1"><User size={11} /> {enq.handledBy.split(' ')[0]}</span>
      </div>
    </div>
  );
}

export function EnquiriesClient() {
  const {
    router, view, setView, search, setSearch, statusFilter, setStatusFilter,
    filtered, colEnquiries, handleQuickConvert, handleQuickLost
  } = useEnquiriesClient();

  return (
    <div className="relative p-2 sm:p-4">
      <div className="mb-8">
        <nav className="text-[12px] font-bold text-text-secondary mb-2 space-x-2">CRM &rsaquo; Enquiries</nav>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-extrabold text-text-primary tracking-tight">Enquiry Pipeline</h1>
            <p className="text-[14px] text-text-secondary mt-1">{filtered.length} lead{filtered.length !== 1 ? 's' : ''} {'•'} Track every prospect from enquiry to admission</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-input rounded-[var(--radius-md)] p-1 border border-border">
              <button className={`w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] transition-colors cursor-pointer ${view === 'kanban' ? 'bg-card shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary'}`} onClick={() => setView('kanban')} title="Kanban view"><LayoutGrid size={16} /></button>
              <button className={`w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] transition-colors cursor-pointer ${view === 'table' ? 'bg-card shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary'}`} onClick={() => setView('table')} title="Table view"><List size={16} /></button>
            </div>
            <button className="flex items-center justify-center gap-1.5 bg-primary hover:brightness-95 text-primary-foreground text-[14px] font-bold py-2 px-4 rounded-[var(--radius-md)] transition-all shadow-sm cursor-pointer" onClick={() => router.push('/superadmin/superadmin_crm/enquiries/add')}>
              <Plus size={16} /> Add Enquiry
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input type="text" className="w-full bg-input border border-border rounded-[var(--radius-md)] py-2 pl-9 pr-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors h-10" placeholder="Search by name or phone…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-48">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Statuses', value: 'All' },
              { label: 'New', value: 'New' },
              { label: 'Visited', value: 'Visited' },
              { label: 'Interested', value: 'Interested' },
              { label: 'Converted', value: 'Converted' },
              { label: 'Lost', value: 'Lost' }
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      {view === 'kanban' && (
        filtered.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <PhoneCall size={48} className="text-text-secondary opacity-50 mb-4" />
            <p className="text-[18px] font-bold text-text-primary">No enquiries yet</p>
            <p className="text-[14px] text-text-secondary mt-1">Add your first lead to start the pipeline</p>
            <button className="flex items-center justify-center gap-1.5 bg-primary hover:brightness-95 text-primary-foreground text-[14px] font-bold py-2 px-4 rounded-[var(--radius-md)] transition-all shadow-sm cursor-pointer mt-6" onClick={() => router.push('/superadmin/superadmin_crm/enquiries/add')}>
              <Plus size={15} /> Add Enquiry
            </button>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-4">
            {KANBAN_COLUMNS.map((col) => {
              const cards = colEnquiries(col.id);
              return (
                <div key={col.id} className="min-w-[300px] w-[300px] flex-shrink-0 flex flex-col">
                  <div className="flex items-center justify-between bg-card border border-border rounded-t-[var(--radius-lg)] p-3 border-b-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${DOT_CLASS[col.id]}`} />
                      <span className="text-[14px] font-bold text-text-primary">{col.label}</span>
                      <span className="bg-input text-text-secondary text-[10px] font-bold px-2 py-0.5 rounded-[var(--radius-full)]">{cards.length}</span>
                    </div>
                    <button className="text-text-secondary hover:text-text-primary cursor-pointer transition-colors" title="More options" aria-label="Column options">
                      <MoreHorizontal size={15} />
                    </button>
                  </div>
                  <div className="bg-muted border border-border rounded-b-[var(--radius-lg)] p-3 flex-1 flex flex-col gap-3 min-h-[300px]">
                    {cards.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-border rounded-[var(--radius-lg)]">
                        <PhoneCall size={28} className="text-text-secondary opacity-30 mb-2" />
                        <p className="text-[14px] font-bold text-text-secondary">No {col.label} leads</p>
                        <p className="text-[12px] text-text-secondary mt-1">Leads will appear here when moved to {col.label}</p>
                      </div>
                    ) : (
                      cards.map((enq) => (
                        <KanbanCard key={enq.id} enq={enq} colClass={col.cardClass} onClick={() => router.push(`/superadmin/superadmin_crm/enquiries/${enq.id}`)} />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {view === 'table' && (
        <div className="bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
          {filtered.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <PhoneCall size={40} className="text-text-secondary opacity-50 mb-4" />
              <p className="text-[18px] font-bold text-text-primary">No enquiries found</p>
              <p className="text-[14px] text-text-secondary mt-1">Try a different search or status filter</p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="py-3 px-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">#</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Name</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Phone</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Preferred Shift</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Handled By</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Date Added</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Follow-up</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((enq, idx) => (
                    <tr key={enq.id} onClick={() => router.push(`/superadmin/superadmin_crm/enquiries/${enq.id}`)} className="hover:bg-muted/50 transition-colors cursor-pointer group">
                      <td className="py-4 px-4 text-[14px] text-text-secondary font-mono">{idx + 1}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[12px] font-bold flex-shrink-0">{enq.avatar}</div>
                          <span className="text-[14px] font-bold text-text-primary truncate">{enq.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[14px] font-mono text-text-secondary">{maskPhone(enq.phone)}</td>
                      <td className="py-4 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold bg-info/10 text-info">{enq.shift}</span></td>
                      <td className="py-4 px-4"><StatusBadge status={enq.status} /></td>
                      <td className="py-4 px-4 text-[14px] text-text-secondary">{enq.handledBy}</td>
                      <td className="py-4 px-4 text-[14px] text-text-secondary">{enq.addedDate}</td>
                      <td className="py-4 px-4"><FollowUpBadge isOverdue={enq.isOverdue} isToday={enq.isToday} isUpcoming={enq.isUpcoming} /></td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] text-success hover:bg-success hover:text-success-foreground transition-colors cursor-pointer" title="Convert to Admission" onClick={(e) => handleQuickConvert(e, enq.id)}><CheckCircle size={14} /></button>
                          <button className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] text-danger hover:bg-danger hover:text-danger-foreground transition-colors cursor-pointer" title="Mark as Lost" onClick={(e) => handleQuickLost(e, enq.id)}><XCircle size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
