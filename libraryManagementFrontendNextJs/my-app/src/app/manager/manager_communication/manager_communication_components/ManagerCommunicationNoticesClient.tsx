'use client';

// RESPONSIBILITY: Renders the Notice Board UI and manages local form states.
import { useState } from 'react';
import { ChevronRight, Plus, X, Edit2, Trash2, Send, Megaphone, CheckCircle, Smartphone } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/manager/manager_reusable/gridTheme';
import { useNotices } from '@/app/manager/manager_communication/manager_communication_hooks/useNotices';
import type { Notice } from '@/app/manager/manager_communication/manager_communication_types/manager_communication_types';

type CellParams = { value: string; data?: Notice };

ModuleRegistry.registerModules([AllCommunityModule]);

export function ManagerCommunicationNoticesClient() {
  const { notices, status, addNotice, updateNotice, deleteNotice } = useNotices();

  const [showAdd, setShowAdd]             = useState(false);
  const [editItem, setEditItem]           = useState<Notice | null>(null);
  const [deleteItem, setDeleteItem]       = useState<Notice | null>(null);
  const [broadcastItem, setBroadcastItem] = useState<Notice | null>(null);
  const [toast, setToast]                 = useState('');
  const [form, setForm]                   = useState({ title: '', message: '', validTill: '' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const openAdd  = () => { setForm({ title: '', message: '', validTill: '' }); setEditItem(null); setShowAdd(true); };
  const openEdit = (n: Notice) => { setForm({ title: n.title, message: n.message, validTill: n.validTill }); setEditItem(n); setShowAdd(true); };

  const handleSave = async () => {
    if (!form.title || !form.message || !form.validTill) return;
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

  const colDefs: unknown[] = [
    { field: 'title', headerName: 'Title', width: 220, cellRenderer: (p: CellParams) => <span className="text-sm font-semibold text-text-primary">{p.value}</span> },
    { field: 'message', headerName: 'Message', flex: 1, minWidth: 250, cellRenderer: (p: CellParams) => <span className="text-sm text-text-secondary truncate block w-full pt-1" title={p.value}>{p.value}</span> },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellRenderer: (p: CellParams) => (
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold mt-2 inline-flex items-center gap-1 ${p.value === 'Active' ? 'bg-success-bg text-success' : 'border border-border text-text-secondary'}`}>
          {p.value === 'Active' ? <CheckCircle size={12} /> : null} {p.value}
        </span>
      )
    },
    { field: 'validTill', headerName: 'Valid Till', width: 130, cellRenderer: (p: CellParams) => <span className="font-mono text-[12px] text-text-primary tracking-tight">{p.value}</span> },
    { field: 'postedBy', headerName: 'Posted By', width: 130, cellRenderer: (p: CellParams) => <span className="text-sm text-text-secondary">{p.value}</span> },
    { field: 'postedDate', headerName: 'Posted Date', width: 130, cellRenderer: (p: CellParams) => <span className="font-mono text-[12px] text-text-primary tracking-tight">{p.value}</span> },
    {
      headerName: 'Actions',
      width: 140,
      sortable: false,
      cellRenderer: (params: CellParams) => (
        <div className="h-full flex items-center gap-2">
          <button onClick={() => openEdit(params?.data)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary bg-transparent hover:bg-primary hover:text-white transition-colors" title="Edit"><Edit2 size={14} /></button>
          <button onClick={() => setBroadcastItem(params?.data)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary bg-transparent hover:bg-primary hover:text-white transition-colors" title="Broadcast"><Send size={14} /></button>
          <button onClick={() => setDeleteItem(params?.data)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-danger bg-transparent hover:bg-danger hover:text-white transition-colors" title="Delete"><Trash2 size={14} /></button>
        </div>
      )
    }
  ];

  if (status === 'loading') {
    return <div className="p-6 min-h-screen"><div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-gray-400 rounded w-3/4"></div><div className="space-y-2"><div className="h-4 bg-gray-400 rounded"></div><div className="h-4 bg-gray-400 rounded w-5/6"></div></div></div></div></div>;
  }

  return (
    <div className="p-6 min-h-screen relative">
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-bg-card border border-border shadow-lg rounded-lg px-4 py-3 text-sm font-medium text-text-primary flex items-center gap-2"><CheckCircle size={16} className="text-success" /> {toast}</div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-bg-card w-full rounded-2xl shadow-2xl flex flex-col p-6 max-w-lg relative border border-border">
            <button onClick={() => setShowAdd(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-danger-bg text-text-secondary hover:text-danger transition-colors"><X size={16} /></button>
            <p className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              {editItem ? <Edit2 size={18} /> : <Megaphone size={18} />} {editItem ? 'Edit Notice' : 'Post Notice'}
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-medium text-text-secondary mb-1 block">Title <span className="text-danger">*</span></label>
                <input className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Notice title"
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="text-[13px] font-medium text-text-secondary mb-1 block">Message <span className="text-danger">*</span></label>
                <textarea className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" rows={6} placeholder="Notice message..."
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <div>
                <label className="text-[13px] font-medium text-text-secondary mb-1 block">Valid Till <span className="text-danger">*</span></label>
                <input type="date" className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  value={form.validTill} onChange={e => setForm(f => ({ ...f, validTill: e.target.value }))} />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-border text-text-primary rounded hover:bg-bg-elevated transition-colors text-sm font-medium">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
                disabled={!form.title || !form.message || !form.validTill}>
                <Megaphone size={16} /> {editItem ? 'Update Notice' : 'Post Notice'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-bg-card w-full rounded-2xl shadow-2xl flex flex-col p-6 max-w-sm relative border border-border">
            <p className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2"><Trash2 size={18} className="text-danger" /> Delete Notice?</p>
            <p className="text-sm text-text-secondary">"{deleteItem.title}" will be permanently deleted.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteItem(null)} className="px-4 py-2 border border-border text-text-primary rounded hover:bg-bg-elevated transition-colors text-sm font-medium">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-danger text-white rounded hover:bg-danger-hover transition-colors text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Confirmation */}
      {broadcastItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-bg-card w-full rounded-2xl shadow-2xl flex flex-col p-6 max-w-sm relative border border-border">
            <p className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2"><Smartphone size={18} className="text-success" /> Broadcast via WhatsApp</p>
            <p className="text-sm text-text-secondary">Send "{broadcastItem.title}" to all active students via WhatsApp?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setBroadcastItem(null)} className="px-4 py-2 border border-border text-text-primary rounded hover:bg-bg-elevated transition-colors text-sm font-medium">Cancel</button>
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
          <h1 className="text-[22px] font-bold text-text-primary flex items-center gap-2"><Megaphone size={24} /> Notice Board</h1>
          <p className="text-[13px] text-text-secondary mt-1.5">Post and manage library notices for students.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors text-sm font-medium">
          <Plus size={16} /> Post Notice
        </button>
      </div>

      <div className="bg-bg-card rounded-xl border border-border p-4 shadow-sm">
        {notices.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="mb-4 text-text-secondary opacity-50"><Megaphone size={48} /></div>
            <p className="text-lg font-semibold text-text-primary mb-4">No notices posted yet.</p>
            <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors text-sm font-medium">
              <Plus size={16} /> Post Notice
            </button>
          </div>
        ) : (
          <div className="w-full overflow-hidden border border-border rounded-xl h-[500px]">
            <AgGridReact
              theme={gridTheme}
              rowData={notices}
              columnDefs={colDefs as never}
              rowHeight={56}
              headerHeight={48}
              pagination={true}
              paginationPageSize={10}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
