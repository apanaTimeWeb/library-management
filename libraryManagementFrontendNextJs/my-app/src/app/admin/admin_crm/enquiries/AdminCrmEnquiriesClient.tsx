'use client';

import {
  Search, LayoutGrid, List, Plus, Phone,
  CheckCircle, XCircle, MoreHorizontal, PhoneCall,
  Clock, CalendarDays, User,
} from 'lucide-react';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';
import {
  type Enquiry,
  type EnquiryStatus,
  KANBAN_COLUMNS,
  maskPhone,
} from '@/app/admin/admin_crm/admin_crm_components/AdminCrmtypes/AdminCrmtypes';
import { useAdminCrmEnquiries } from '@/app/admin/admin_crm/admin_crm_hooks/useAdminCrmEnquiries';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

function StatusBadge({ status }: { status: EnquiryStatus }) {
  const getBadgeClass = (s: EnquiryStatus) => {
    switch (s) {
      case 'New': return 'bg-info/10 text-info';
      case 'Visited': return 'bg-primary/10 text-primary';
      case 'Interested': return 'bg-warning/10 text-warning';
      case 'Converted': return 'bg-success/10 text-success';
      case 'Lost': return 'bg-danger/10 text-danger';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  return <Badge variant="secondary" className={`${getBadgeClass(status)} border-none uppercase tracking-wide font-bold`}>{status}</Badge>;
}

function FollowUpBadge({ isOverdue, isToday, isUpcoming }: { isOverdue?: boolean; isToday?: boolean; isUpcoming?: boolean }) {
  if (isOverdue) return <Badge variant="secondary" className="bg-danger/10 text-danger border-none flex items-center gap-1"><Clock size={10} /> Overdue</Badge>;
  if (isToday)   return <Badge variant="secondary" className="bg-warning/10 text-warning border-none flex items-center gap-1"><Clock size={10} /> Today</Badge>;
  if (isUpcoming) return <Badge variant="secondary" className="bg-success/10 text-success border-none flex items-center gap-1"><Clock size={10} /> Upcoming</Badge>;
  return null;
}

const DOT_CLASS: Record<EnquiryStatus, string> = {
  New:        'bg-info',
  Visited:    'bg-primary',
  Interested: 'bg-warning',
  Converted:  'bg-success',
  Lost:       'bg-danger',
};

function KanbanCard({ enq, onClick }: { enq: Enquiry; onClick: () => void }) {
  return (
    <Card
      className="p-3 shadow-sm border-border bg-card hover:shadow-md hover:border-primary/30 transition-all cursor-pointer flex flex-col gap-3 group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="flex flex-col gap-0.5">
        <p className="font-bold text-sm text-primary group-hover:text-primary transition-colors">{enq.name}</p>
        <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone size={11} />{maskPhone(enq.phone)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-info/5 text-info border-info/20">{enq.shift}</Badge>
        <FollowUpBadge isOverdue={enq.isOverdue} isToday={enq.isToday} isUpcoming={enq.isUpcoming} />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground font-medium pt-2 border-t">
        <span className="flex items-center gap-1"><CalendarDays size={11} />{enq.addedDate}</span>
        {enq.convertedDate ? (
          <span className="flex items-center gap-1 text-success font-bold"><CheckCircle size={11} />{enq.convertedDate}</span>
        ) : (
          <span className="flex items-center gap-1"><User size={11} />{enq.handledBy.split(' ')[0]}</span>
        )}
      </div>
    </Card>
  );
}

export default function AdminCrmEnquiriesClient() {
  const {
    viewParam,
    searchParam,
    statusParam,
    fetchState,
    filtered,
    pushParams,
    colEnquiries,
    handleQuickConvert,
    handleQuickLost,
    router
  } = useAdminCrmEnquiries();

  if (fetchState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-muted-foreground font-medium">Loading enquiries…</p>
      </div>
    );
  }

  if (fetchState === 'error') {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <XCircle size={40} className="text-danger" />
        <p className="text-xl font-bold text-primary">Failed to load enquiries</p>
        <p className="text-sm text-muted-foreground">Check your backend connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pb-10 space-y-6">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide">CRM › Enquiries</nav>
          <h1 className="text-2xl font-bold tracking-tight">Enquiry Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} lead{filtered.length !== 1 ? 's' : ''} • Track every prospect from enquiry to admission
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-muted/50 p-1 rounded-md">
            <button
              className={`p-1.5 rounded-sm transition-colors ${viewParam === 'kanban' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => pushParams({ view: 'kanban' })}
              title="Kanban view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              className={`p-1.5 rounded-sm transition-colors ${viewParam === 'table' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => pushParams({ view: 'table' })}
              title="Table view"
            >
              <List size={16} />
            </button>
          </div>
          <Button onClick={() => router.push(ADMIN_ROUTES.CRM_ENQUIRY_ADD)} className="gap-2">
            <Plus size={16} /> Add Enquiry
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search by name or phone…"
            value={searchParam}
            onChange={(e) => pushParams({ q: e.target.value })}
          />
        </div>
        <select
          className="flex h-10 w-full max-w-52 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          value={statusParam}
          onChange={(e) => pushParams({ status: e.target.value })}
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Visited">Visited</option>
          <option value="Interested">Interested</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      {/* Kanban View */}
      {viewParam === 'kanban' && (
        <>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 border-2 border-dashed border-border rounded-xl">
              <PhoneCall size={48} className="text-muted-foreground opacity-20" />
              <p className="text-lg font-bold">No enquiries yet</p>
              <p className="text-sm text-muted-foreground">Add your first lead to start the pipeline</p>
              <Button onClick={() => router.push(ADMIN_ROUTES.CRM_ENQUIRY_ADD)} className="mt-4 gap-2">
                <Plus size={15} /> Add Enquiry
              </Button>
            </div>
          ) : (
            <div className="flex overflow-x-auto gap-4 pb-4 h-[calc(100vh-250px)] min-h-96">
              {KANBAN_COLUMNS.map((col) => {
                const cards = colEnquiries(col.id);
                return (
                  <div key={col.id} className="flex flex-col w-72 shrink-0 bg-muted/20 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between p-3 border-b border-border/50 bg-muted/10 rounded-t-xl">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${DOT_CLASS[col.id]}`} />
                        <span className="font-bold text-sm tracking-wide">{col.label}</span>
                        <span className="bg-muted/50 text-muted-foreground text-xs font-bold px-2 py-0.5 rounded-full">{cards.length}</span>
                      </div>
                      <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted">
                        <MoreHorizontal size={15} />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                      {cards.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground/50">
                          <PhoneCall size={24} />
                          <p className="text-xs font-medium">No {col.label} leads</p>
                        </div>
                      ) : (
                        cards.map((enq) => (
                          <KanbanCard
                            key={enq.id}
                            enq={enq}
                            onClick={() => router.push(`${ADMIN_ROUTES.CRM_ENQUIRIES}/${enq.id}`)}
                          />
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Table View */}
      {viewParam === 'table' && (
        <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col">
          {filtered.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 gap-3">
               <PhoneCall size={40} className="text-muted-foreground opacity-20" />
               <p className="text-lg font-bold">No enquiries found</p>
               <p className="text-sm text-muted-foreground">Try a different search or status filter</p>
               <Button onClick={() => router.push(ADMIN_ROUTES.CRM_ENQUIRY_ADD)} className="mt-4 gap-2">
                 <Plus size={15} /> Add Enquiry
               </Button>
             </div>
          ) : (
            <div className="w-full overflow-x-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/30 border-b text-muted-foreground text-xs font-medium uppercase tracking-wider sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 w-12">#</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Preferred Shift</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Handled By</th>
                    <th className="px-4 py-3">Date Added</th>
                    <th className="px-4 py-3">Follow-up</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((enq, idx) => (
                    <tr
                      key={enq.id}
                      onClick={() => router.push(`${ADMIN_ROUTES.CRM_ENQUIRIES}/${enq.id}`)}
                      className="hover:bg-muted/10 transition-colors cursor-pointer group"
                    >
                      <td className="px-4 py-3 text-xs text-muted-foreground font-bold">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                            {enq.avatar}
                          </div>
                          <span className="font-bold text-sm text-primary group-hover:text-primary transition-colors">{enq.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">{maskPhone(enq.phone)}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="bg-info/5 text-info border-info/20">{enq.shift}</Badge>
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={enq.status} /></td>
                      <td className="px-4 py-3 text-sm text-muted-foreground font-medium">{enq.handledBy}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground font-medium">{enq.addedDate}</td>
                      <td className="px-4 py-3">
                        <FollowUpBadge isOverdue={enq.isOverdue} isToday={enq.isToday} isUpcoming={enq.isUpcoming} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-success hover:bg-success/10"
                            title="Convert to Admission"
                            onClick={(e) => handleQuickConvert(e, enq)}
                          >
                            <CheckCircle size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-danger hover:bg-danger/10"
                            title="Mark as Lost"
                            onClick={(e) => handleQuickLost(e, enq.id)}
                          >
                            <XCircle size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
