'use client';
// RESPONSIBILITY: Renders the SuperadminComplaintsClient component.
import { ChevronRight, MessageSquare, Plus, X, Circle, CheckCircle, Smile, Eye, RefreshCw } from 'lucide-react';
import { useSuperadminComplaintsClient, TABS } from '@/app/superadmin/superadmin_communication/complaints/_components/useSuperadminComplaintsClient';
import type { SuperadminCommunicationComplaintStatus as CStatus } from '@/app/superadmin/superadmin_communication/superadmin_communication_types/SuperadminCommunicationTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

export function SuperadminComplaintsClient() {
  const {
    tab, setTab, showAdd, setShowAdd, viewItem, setViewItem, resolveItem, setResolveItem,
    resolveNote, setResolveNote, toast, addForm, setAddForm, expandedDesc,
    filtered, handleAdd, markInProgress, handleResolve, toggleDesc
  } = useSuperadminComplaintsClient();
  const table = useClientTable(filtered);

  const statusBadge = (s: CStatus) => {
    if (s === 'Open')        return <span className="flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-danger/10 text-danger border border-danger/20"><Circle size={10} fill="currentColor" /> Open</span>;
    if (s === 'In-Progress') return <span className="flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-warning/10 text-warning border border-warning/20"><Circle size={10} fill="currentColor" /> In-Progress</span>;
    return <span className="flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-success/10 text-success border border-success/20"><CheckCircle size={10} /> Resolved</span>;
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-page animate-in fade-in duration-200">
      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5">
          <div className="bg-text-primary text-bg-card px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
            {toast}
          </div>
        </div>
      )}

      {/* Add Complaint Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative">
            <button onClick={() => setShowAdd(false)} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"><X size={16} /></button>
            <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-2">
              <MessageSquare size={20} className="text-primary" />
              <div>
                <p className="text-lg font-extrabold text-text-primary">Add Complaint</p>
                <p className="text-xs text-text-secondary mt-1">Staff raises complaint on student&apos;s behalf.</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-primary">Student (optional)</label>
                <input className="w-full h-10 px-3 rounded-md border border-border bg-input text-text-primary text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-text-secondary" placeholder="Search student name..."
                  value={addForm.student} onChange={e => setAddForm(f => ({ ...f, student: e.target.value }))} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer accent-primary" checked={addForm.anonymous}
                  onChange={e => setAddForm(f => ({ ...f, anonymous: e.target.checked }))} />
                <span className="text-sm font-medium text-text-primary">Hide student identity from staff view</span>
              </label>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-primary flex gap-1">Title <span className="text-danger">*</span></label>
                <input className="w-full h-10 px-3 rounded-md border border-border bg-input text-text-primary text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-text-secondary" placeholder="Brief complaint title"
                  value={addForm.title} onChange={e => setAddForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-primary flex gap-1">Description <span className="text-danger">*</span></label>
                <textarea className="w-full bg-input border border-border rounded-md p-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none placeholder:text-text-secondary" rows={4} placeholder="Describe the issue in detail..."
                  value={addForm.description} onChange={e => setAddForm(f => ({ ...f, description: e.target.value }))} />
              </div>
            </div>
            <div className="p-4 border-t border-border flex justify-end gap-3 bg-muted/30">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-input border border-transparent rounded-md transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={!addForm.title || !addForm.description}>Submit Complaint</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative">
            <button onClick={() => setViewItem(null)} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"><X size={16} /></button>
            <div className="p-6">
              <p className="text-xl font-extrabold text-text-primary pr-8">{viewItem.title}</p>
              <div className="flex items-center gap-3 mt-3">
                {statusBadge(viewItem.status)}
                <span className="px-2 py-0.5 rounded-sm text-xs font-bold border border-border text-text-secondary">{viewItem.date}</span>
              </div>
              <p className="text-sm mt-4 flex gap-1.5 items-center">
                <span className="text-text-secondary">By:</span> 
                <span className={`px-2 py-1 rounded-sm font-bold ${viewItem.isAnonymous ? 'bg-danger/10 text-danger italic' : 'bg-primary/10 text-primary'}`}>
                  {viewItem.student}
                </span>
              </p>
              <p className="text-sm text-text-primary leading-relaxed mt-4 p-4 bg-muted/30 rounded-md border border-border/50">{viewItem.description}</p>
              {viewItem.resolvedNote && (
                <div className="mt-4 bg-success/10 border-l-4 border-l-success text-success-foreground p-4 rounded-r-[var(--radius-md)] text-sm leading-relaxed">
                  <strong className="text-success mr-1 font-extrabold">Resolution:</strong> {viewItem.resolvedNote} 
                  <div className="mt-1 text-xs opacity-80 font-bold uppercase tracking-wider">— {viewItem.resolvedBy} on {viewItem.resolvedDate}</div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-border flex justify-end bg-muted/30">
              <button onClick={() => setViewItem(null)} className="px-5 py-2 bg-input text-text-primary text-sm font-bold rounded-md hover:bg-input/80 transition-colors cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {resolveItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative">
            <button onClick={() => setResolveItem(null)} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"><X size={16} /></button>
            <div className="p-5 border-b border-border bg-success/10 flex items-center gap-2">
              <CheckCircle size={20} className="text-success" />
              <div>
                <p className="text-lg font-extrabold text-success">Resolve Complaint</p>
                <p className="text-xs text-success/80 mt-1 font-medium">&quot;{resolveItem.title}&quot;</p>
              </div>
            </div>
            <div className="p-5">
              <label className="text-xs font-bold text-text-primary flex gap-1 mb-2">Resolution Note <span className="text-danger">*</span></label>
              <textarea className="w-full bg-input border border-border rounded-md p-3 text-sm text-text-primary focus:ring-2 focus:ring-success focus:border-success outline-none transition-all resize-none placeholder:text-text-secondary" rows={3} placeholder="Describe how the issue was resolved..."
                value={resolveNote} onChange={e => setResolveNote(e.target.value)} />
            </div>
            <div className="p-4 border-t border-border flex justify-end gap-3 bg-muted/30">
              <button onClick={() => setResolveItem(null)} className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-input border border-transparent rounded-md transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleResolve} className="flex items-center gap-2 px-4 py-2 bg-success text-white text-sm font-bold rounded-md hover:bg-success/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm" disabled={!resolveNote}>
                <CheckCircle size={14} /> Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-bold tracking-wide mb-6">
          <span className="hover:text-primary transition-colors cursor-pointer">Communication</span><ChevronRight size={12} className="opacity-50" />
          <span className="text-text-primary">Complaints</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-text-primary tracking-tight flex items-center gap-3"><MessageSquare size={28} className="text-primary" /> Complaints</h1>
            <p className="text-sm text-text-secondary mt-1">Track and resolve student complaints.</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:bg-primary/90 shadow-sm transition-all cursor-pointer active:scale-95">
            <Plus size={16} /> Add Complaint
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border mb-6 overflow-x-auto">
        {TABS.map(( t ) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${tab === t ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center text-text-secondary">
            <div className="h-20 w-20 rounded-full bg-input/50 flex items-center justify-center mb-6">
              <Smile size={40} className="opacity-50 text-success" />
            </div>
            <p className="text-lg font-extrabold text-text-primary">No open complaints!</p>
            <p className="text-sm mt-2">All issues are resolved in this category.</p>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-border">
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">#</th>
                  <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Title</th>
                  <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Student</th>
                  <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Description</th>
                  <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {table.paginatedData.map((c, i) => {
                  const isExpanded = expandedDesc.includes(c.id);
                  const isLong = c.description.length > 60;
                  return (
                    <tr key={c.id} className="hover:bg-input/30 transition-colors">
                      <td className="p-4 text-sm font-mono text-text-secondary">{i + 1}</td>
                      <td className="p-4 text-sm font-bold text-text-primary">{c.title}</td>
                      <td className={`p-4 text-sm font-medium ${c.isAnonymous ? 'text-danger italic' : 'text-primary'}`}>
                        {c.student}
                      </td>
                      <td className="p-4 text-sm text-text-secondary max-w-xs leading-relaxed">
                        <span>{isLong && !isExpanded ? c.description.slice(0, 60) + '…' : c.description}</span>
                        {isLong && (
                          <button onClick={() => toggleDesc(c.id)} className="ml-1 text-xs font-bold text-primary hover:underline cursor-pointer">
                            {isExpanded ? 'less' : 'more'}
                          </button>
                        )}
                      </td>
                      <td className="p-4">{statusBadge(c.status)}</td>
                      <td className="p-4 text-sm text-text-secondary whitespace-nowrap">{c.date}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setViewItem(c)} className="h-8 w-8 rounded-md flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer" title="View">
                            <Eye size={14} />
                          </button>
                          {c.status === 'Open' && (
                            <button onClick={() => markInProgress(c.id)} className="h-8 w-8 rounded-md flex items-center justify-center text-text-secondary hover:text-warning hover:bg-warning/10 transition-colors cursor-pointer" title="Mark In-Progress">
                              <RefreshCw size={14} />
                            </button>
                          )}
                          {c.status !== 'Resolved' && (
                            <button onClick={() => setResolveItem(c)} className="h-8 w-8 rounded-md flex items-center justify-center text-text-secondary hover:text-success hover:bg-success/10 transition-colors cursor-pointer" title="Resolve">
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
          </div>
        )}
      </div>
    </div>
  );
}

