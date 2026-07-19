'use client';
import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';

// RESPONSIBILITY: Renders the Notice Board UI and manages local form states.
import { usePermissions } from '@/app/manager/manager_shared_hooks/usePermissions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { ChevronRight, Plus, X, Edit2, Trash2, Send, Megaphone, CheckCircle, Smartphone } from 'lucide-react';
import { useManagerNotices } from '@/app/manager/manager_communication/manager_communication_hooks/useManagerNotices';
import type { Notice } from '@/app/manager/manager_communication/manager_communication_types/manager_communication_types';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";


const noticeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  validTill: z.string().min(1, 'Valid till is required'),
});
type NoticeFormData = z.infer<typeof noticeSchema>;

export function ManagerCommunicationNoticesClient() {
  const [searchTerm, setSearchTerm] = useUrlState('searchTerm', '' as string);

  const { notices, status, addNotice, updateNotice, deleteNotice } = useManagerNotices();

  const [showAdd, setShowAdd]             = useState(false);
  const [editItem, setEditItem]           = useState<Notice | null>(null);
  const [deleteItem, setDeleteItem]       = useState<Notice | null>(null);
  const [broadcastItem, setBroadcastItem] = useState<Notice | null>(null);
  const [toast, setToast]                 = useState('');
  
  const { canEdit, canDelete } = usePermissions();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<NoticeFormData>({
    resolver: zodResolver(noticeSchema),
    defaultValues: { title: '', message: '', validTill: '' }
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const searchedFiltered = notices.filter(item => 
    !searchTerm || 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const table = useClientTable(searchedFiltered, 10);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const openAdd  = () => { reset({ title: '', message: '', validTill: '' }); setEditItem(null); setShowAdd(true); };
  const openEdit = (n: Notice) => { reset({ title: n.title, message: n.message, validTill: n.validTill }); setEditItem(n); setShowAdd(true); };

  const onSubmit = async (form: NoticeFormData) => {
        if (editItem) {
      await updateNotice(editItem.id, form);
      showToast('Notice updated successfully');
    } else {
      await addNotice(form);
      showToast('Notice posted successfully');
    }
    setShowAdd(false);
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    await deleteNotice(deleteItem.id);
    setDeleteItem(null);
    showToast('Notice deleted');
  };

  const handleBroadcast = () => {
    setBroadcastItem(null);
    showToast('Notice broadcasted to all active students via WhatsApp');
  };


  if (status === 'loading') {
    return <div className="p-6 min-h-screen"><div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-skeleton-base rounded w-3/4"></div><div className="space-y-2"><div className="h-4 bg-skeleton-base rounded"></div><div className="h-4 bg-skeleton-base rounded w-5/6"></div></div></div></div></div>;
  }

  return (
    <div className="p-6 min-h-screen relative">
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-card border border-border shadow-lg rounded-lg px-4 py-3 text-sm font-medium text-text-primary flex items-center gap-2"><CheckCircle size={16} className="text-success" /> {toast}</div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card w-full rounded-2xl shadow-2xl flex flex-col p-6 max-w-lg relative border border-border">
            <button onClick={() => setShowAdd(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-danger-bg text-text-secondary hover:text-danger transition-colors" aria-label="Close"><X size={16} /></button>
            <p className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              {editItem ? <Edit2 size={18} /> : <Megaphone size={18} />} {editItem ? 'Edit Notice' : 'Post Notice'}
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1 block">Title <span className="text-danger">*</span></label>
                <input className="w-full bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Notice title" {...register('title')} />
                {errors.title && <p className="text-danger text-xs mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1 block">Message <span className="text-danger">*</span></label>
                <textarea className="w-full bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" rows={6} placeholder="Notice message..." {...register('message')} />
                {errors.message && <p className="text-danger text-xs mt-1">{errors.message.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1 block">Valid Till <span className="text-danger">*</span></label>
                <input type="date" className="w-full bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" {...register('validTill')} />
                {errors.validTill && <p className="text-danger text-xs mt-1">{errors.validTill.message}</p>}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 border border-border text-text-primary rounded hover:bg-card transition-colors text-sm font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors flex items-center gap-2 text-sm font-medium">
                  <Megaphone size={16} /> {editItem ? 'Update Notice' : 'Post Notice'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card w-full rounded-2xl shadow-2xl flex flex-col p-6 max-w-sm relative border border-border">
            <p className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2"><Trash2 size={18} className="text-danger" /> Delete Notice?</p>
            <p className="text-sm text-text-secondary">"{deleteItem.title}" will be permanently deleted.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteItem(null)} className="px-4 py-2 border border-border text-text-primary rounded hover:bg-card transition-colors text-sm font-medium">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-danger text-white rounded hover:bg-danger-hover transition-colors text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Confirmation */}
      {broadcastItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card w-full rounded-2xl shadow-2xl flex flex-col p-6 max-w-sm relative border border-border">
            <p className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2"><Smartphone size={18} className="text-success" /> Broadcast via WhatsApp</p>
            <p className="text-sm text-text-secondary">Send "{broadcastItem.title}" to all active students via WhatsApp?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setBroadcastItem(null)} className="px-4 py-2 border border-border text-text-primary rounded hover:bg-card transition-colors text-sm font-medium">Cancel</button>
              <button onClick={handleBroadcast} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors text-sm font-medium">Broadcast</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>Communication</span><ChevronRight size={12} /><span>Notices</span>
          </div>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><Megaphone size={24} /> Notice Board</h1>
          <p className="text-sm text-text-secondary mt-1.5">Post and manage library notices for students.</p>
        </div>
        {canEdit && <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors text-sm font-medium">
          <Plus size={16} /> Post Notice
        </button>}
      </div>

      <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
        {notices.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="mb-4 text-text-secondary opacity-50"><Megaphone size={48} /></div>
            <p className="text-lg font-semibold text-text-primary mb-4">No notices posted yet.</p>
            {canEdit && <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors text-sm font-medium">
              <Plus size={16} /> Post Notice
        </button>}
          </div>
        ) : (
<>
<div className="flex justify-end mb-[16px]">
          <input 
            type="text" 
            placeholder="Search in table..." 
            className="px-3 py-2 border border-border rounded-md text-sm bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
          <div className="w-full overflow-x-auto border border-border rounded-xl">
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-card border-b border-border">
                <tr className="text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Valid Till</th>
                  <th className="px-4 py-3 font-semibold">Posted By</th>
                  <th className="px-4 py-3 font-semibold">Posted Date</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {table.paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-page transition-colors">
                    <td className="px-4 py-4"><span className="text-sm font-semibold text-text-primary">{row.title}</span></td>
                    <td className="px-4 py-4"><span className="text-sm text-text-secondary truncate block w-full max-w-xs" title={row.message}>{row.message}</span></td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold inline-flex items-center gap-1 ${row.status === 'Active' ? 'bg-success-bg text-success' : 'border border-border text-text-secondary'}`}>
                        {row.status === 'Active' ? <CheckCircle size={12} /> : null} {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-4"><span className="font-mono text-xs text-text-primary tracking-tight">{row.validTill}</span></td>
                    <td className="px-4 py-4"><span className="text-sm text-text-secondary">{row.postedBy}</span></td>
                    <td className="px-4 py-4"><span className="font-mono text-xs text-text-primary tracking-tight">{row.postedDate}</span></td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex gap-2 items-center justify-end">
                        {canEdit && <button onClick={() => openEdit(row)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted/50 text-muted-foreground hover:text-primary transition-colors" aria-label="Edit" title="Edit"><Edit2 size={14} /></button>}
                        <button onClick={() => setBroadcastItem(row)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted/50 text-muted-foreground hover:text-info transition-colors" aria-label="Broadcast" title="Broadcast"><Send size={14} /></button>
                        {canDelete && <button onClick={() => setDeleteItem(row)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted/50 text-muted-foreground hover:text-danger transition-colors" aria-label="Delete" title="Delete"><Trash2 size={14} /></button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
          </div>
          {searchedFiltered.length > 0 && (
            <div className="mt-4">
              <TablePagination
                page={page}
                limit={limit}
                totalItems={searchedFiltered.length}
                onPageChange={setPage}
                onLimitChange={setLimit}
              />
            </div>
          )}
        </>
)}
      </div>
    </div>
  );
}



