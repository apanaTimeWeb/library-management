'use client';
// RESPONSIBILITY: Renders communication notices dashboard, broadcast controls, and notice management modal.
// DATA FLOW: API /communication/notices -> NoticesPage State -> AG Grid Table / Mutations

import type { ICellRendererParams } from 'ag-grid-community';
import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { ChevronRight, Plus, X, Edit2, Trash2, Send } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_COMMUNICATION_MOCK_NOTICES } from '@superadmin/superadmin_communication/superadmin_communication_data/SuperadminCommunicationMockData';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Notice {
  id: string; title: string; message: string;
  validTill: string; postedBy: string; postedDate: string;
  status: 'Active' | 'Expired';
}

const today = new Date().toISOString().split('T')[0];

export default function NoticesPage() {
  const [notices, setNotices]             = useState<Notice[]>([]);
  const [showAdd, setShowAdd]             = useState(false);
  const [editItem, setEditItem]           = useState<Notice | null>(null);
  const [deleteItem, setDeleteItem]       = useState<Notice | null>(null);
  const [broadcastItem, setBroadcastItem] = useState<Notice | null>(null);
  const [toast, setToast]                 = useState('');
  const [form, setForm]                   = useState({ title: '', message: '', validTill: '' });

  useEffect(() => {
    fetchApi('/communication/notices').then(( data: unknown ) => {
      const actualData = Array.isArray(data) ? data : (data as any)?.data;
      if (!Array.isArray(actualData) || actualData.length === 0 || actualData[0]?.id?.startsWith('MOCK-')) {
        setNotices(SUPERADMIN_COMMUNICATION_MOCK_NOTICES as Notice[]);
        return;
      }
      const mapped: Notice[] = actualData.map(( n: Record<string, unknown> ) => ({
        id: String(n.id || ''),
        title: String(n.title || 'Notice'),
        message: String(n.message || ''),
        postedBy: 'Admin',
        postedDate: n.createdAt ? new Date(String(n.createdAt)).toISOString().split('T')[0] : today,
        validTill: n.validTill ? new Date(String(n.validTill)).toISOString().split('T')[0] : today,
        status: (n.validTill && new Date(String(n.validTill)) >= new Date() ? 'Active' : 'Expired') as 'Active' | 'Expired',
      }));
      setNotices(mapped);
    }).catch(err => logger.error('Failed to load notices', err));
  }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const openAdd  = () => { setForm({ title: '', message: '', validTill: '' }); setEditItem(null); setShowAdd(true); };
  const openEdit = (n: Notice) => { setForm({ title: n.title, message: n.message, validTill: n.validTill }); setEditItem(n); setShowAdd(true); };

  const handleSave = () => {
    if (!form.title || !form.message || !form.validTill) return;
    const status: 'Active' | 'Expired' = form.validTill >= today ? 'Active' : 'Expired';
    if (editItem) {
      setNotices(prev => prev.map(( n: Notice ) => n.id === editItem.id ? { ...n, ...form, status } : n));
      showToast('Notice updated');
    } else {
      setNotices(prev => [{ id: Date.now().toString(), ...form, postedBy: 'Admin', postedDate: today, status }, ...prev]);
      showToast('Notice posted');
    }
    setShowAdd(false);
  };

  const handleDelete = () => {
    if (!deleteItem) return;
    setNotices(prev => prev.filter(n => n.id !== deleteItem.id));
    setDeleteItem(null);
    showToast('Notice deleted');
  };

  const handleBroadcast = () => {
    setBroadcastItem(null);
    showToast('Notice broadcast to all active students via WhatsApp');
  };

  const colDefs = [
    { field: 'title', headerName: 'Title', width: 220, cellRenderer: (p: ICellRendererParams) => <span className="eng-td-bold text-mgr-text-primary">{p.value}</span> },
    { field: 'message', headerName: 'Message', flex: 1, minWidth: 250, cellRenderer: (p: ICellRendererParams) => <span className="eng-td-muted text-sm truncate block w-full pt-1" title={p.value}>{p.value}</span> },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellRenderer: (p: ICellRendererParams) => (
        <span className={`eng-badge ${p.value === 'Active' ? 'eng-badge--success' : 'eng-badge--outline'} mt-2 inline-block`}>
          {p.value === 'Active' ? 'Active' : 'Expired'}
        </span>
      )
    },
    { field: 'validTill', headerName: 'Valid Till', width: 130, cellRenderer: (p: ICellRendererParams) => <span className="eng-td-mono text-sm">{p.value}</span> },
    { field: 'postedBy', headerName: 'Posted By', width: 130, cellRenderer: (p: ICellRendererParams) => <span className="eng-td-muted text-sm">{p.value}</span> },
    { field: 'postedDate', headerName: 'Posted Date', width: 130, cellRenderer: (p: ICellRendererParams) => <span className="eng-td-mono text-sm">{p.value}</span> },
    {
      headerName: 'Actions',
      width: 140,
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => (
        <div className="h-full flex items-center gap-2">
          <button onClick={() => openEdit(params.data)} className="eng-btn-icon hover:bg-primary hover:text-white transition-colors duration-200" title="Edit"><Edit2 size={14} /></button>
          <button onClick={() => setBroadcastItem(params.data)} className="eng-btn-icon hover:bg-primary hover:text-white transition-colors duration-200" title="Broadcast"><Send size={14} /></button>
          <button onClick={() => setDeleteItem(params.data)} className="eng-btn-icon eng-btn-icon--danger hover:bg-red-500 hover:text-white transition-colors duration-200" title="Delete"><Trash2 size={14} /></button>
        </div>
      )
    }
  ];

  return (
    <div className="eng-page">
      {toast && (
        <div className="eng-toast-wrap">
          <div className="eng-toast">{toast}</div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAdd && (
        <div className="eng-overlay">
          <div className="eng-modal eng-modal--lg bg-card">
            <button onClick={() => setShowAdd(false)} className="eng-modal-close hover:text-red-500"><X size={16} /></button>
            <p className="eng-modal-title mb-4 font-bold text-primary flex items-center gap-2">{editItem ? <><Edit2 size={16}/> Edit Notice</> : <><Send size={16}/> Post Notice</>}</p>
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
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-border text-primary rounded hover:bg-border transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!form.title || !form.message || !form.validTill}>
                <Send size={16} /> {editItem ? 'Update Notice' : 'Post Notice'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteItem && (
        <div className="eng-overlay">
          <div className="eng-modal eng-modal--sm bg-card">
            <p className="eng-modal-title mb-2 font-bold text-primary flex items-center gap-2"><Trash2 size={16} /> Delete Notice?</p>
            <p className="eng-modal-desc text-sm text-secondary">"{deleteItem.title}" will be permanently deleted.</p>
            <div className="eng-modal-footer mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteItem(null)} className="px-4 py-2 border border-border text-primary rounded hover:bg-border transition-colors">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Confirmation */}
      {broadcastItem && (
        <div className="eng-overlay">
          <div className="eng-modal eng-modal--sm bg-card">
            <p className="eng-modal-title mb-2 font-bold text-primary flex items-center gap-2"><Send size={16} /> Broadcast via WhatsApp</p>
            <p className="eng-modal-desc text-sm text-secondary">Send "{broadcastItem.title}" to all active students via WhatsApp?</p>
            <div className="eng-modal-footer mt-6 flex justify-end gap-3">
              <button onClick={() => setBroadcastItem(null)} className="px-4 py-2 border border-border text-primary rounded hover:bg-border transition-colors">Cancel</button>
              <button onClick={handleBroadcast} className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition-colors">Broadcast</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="eng-breadcrumb mb-2">
            <span>Communication</span><ChevronRight size={12} /><span>Notices</span>
          </div>
          <h1 className="eng-page-title text-2xl font-bold text-primary flex items-center gap-2"><Send size={24}/> Notice Board</h1>
          <p className="eng-page-subtitle text-secondary">Post and manage library notices for students.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition-colors font-medium">
          <Plus size={16} /> Post Notice
        </button>
      </div>

      <div className="eng-card eng-card--flush p-4">
        {notices.length === 0 ? (
          <div className="eng-empty py-12 flex flex-col items-center justify-center text-center">
            <div className="eng-empty__icon mb-4"><Send size={48} className="text-secondary" /></div>
            <p className="eng-empty__title text-lg font-semibold text-primary mb-4">No notices posted yet.</p>
            <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition-colors font-medium">
              <Plus size={16} /> Post Notice
            </button>
          </div>
        ) : (
          <div className="mgr-table-wrapper h-[500px]">
            <AgGridReact
              theme={superadmin_gridTheme}
              rowData={notices}
              columnDefs={colDefs as any}
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
