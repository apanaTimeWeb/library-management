import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const complaintSchema = z.object({
  studentName: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  title: z.string().min(3, "Title must be at least 3 characters"),
  desc: z.string().min(10, "Description must be at least 10 characters")
});
type ComplaintFormData = z.infer<typeof complaintSchema>;

'use client';
// RESPONSIBILITY: Renders the Complaints UI and handles status filtering and resolution.
import { useState } from 'react';
import { TablePagination } from '@/components/ui/table-pagination';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronRight, Plus, X, Eye, RefreshCw, CheckCircle, Smile, MessageCircle } from 'lucide-react';
import { useManagerComplaints } from '@/app/manager/manager_communication/manager_communication_hooks/useManagerComplaints';
import type { Complaint } from '@/app/manager/manager_communication/manager_communication_types/manager_communication_types';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

const TABS: (Complaint['status'] | 'All')[] = ['All', 'New', 'In-Progress', 'Resolved'];

export function ManagerCommunicationComplaintsClient() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get('tab') as Complaint['status'] | 'All') || 'All';

  const { complaints, status, addComplaint, updateComplaintStatus } = useManagerComplaints();

  const [showAdd, setShowAdd]           = useState(false);
  const [viewItem, setViewItem]         = useState<Complaint | null>(null);
  const [resolveItem, setResolveItem]   = useState<Complaint | null>(null);
  const [resolveNote, setResolveNote]   = useState('');
  const [toast, setToast]               = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<any>({ resolver: zodResolver(complaintSchema), defaultValues: { isAnonymous: false } });
  const [expandedDesc, setExpandedDesc] = useState<string[]>([]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = currentTab === 'All' ? complaints : complaints.filter(c => c.status === currentTab);
  const table = useClientTable(filtered, 10);

  const setTab = (t: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (t === 'All') params.delete('tab');
    else params.set('tab', t);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleAdd = async (data: any) => {
    await addComplaint({
      title: data.title,
      studentName: data.isAnonymous ? 'Anonymous' : (data.studentName || ''),
      desc: data.desc,
      phone: '',
    });
    reset();
    setShowAdd(false);
    showToast('Complaint submitted successfully');
  };

  const markInProgress = async (id: string) => {
    await updateComplaintStatus(id, 'In-Progress');
    showToast('Marked In-Progress');
  };

  const handleResolve = async () => {
    if (!resolveItem || !resolveNote) return;
    await updateComplaintStatus(resolveItem.id, 'Resolved', resolveNote);
    setResolveItem(null); 
    setResolveNote('');
    showToast('Complaint resolved');
  };

  const statusBadge = (s: Complaint['status']) => {
    if (s === 'New') return <span className="eng-badge eng-badge--danger inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger"></span> New</span>;
    if (s === 'In-Progress') return <span className="eng-badge eng-badge--warning inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning"></span> In-Progress</span>;
    return <span className="eng-badge eng-badge--success inline-flex items-center gap-1"><CheckCircle size={12}/> Resolved</span>;
  };

  const toggleDesc = (id: string) =>
    setExpandedDesc(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  if (status === 'loading') {
    return <div className="eng-page"><div className="animate-pulse space-y-4"><div className="h-8 bg-skeleton-base rounded w-1/4"></div><div className="h-64 bg-skeleton-base rounded w-full"></div></div></div>;
  }

  return (
    <div className="eng-page">
      {toast && <div className="eng-toast-wrap"><div className="eng-toast flex items-center gap-2"><CheckCircle size={16}/> {toast}</div></div>}

      {/* Add Complaint Modal */}
      {showAdd && (
        <div className="eng-overlay">
          <div className="eng-modal eng-modal--md">
            <button onClick={() => setShowAdd(false)} className="eng-modal-close" aria-label="Close"><X size={16} /></button>
            <p className="eng-modal-title flex items-center gap-2"><Plus size={18}/> Add Complaint</p>
            <p className="eng-modal-desc">Staff raises complaint on student&apos;s behalf.</p>
            <form id="add-complaint-form" onSubmit={handleSubmit(handleAdd)} className="eng-form-stack">
              <div>
                <label className="eng-label">Student Name (optional)</label>
                <input className="eng-input" placeholder="Search student name..." {...register('studentName')} />
              </div>
              <label className="eng-checkbox-row">
                <input type="checkbox" {...register('isAnonymous')} />
                Hide student identity from staff view
              </label>
              <div>
                <label className="eng-label">Title <span className="eng-required">*</span></label>
                <input className="eng-input" placeholder="Brief complaint title" {...register('title')} />
              </div>
              <div>
                <label className="eng-label">Description <span className="eng-required">*</span></label>
                <textarea className="eng-textarea" rows={4} placeholder="Describe the issue in detail..." {...register('desc')} />
              </div>
            </form>
            <div className="eng-modal-footer">
              <button type="button" onClick={() => setShowAdd(false)} className="eng-btn-ghost">Cancel</button>
              <button type="submit" form="add-complaint-form" className="eng-btn-primary"
                disabled={isSubmitting}>Submit Complaint</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewItem && (
        <div className="eng-overlay">
          <div className="eng-modal eng-modal--md">
            <button onClick={() => setViewItem(null)} className="eng-modal-close" aria-label="Close"><X size={16} /></button>
            <p className="eng-modal-title">{viewItem.title}</p>
            <div className="eng-modal-badge-row">
              {statusBadge(viewItem.status)}
              <span className="eng-badge eng-badge--outline">{viewItem.submittedOn}</span>
            </div>
            <p className="eng-complaint-by">
              By: <span className={viewItem.studentName === 'Anonymous' ? 'eng-complaint-anon' : 'eng-complaint-named'}>
                {viewItem.studentName}
              </span>
            </p>
            <p className="eng-complaint-desc">{viewItem.desc}</p>
            {viewItem.resolution && (
              <div className="eng-info-box mt-4">
                <strong>Resolution:</strong> {viewItem.resolution} — on {viewItem.resolvedOn}
              </div>
            )}
            <div className="eng-modal-footer">
              <button onClick={() => setViewItem(null)} className="eng-btn-ghost">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {resolveItem && (
        <div className="eng-overlay">
          <div className="eng-modal eng-modal--md">
            <button onClick={() => setResolveItem(null)} className="eng-modal-close" aria-label="Close"><X size={16} /></button>
            <p className="eng-modal-title flex items-center gap-2"><CheckCircle size={18}/> Resolve Complaint</p>
            <p className="eng-modal-desc">&quot;{resolveItem.title}&quot;</p>
            <div>
              <label className="eng-label">Resolution Note <span className="eng-required">*</span></label>
              <textarea className="eng-textarea" rows={3} placeholder="Describe how the issue was resolved..."
                value={resolveNote} onChange={e => setResolveNote(e.target.value)} />
            </div>
            <div className="eng-modal-footer">
              <button onClick={() => setResolveItem(null)} className="eng-btn-ghost">Cancel</button>
              <button onClick={handleResolve} className="eng-btn-success" disabled={!resolveNote}>
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="eng-breadcrumb">
          <span>Communication</span><ChevronRight size={12} /><span>Complaints</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="eng-page-title flex items-center gap-2"><MessageCircle size={24}/> Complaints</h1>
            <p className="eng-page-subtitle">Track and resolve student complaints.</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="eng-btn-primary flex items-center gap-2">
            <Plus size={16} /> Add Complaint
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="eng-tabs eng-tabs-inline mb-6">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`eng-tab${currentTab === t ? ' eng-tab--active' : ''}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="eng-card eng-card--flush">
        {filtered.length === 0 ? (
          <div className="eng-empty">
            <div className="eng-empty__icon text-gray-400"><Smile size={48} /></div>
            <p className="eng-empty__title">No open complaints! All issues are resolved.</p>
          </div>
        ) : (
          <div className="eng-scroll-x">
            
        <div className="flex justify-end mb-4">
            <input 
              type="text" 
              placeholder="Search in table..." 
              className="px-3 py-2 border rounded-md text-sm w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="eng-table">
              <thead>
                <tr>
                  <th>#</th><th>Title</th><th>Student</th><th>Description</th>
                  <th>Status</th><th>Date</th><th>Resolved Date</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {table.paginatedData.map((c, i) => {
                  const isExpanded = expandedDesc.includes(c.id);
                  const isLong = c.desc.length > 60;
                  return (
                    <tr key={c.id}>
                      <td className="eng-td-mono">{i + 1}</td>
                      <td className="eng-td-bold">{c.title}</td>
                      <td className={c.studentName === 'Anonymous' ? 'eng-td-italic-muted' : ''}>{c.studentName}</td>
                      <td>
                        <span>{isLong && !isExpanded ? c.desc.slice(0, 60) + '…' : c.desc}</span>
                        {isLong && (
                          <button onClick={() => toggleDesc(c.id)} className="eng-link-btn ml-1">
                            {isExpanded ? 'less' : 'more'}
                          </button>
                        )}
                      </td>
                      <td>{statusBadge(c.status)}</td>
                      <td className="eng-td-muted">{c.submittedOn}</td>
                      <td className="eng-td-muted">{c.resolvedOn || '—'}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setViewItem(c)} className="eng-btn-icon" aria-label="View" title="View">
                            <Eye size={14} />
                          </button>
                          {c.status === 'New' && (
                            <button onClick={() => markInProgress(c.id)} className="eng-btn-icon" aria-label="Mark In-Progress" title="Mark In-Progress">
                              <RefreshCw size={14} />
                            </button>
                          )}
                          {c.status !== 'Resolved' && (
                            <button onClick={() => setResolveItem(c)} className="eng-btn-icon" aria-label="Resolve" title="Resolve">
                              <CheckCircle size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
      <TablePagination page={page} limit={limit} totalItems={TABS.length} onPageChange={setPage} onLimitChange={setLimit} />

          </div>
        )}
      </div>
    </div>
  );
}



