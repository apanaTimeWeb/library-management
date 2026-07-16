'use client';

// RESPONSIBILITY: Client component for the CRM Enquiries pipeline. Handles kanban/table view, search, status filter, and navigation.
// DATA FLOW: AdminCrmEnquiriesPage (Server) -> AdminCrmEnquiriesClient -> (KanbanCard, table rows)

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Search, LayoutGrid, List, Plus, Phone,
  CheckCircle, XCircle, MoreHorizontal, PhoneCall,
  Clock, CalendarDays, User,
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { ADMIN_ROUTES, ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import {
  type Enquiry,
  type EnquiryStatus,
  KANBAN_COLUMNS,
  STATUS_BADGE,
  maskPhone,
} from '@/app/admin/admin_crm/admin_crm_components/AdminCrmtypes/AdminCrmtypes';

// Rule 44: FetchState enum — no boolean loading flags
type FetchState = 'idle' | 'loading' | 'success' | 'error';

// Rule 35: no magic strings for view type
type ViewMode = 'kanban' | 'table';

/* ── Helpers ─────────────────────────────────────────────── */
function StatusBadge({ status }: { status: EnquiryStatus }) {
  const cls = STATUS_BADGE[status];
  return <span className={`crm-badge ${cls}`}>{status}</span>;
}

function FollowUpBadge({ isOverdue, isToday, isUpcoming }: { isOverdue?: boolean; isToday?: boolean; isUpcoming?: boolean }) {
  if (isOverdue) return <span className="crm-badge crm-badge--danger"><Clock size={10} /> Overdue</span>;
  if (isToday)   return <span className="crm-badge crm-badge--warning"><Clock size={10} /> Today</span>;
  if (isUpcoming) return <span className="crm-badge crm-badge--success"><Clock size={10} /> Upcoming</span>;
  return null;
}

const DOT_CLASS: Record<EnquiryStatus, string> = {
  New:        'crm-col-dot--new',
  Visited:    'crm-col-dot--visited',
  Interested: 'crm-col-dot--interested',
  Converted:  'crm-col-dot--converted',
  Lost:       'crm-col-dot--lost',
};

function KanbanCard({ enq, colClass, onClick }: { enq: Enquiry; colClass: string; onClick: () => void }) {
  return (
    <div
      className={`crm-kanban-card ${colClass}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="crm-card-name-block">
        <p className="crm-card-name">{enq.name}</p>
        <p className="crm-card-phone"><Phone size={11} />{maskPhone(enq.phone)}</p>
      </div>
      <div className="crm-card-badges">
        <span className="crm-badge crm-badge--info">{enq.shift}</span>
        <FollowUpBadge isOverdue={enq.isOverdue} isToday={enq.isToday} isUpcoming={enq.isUpcoming} />
      </div>
      <div className="crm-card-footer">
        <span className="crm-card-footer-item"><CalendarDays size={11} />{enq.addedDate}</span>
        {enq.convertedDate && (
          <span className="crm-card-footer-converted"><CheckCircle size={11} />{enq.convertedDate}</span>
        )}
        <span className="crm-card-footer-item"><User size={11} />{enq.handledBy.split(' ')[0]}</span>
      </div>
    </div>
  );
}

/* ── Main Client Component ───────────────────────────────── */
export default function AdminCrmEnquiriesClient() {
  const router     = useRouter();
  const pathname   = usePathname();
  const searchParams = useSearchParams();

  // Rule 42: URL-synced state
  const viewParam   = (searchParams.get('view') as ViewMode) || 'kanban';
  const searchParam = searchParams.get('q') || '';
  const statusParam = searchParams.get('status') || 'All';

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  // Rule 44: single FetchState instead of boolean flags
  const [fetchState, setFetchState] = useState<FetchState>('idle');

  // Rule 42: push URL params helper
  const pushParams = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v && v !== 'All' && v !== 'kanban') params.set(k, v);
      else params.delete(k);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  useEffect(() => {
    // Rule 55: id is the enquiries list endpoint — no deps needed beyond mount
    setFetchState('loading');
    fetchApi(ADMIN_API_ROUTES.CRM_ENQUIRIES)
      .then((data: unknown) => {
        const rows = Array.isArray(data) ? data : [];
        const mapped: Enquiry[] = rows.map((e: any) => ({
          id:              String(e.id ?? ''),
          name:            String(e.name ?? ''),
          phone:           String(e.phone ?? ''),
          shift:           String(e.shift || e.preferredShift || 'General'),
          status:          (String(e.status ?? 'new').charAt(0).toUpperCase() + String(e.status ?? 'new').slice(1)) as EnquiryStatus,
          handledBy:       typeof e.handledBy === 'string' ? e.handledBy : (e.handledBy?.name || 'Unassigned'),
          addedDate:       String(e.addedDate || new Date(e.createdAt || e.date || Date.now()).toLocaleDateString()),
          source:          String(e.source ?? 'Walk-in'),
          preferredBranch: String(e.preferredBranch || e.branch || 'Main Branch'),
          enquiryDate:     String(e.enquiryDate || new Date(e.createdAt || e.date || Date.now()).toLocaleDateString()),
          avatar:          String(e.avatar || e.name?.substring(0, 2).toUpperCase() || 'NA'),
          followUps:       e.followUps || [],
          isToday:         e.isToday,
          isUpcoming:      e.isUpcoming,
          isOverdue:       e.isOverdue,
          convertedDate:   e.convertedDate
        }));
        setEnquiries(mapped);
        setFetchState('success');
      })
      .catch(() => {
        // Rule 46: no console.error — error surfaced via fetchState
        setFetchState('error');
      });
  }, []);

  const filtered = enquiries.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(searchParam.toLowerCase()) ||
      e.phone.includes(searchParam.replace(/\D/g, ''));
    const matchStatus = statusParam === 'All' || e.status === statusParam;
    return matchSearch && matchStatus;
  });

  const colEnquiries = (status: EnquiryStatus) => filtered.filter((e) => e.status === status);

  const handleQuickConvert = (ev: React.MouseEvent, enq: Enquiry) => {
    ev.stopPropagation();
    // Rule 67: navigate within admin module only — no /manager/ cross-module routes
    router.push(`${ADMIN_ROUTES.STUDENTS}/new?name=${encodeURIComponent(enq.name)}&phone=${encodeURIComponent(enq.phone)}`);
  };

  const handleQuickLost = (ev: React.MouseEvent, id: string) => {
    ev.stopPropagation();
    setEnquiries((prev) => prev.map((x) => (x.id === id ? { ...x, status: 'Lost' as EnquiryStatus } : x)));
  };

  if (fetchState === 'loading') {
    return (
      <div className="crm-page">
        <div className="crm-empty-state">
          <div className="crm-spinner" />
          <p className="crm-empty-sub">Loading enquiries…</p>
        </div>
      </div>
    );
  }

  if (fetchState === 'error') {
    return (
      <div className="crm-page">
        <div className="crm-empty-state">
          <XCircle size={40} className="crm-empty-icon" />
          <p className="crm-empty-title">Failed to load enquiries</p>
          <p className="crm-empty-sub">Check your backend connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="crm-page">

      {/* ── Page Header ── */}
      <div className="crm-page-header">
        <nav className="crm-breadcrumb">CRM &rsaquo; Enquiries</nav>
        <div className="crm-page-header-row">
          <div>
            <h1 className="crm-page-title">Enquiry Pipeline</h1>
            <p className="crm-page-subtitle">
              {filtered.length} lead{filtered.length !== 1 ? 's' : ''} {'•'} Track every prospect from enquiry to admission
            </p>
          </div>
          <div className="crm-page-header-actions">
            <div className="crm-view-toggle">
              <button
                className={`crm-view-btn ${viewParam === 'kanban' ? 'crm-view-btn--active' : ''}`}
                onClick={() => pushParams({ view: 'kanban' })}
                title="Kanban view"
                aria-label="Switch to kanban view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={`crm-view-btn ${viewParam === 'table' ? 'crm-view-btn--active' : ''}`}
                onClick={() => pushParams({ view: 'table' })}
                title="Table view"
                aria-label="Switch to table view"
              >
                <List size={16} />
              </button>
            </div>
            <button
              className="crm-btn-primary"
              onClick={() => router.push(ADMIN_ROUTES.CRM_ENQUIRY_ADD)}
            >
              <Plus size={16} />
              Add Enquiry
            </button>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="crm-toolbar">
        <div className="crm-search-wrap">
          <Search size={15} />
          <input
            type="text"
            className="crm-search-input"
            placeholder="Search by name or phone…"
            value={searchParam}
            onChange={(e) => pushParams({ q: e.target.value })}
          />
        </div>
        <select
          className="crm-select crm-status-filter"
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

      {/* ── Kanban View ── */}
      {viewParam === 'kanban' && (
        <>
          {filtered.length === 0 ? (
            <div className="crm-empty-state crm-mt-48">
              <PhoneCall size={48} className="crm-empty-icon" />
              <p className="crm-empty-title">No enquiries yet</p>
              <p className="crm-empty-sub">Add your first lead to start the pipeline</p>
              <button className="crm-btn-primary crm-mt-8" onClick={() => router.push(ADMIN_ROUTES.CRM_ENQUIRY_ADD)}>
                <Plus size={15} /> Add Enquiry
              </button>
            </div>
          ) : (
            <div className="crm-kanban-board">
              {KANBAN_COLUMNS.map((col) => {
                const cards = colEnquiries(col.id);
                return (
                  <div key={col.id} className="crm-kanban-col">
                    <div className="crm-kanban-col-header">
                      <div className="crm-kanban-col-header-left">
                        <span className={`crm-col-dot ${DOT_CLASS[col.id]}`} />
                        <span className="crm-kanban-col-label">{col.label}</span>
                        <span className="crm-col-count">{cards.length}</span>
                      </div>
                      <button className="crm-btn-icon" title="More options" aria-label="Column options">
                        <MoreHorizontal size={15} />
                      </button>
                    </div>
                    <div className="crm-kanban-col-body">
                      {cards.length === 0 ? (
                        <div className="crm-kanban-empty">
                          <PhoneCall size={28} />
                          <p className="crm-kanban-empty-title">No {col.label} leads</p>
                          <p className="crm-kanban-empty-sub">Leads will appear here when moved to {col.label}</p>
                        </div>
                      ) : (
                        cards.map((enq) => (
                          <KanbanCard
                            key={enq.id}
                            enq={enq}
                            colClass={col.cardClass}
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

      {/* ── Table View ── */}
      {viewParam === 'table' && (
        <div className="crm-card crm-card--flush">
          {filtered.length === 0 ? (
            <div className="crm-empty-state">
              <PhoneCall size={40} className="crm-empty-icon" />
              <p className="crm-empty-title">No enquiries found</p>
              <p className="crm-empty-sub">Try a different search or status filter</p>
              <button className="crm-btn-primary crm-mt-8" onClick={() => router.push(ADMIN_ROUTES.CRM_ENQUIRY_ADD)}>
                <Plus size={15} /> Add Enquiry
              </button>
            </div>
          ) : (
            <div className="crm-table-wrap">
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Preferred Shift</th>
                    <th>Status</th>
                    <th>Handled By</th>
                    <th>Date Added</th>
                    <th>Follow-up</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((enq, idx) => (
                    <tr
                      key={enq.id}
                      onClick={() => router.push(`${ADMIN_ROUTES.CRM_ENQUIRIES}/${enq.id}`)}
                    >
                      <td className="crm-td-index">{idx + 1}</td>
                      <td>
                        <div className="crm-table-name-cell">
                          <div className="crm-avatar crm-avatar--sm">{enq.avatar}</div>
                          <span className="crm-table-name-text">{enq.name}</span>
                        </div>
                      </td>
                      <td className="crm-masked">{maskPhone(enq.phone)}</td>
                      <td><span className="crm-badge crm-badge--info">{enq.shift}</span></td>
                      <td><StatusBadge status={enq.status} /></td>
                      <td className="crm-td-secondary">{enq.handledBy}</td>
                      <td className="crm-td-secondary">{enq.addedDate}</td>
                      <td>
                        <FollowUpBadge isOverdue={enq.isOverdue} isToday={enq.isToday} isUpcoming={enq.isUpcoming} />
                      </td>
                      <td>
                        <div className="crm-row-actions">
                          <button
                            className="crm-btn-icon crm-btn-icon-success"
                            title="Convert to Admission"
                            aria-label="Convert to admission"
                            onClick={(e) => handleQuickConvert(e, enq)}
                          >
                            <CheckCircle size={14} />
                          </button>
                          <button
                            className="crm-btn-icon crm-btn-icon-danger"
                            title="Mark as Lost"
                            aria-label="Mark as lost"
                            onClick={(e) => handleQuickLost(e, enq.id)}
                          >
                            <XCircle size={14} />
                          </button>
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
