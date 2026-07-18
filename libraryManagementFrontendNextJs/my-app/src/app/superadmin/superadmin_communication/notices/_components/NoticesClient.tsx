'use client';
// RESPONSIBILITY: Renders communication notices dashboard, broadcast controls, and notice management modal.
import { useState, useMemo } from 'react';
import { ChevronRight, Plus, X, Edit2, Trash2, Send, ChevronLeft } from 'lucide-react';
import { useNoticesClient } from '@/app/superadmin/superadmin_communication/notices/_components/useNoticesClient';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export function NoticesClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const {
    notices, showAdd, setShowAdd, editItem, deleteItem, setDeleteItem,
    broadcastItem, setBroadcastItem, toast, form, setForm, openAdd, openEdit,
    handleSave, handleDelete, handleBroadcast
  } = useNoticesClient();

  const searchedNotices = useMemo(() => {
    if (!searchTerm) return notices;
    const lowerSearch = searchTerm.toLowerCase();
    return notices.filter(n => 
      n.title?.toLowerCase().includes(lowerSearch) ||
      n.message?.toLowerCase().includes(lowerSearch) ||
      n.postedBy?.toLowerCase().includes(lowerSearch)
    );
  }, [notices, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(searchedNotices.length / pageSize);
  const paginatedNotices = searchedNotices.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="relative p-2 sm:p-4">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-bg-card border border-border shadow-xl rounded-md px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-bold text-text-primary">{toast}</span>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-bg-card w-full max-w-lg rounded-xl shadow-2xl border border-border flex flex-col relative overflow-hidden">
            <button onClick={() => setShowAdd(false)} className="absolute top-4 right-4 text-text-secondary hover:text-danger cursor-pointer"><X size={16} /></button>
            <div className="px-6 py-5 border-b border-border">
              <p className="text-lg font-bold text-primary flex items-center gap-2">{editItem ? <><Edit2 size={16}/> Edit Notice</> : <><Send size={16}/> Post Notice</>}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-text-secondary mb-1 block">Title <span className="text-danger">*</span></label>
                <input className="w-full bg-bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" placeholder="Notice title"
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-bold text-text-secondary mb-1 block">Message <span className="text-danger">*</span></label>
                <textarea className="w-full bg-bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" rows={6} placeholder="Notice message..."
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-bold text-text-secondary mb-1 block">Valid Till <span className="text-danger">*</span></label>
                <input type="date" className="w-full bg-bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors"
                  value={form.validTill} onChange={e => setForm(f => ({ ...f, validTill: e.target.value }))} />
              </div>
            </div>
            <div className="px-6 py-4 bg-bg-page border-t border-border flex justify-end gap-3">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-border text-text-primary text-sm font-bold rounded-md hover:bg-bg-input transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={!form.title || !form.message || !form.validTill}>
                <Send size={16} /> {editItem ? 'Update Notice' : 'Post Notice'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-bg-card w-full max-w-sm rounded-xl shadow-2xl border border-border flex flex-col p-6">
            <p className="text-base font-bold text-primary flex items-center gap-2 mb-2"><Trash2 size={16} /> Delete Notice?</p>
            <p className="text-sm text-text-secondary mb-6">"{deleteItem.title}" will be permanently deleted.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteItem(null)} className="px-4 py-2 border border-border text-text-primary text-sm font-bold rounded-md hover:bg-bg-input transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-danger text-danger-foreground text-sm font-bold rounded-md hover:brightness-95 transition-all cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Confirmation */}
      {broadcastItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-bg-card w-full max-w-sm rounded-xl shadow-2xl border border-border flex flex-col p-6">
            <p className="text-base font-bold text-primary flex items-center gap-2 mb-2"><Send size={16} /> Broadcast via WhatsApp</p>
            <p className="text-sm text-text-secondary mb-6">Send "{broadcastItem.title}" to all active students via WhatsApp?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setBroadcastItem(null)} className="px-4 py-2 border border-border text-text-primary text-sm font-bold rounded-md hover:bg-bg-input transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleBroadcast} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:brightness-95 transition-all cursor-pointer">Broadcast</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center text-xs font-bold text-text-secondary mb-2 space-x-2">
            <span>Communication</span><ChevronRight size={12} /><span>Notices</span>
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary flex items-center gap-2 tracking-tight"><Send size={24}/> Notice Board</h1>
          <p className="text-sm text-text-secondary mt-1">Post and manage library notices for students.</p>
        </div>
        <button onClick={openAdd} className="flex items-center justify-center gap-1.5 bg-primary hover:brightness-95 text-primary-foreground text-sm font-bold py-2 px-4 rounded-md transition-all shadow-sm cursor-pointer">
          <Plus size={16} /> Post Notice
        </button>
      </div>

      <div className="bg-bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        {notices.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="mb-4"><Send size={48} className="text-text-secondary opacity-50" /></div>
            <p className="text-base font-bold text-text-primary mb-4">No notices posted yet.</p>
            <button onClick={openAdd} className="flex items-center justify-center gap-1.5 bg-primary hover:brightness-95 text-primary-foreground text-sm font-bold py-2 px-4 rounded-md transition-all shadow-sm cursor-pointer">
              <Plus size={16} /> Post Notice
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full p-4">
            <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
            
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-bg-page/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Title</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Message</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Valid Till</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Posted By</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Posted Date</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedNotices.length > 0 ? (
                    paginatedNotices.map((notice, index) => (
                      <TableRow 
                        key={index}
                        className="hover:bg-bg-page/50 transition-colors"
                      >
                        <TableCell className="font-bold text-text-primary">
                          {notice.title}
                        </TableCell>
                        <TableCell>
                          <span className="text-text-secondary text-sm truncate block w-full pt-1" title={notice.message}>
                            {notice.message}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${notice.status === 'Active' ? 'bg-[#064E3B] text-[#34D399]' : 'bg-bg-input text-text-secondary'} mt-2 inline-block`}>
                            {notice.status === 'Active' ? 'Active' : 'Expired'}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-text-secondary">
                          {notice.validTill}
                        </TableCell>
                        <TableCell className="text-text-secondary text-sm">
                          {notice.postedBy}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-text-secondary">
                          {notice.postedDate}
                        </TableCell>
                        <TableCell>
                          <div className="h-full flex items-center gap-2">
                            <button onClick={() => openEdit(notice)} className="w-7 h-7 flex items-center justify-center rounded-md text-text-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer" title="Edit"><Edit2 size={14} /></button>
                            <button onClick={() => setBroadcastItem(notice)} className="w-7 h-7 flex items-center justify-center rounded-md text-text-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer" title="Broadcast"><Send size={14} /></button>
                            <button onClick={() => setDeleteItem(notice)} className="w-7 h-7 flex items-center justify-center rounded-md text-danger hover:bg-danger hover:text-danger-foreground transition-colors duration-200 cursor-pointer" title="Delete"><Trash2 size={14} /></button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-text-secondary">
                        No notices match your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination Footer */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm font-semibold text-text-secondary">
                Showing {paginatedNotices.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedNotices.length)} of {searchedNotices.length} notices
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-semibold text-text-primary">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
