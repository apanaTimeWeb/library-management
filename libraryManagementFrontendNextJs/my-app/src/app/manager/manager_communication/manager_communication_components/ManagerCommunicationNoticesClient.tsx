'use client';

// RESPONSIBILITY: Renders the Notice Board UI and manages local form states.
import { useState } from 'react';
import { ChevronRight, Plus, X, Edit2, Trash2, Send, Megaphone, CheckCircle, Smartphone } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/manager/manager_reusable/gridTheme';
import { useNotices } from '@/app/manager/manager_communication/manager_communication_hooks/useNotices';
import type { Notice } from '@/app/manager/manager_communication/manager_communication_types/manager_communication_types';

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

  const colDefs: any[] = [
    { field: 'title', headerName: 'Title', width: 220, cellRenderer: (p: any) => <span className="eng-td-bold text-mgr-text-primary">{p.value}</span> },
    { field: 'message', headerName: 'Message', flex: 1, minWidth: 250, cellRenderer: (p: any) => <span className="eng-td-muted text-sm truncate block w-full pt-1" title={p.value}>{p.value}</span> },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellRenderer: (p: any) => (
        <span className={`eng-badge ${p.value === 'Active' ? 'eng-badge--success' : 'eng-badge--outline'} mt-2 inline-flex items-center gap-1`}>
          {p.value === 'Active' ? <CheckCircle size={12} /> : null} {p.value}
        </span>
      )
    },
    { field: 'validTill', headerName: 'Valid Till', width: 130, cellRenderer: (p: any) => <span className="eng-td-mono text-sm">{p.value}</span> },
    { field: 'postedBy', headerName: 'Posted By', width: 130, cellRenderer: (p: any) => <span className="eng-td-muted text-sm">{p.value}</span> },
    { field: 'postedDate', headerName: 'Posted Date', width: 130, cellRenderer: (p: any) => <span className="eng-td-mono text-sm">{p.value}</span> },
    {
      headerName: 'Actions',
      width: 140,
      sortable: false,
      cellRenderer: (params: any) => (
        <div className="h-full flex items-center gap-2">
          <button onClick={() => openEdit(params?.data)} className="eng-btn-icon hover:bg-mgr-primary hover:text-white transition-colors duration-200" title="Edit"><Edit2 size={14} /></button>
          <button onClick={() => setBroadcastItem(params?.data)} className="eng-btn-icon hover:bg-mgr-primary hover:text-white transition-colors duration-200" title="Broadcast"><Send size={14} /></button>
          <button onClick={() => setDeleteItem(params?.data)} className="eng-btn-icon eng-btn-icon--danger hover:bg-red-500 hover:text-white transition-colors duration-200" title="Delete"><Trash2 size={14} /></button>
        </div>
      )
    }
  ];

  if (status === 'loading') {
    return <div className="eng-page"><div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-gray-400 rounded w-3/4"></div><div className="space-y-2"><div className="h-4 bg-gray-400 rounded"></div><div className="h-4 bg-gray-400 rounded w-5/6"></div></div></div></div></div>;
  }

  return (
    <div className="eng-page">
      {toast && (
        <div className="eng-toast-wrap">
          <div className="eng-toast flex items-center gap-2"><CheckCircle size={16} /> {toast}</div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAdd && (
        <div className="eng-overlay">
          <div className="eng-modal eng-modal--lg bg-mgr-bg-card">
            <button onClick={() => setShowAdd(false)} className="eng-modal-close hover:text-red-500"><X size={16} /></button>
            <p className="eng-modal-title mb-4 font-bold text-mgr-text-primary flex items-center gap-2">
              {editItem ? <Edit2 size={18} /> : <Megaphone size={18} />} {editItem ? 'Edit Notice' : 'Post Notice'}
            </p>
            <div className="eng-form-stack space-y-4">
              <div>
                <label className="eng-label text-sm font-semibold mb-1 block">Title <span className="eng-required text-red-500">*</span></label>
                <input className="eng-input py-2 px-3 border rounded w-full" placeholder="Notice title"
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="eng-label text-sm font-semibold mb-1 block">Message <span className="eng-required text-red-500">*</span></label>
                <textarea className="eng-textarea py-2 px-3 border rounded w-full" rows={6} placeholder="Notice message..."
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <div>
                <label className="eng-label text-sm font-semibold mb-1 block">Valid Till <span className="eng-required text-red-500">*</span></label>
                <input type="date" className="eng-input py-2 px-3 border rounded w-full"
                  value={form.validTill} onChange={e => setForm(f => ({ ...f, validTill: e.target.value }))} />
              </div>
            </div>
            <div className="eng-modal-footer mt-6 flex justify-end gap-3">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-mgr-border text-mgr-text-primary rounded hover:bg-mgr-border transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-mgr-primary text-white rounded hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={!form.title || !form.message || !form.validTill}>
                <Megaphone size={16} /> {editItem ? 'Update Notice' : 'Post Notice'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteItem && (
        <div className="eng-overlay">
          <div className="eng-modal eng-modal--sm bg-mgr-bg-card">
            <p className="eng-modal-title mb-2 font-bold text-mgr-text-primary flex items-center gap-2"><Trash2 size={18} /> Delete Notice?</p>
            <p className="eng-modal-desc text-sm text-mgr-text-secondary">"{deleteItem.title}" will be permanently deleted.</p>
            <div className="eng-modal-footer mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteItem(null)} className="px-4 py-2 border border-mgr-border text-mgr-text-primary rounded hover:bg-mgr-border transition-colors">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Confirmation */}
      {broadcastItem && (
        <div className="eng-overlay">
          <div className="eng-modal eng-modal--sm bg-mgr-bg-card">
            <p className="eng-modal-title mb-2 font-bold text-mgr-text-primary flex items-center gap-2"><Smartphone size={18} /> Broadcast via WhatsApp</p>
            <p className="eng-modal-desc text-sm text-mgr-text-secondary">Send "{broadcastItem.title}" to all active students via WhatsApp?</p>
            <div className="eng-modal-footer mt-6 flex justify-end gap-3">
              <button onClick={() => setBroadcastItem(null)} className="px-4 py-2 border border-mgr-border text-mgr-text-primary rounded hover:bg-mgr-border transition-colors">Cancel</button>
              <button onClick={handleBroadcast} className="px-4 py-2 bg-mgr-primary text-white rounded hover:bg-opacity-90 transition-colors">Broadcast</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="eng-breadcrumb mb-2">
            <span>Communication</span><ChevronRight size={12} /><span>Notices</span>
          </div>
          <h1 className="eng-page-title text-2xl font-bold text-mgr-text-primary flex items-center gap-2"><Megaphone size={24} /> Notice Board</h1>
          <p className="eng-page-subtitle text-mgr-text-secondary">Post and manage library notices for students.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-mgr-primary text-white rounded hover:bg-opacity-90 transition-colors font-medium">
          <Plus size={16} /> Post Notice
        </button>
      </div>

      <div className="eng-card eng-card--flush p-4">
        {notices.length === 0 ? (
          <div className="eng-empty py-12 flex flex-col items-center justify-center text-center">
            <div className="eng-empty__icon mb-4 text-gray-400"><Megaphone size={48} /></div>
            <p className="eng-empty__title text-lg font-semibold text-mgr-text-primary mb-4">No notices posted yet.</p>
            <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-mgr-primary text-white rounded hover:bg-opacity-90 transition-colors font-medium">
              <Plus size={16} /> Post Notice
            </button>
          </div>
        ) : (
          <div className="mgr-table-wrapper h-[500px]">
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

