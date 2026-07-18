'use client';
// RESPONSIBILITY: Renders communication notices dashboard, broadcast controls, and notice management modal.
import type { ICellRendererParams } from 'ag-grid-community';
import { ChevronRight, Plus, X, Edit2, Trash2, Send } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { useNoticesClient } from '@/app/superadmin/superadmin_communication/notices/_components/useNoticesClient';

ModuleRegistry.registerModules([AllCommunityModule]);

export function NoticesClient() {
  const {
    notices, showAdd, setShowAdd, editItem, deleteItem, setDeleteItem,
    broadcastItem, setBroadcastItem, toast, form, setForm, openAdd, openEdit,
    handleSave, handleDelete, handleBroadcast
  } = useNoticesClient();

  const colDefs = [
    { field: 'title', headerName: 'Title', width: 220, cellRenderer: (p: ICellRendererParams) => <span className="font-bold text-text-primary">{p.value}</span> },
    { field: 'message', headerName: 'Message', flex: 1, minWidth: 250, cellRenderer: (p: ICellRendererParams) => <span className="text-text-secondary text-[14px] truncate block w-full pt-1" title={p.value}>{p.value}</span> },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellRenderer: (p: ICellRendererParams) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold ${p.value === 'Active' ? 'bg-success/10 text-success' : 'bg-input text-text-secondary'} mt-2 inline-block`}>
          {p.value === 'Active' ? 'Active' : 'Expired'}
        </span>
      )
    },
    { field: 'validTill', headerName: 'Valid Till', width: 130, cellRenderer: (p: ICellRendererParams) => <span className="font-mono text-[14px] text-text-secondary">{p.value}</span> },
    { field: 'postedBy', headerName: 'Posted By', width: 130, cellRenderer: (p: ICellRendererParams) => <span className="text-text-secondary text-[14px]">{p.value}</span> },
    { field: 'postedDate', headerName: 'Posted Date', width: 130, cellRenderer: (p: ICellRendererParams) => <span className="font-mono text-[14px] text-text-secondary">{p.value}</span> },
    {
      headerName: 'Actions',
      width: 140,
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => (
        <div className="h-full flex items-center gap-2">
          <button onClick={() => openEdit(params.data)} className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer" title="Edit"><Edit2 size={14} /></button>
          <button onClick={() => setBroadcastItem(params.data)} className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer" title="Broadcast"><Send size={14} /></button>
          <button onClick={() => setDeleteItem(params.data)} className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] text-danger hover:bg-danger hover:text-danger-foreground transition-colors duration-200 cursor-pointer" title="Delete"><Trash2 size={14} /></button>
        </div>
      )
    }
  ];

  return (
    <div className="relative p-2 sm:p-4">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-bg-card border border-border shadow-xl rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-[14px] font-bold text-text-primary">{toast}</span>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-lg rounded-[var(--radius-xl)] shadow-2xl border border-border flex flex-col relative overflow-hidden">
            <button onClick={() => setShowAdd(false)} className="absolute top-4 right-4 text-text-secondary hover:text-danger cursor-pointer"><X size={16} /></button>
            <div className="px-6 py-5 border-b border-border">
              <p className="text-[18px] font-bold text-primary flex items-center gap-2">{editItem ? <><Edit2 size={16}/> Edit Notice</> : <><Send size={16}/> Post Notice</>}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[12px] font-bold text-text-secondary mb-1 block">Title <span className="text-danger">*</span></label>
                <input className="w-full bg-input border border-border rounded-[var(--radius-md)] py-2.5 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" placeholder="Notice title"
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="text-[12px] font-bold text-text-secondary mb-1 block">Message <span className="text-danger">*</span></label>
                <textarea className="w-full bg-input border border-border rounded-[var(--radius-md)] py-2.5 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" rows={6} placeholder="Notice message..."
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <div>
                <label className="text-[12px] font-bold text-text-secondary mb-1 block">Valid Till <span className="text-danger">*</span></label>
                <input type="date" className="w-full bg-input border border-border rounded-[var(--radius-md)] py-2.5 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors"
                  value={form.validTill} onChange={e => setForm(f => ({ ...f, validTill: e.target.value }))} />
              </div>
            </div>
            <div className="px-6 py-4 bg-muted border-t border-border flex justify-end gap-3 rounded-b-[var(--radius-xl)]">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-border text-text-primary text-[14px] font-bold rounded-[var(--radius-md)] hover:bg-input transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-[14px] font-bold rounded-[var(--radius-md)] hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
          <div className="bg-card w-full max-w-sm rounded-[var(--radius-xl)] shadow-2xl border border-border flex flex-col p-6">
            <p className="text-[16px] font-bold text-primary flex items-center gap-2 mb-2"><Trash2 size={16} /> Delete Notice?</p>
            <p className="text-[14px] text-text-secondary mb-6">"{deleteItem.title}" will be permanently deleted.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteItem(null)} className="px-4 py-2 border border-border text-text-primary text-[14px] font-bold rounded-[var(--radius-md)] hover:bg-input transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-danger text-danger-foreground text-[14px] font-bold rounded-[var(--radius-md)] hover:brightness-95 transition-all cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Confirmation */}
      {broadcastItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-sm rounded-[var(--radius-xl)] shadow-2xl border border-border flex flex-col p-6">
            <p className="text-[16px] font-bold text-primary flex items-center gap-2 mb-2"><Send size={16} /> Broadcast via WhatsApp</p>
            <p className="text-[14px] text-text-secondary mb-6">Send "{broadcastItem.title}" to all active students via WhatsApp?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setBroadcastItem(null)} className="px-4 py-2 border border-border text-text-primary text-[14px] font-bold rounded-[var(--radius-md)] hover:bg-input transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleBroadcast} className="px-4 py-2 bg-primary text-primary-foreground text-[14px] font-bold rounded-[var(--radius-md)] hover:brightness-95 transition-all cursor-pointer">Broadcast</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center text-[12px] font-bold text-text-secondary mb-2 space-x-2">
            <span>Communication</span><ChevronRight size={12} /><span>Notices</span>
          </div>
          <h1 className="text-[28px] font-extrabold text-text-primary flex items-center gap-2 tracking-tight"><Send size={24}/> Notice Board</h1>
          <p className="text-[14px] text-text-secondary mt-1">Post and manage library notices for students.</p>
        </div>
        <button onClick={openAdd} className="flex items-center justify-center gap-1.5 bg-primary hover:brightness-95 text-primary-foreground text-[14px] font-bold py-2 px-4 rounded-[var(--radius-md)] transition-all shadow-sm cursor-pointer">
          <Plus size={16} /> Post Notice
        </button>
      </div>

      <div className="bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm">
        {notices.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="mb-4"><Send size={48} className="text-text-secondary opacity-50" /></div>
            <p className="text-[16px] font-bold text-text-primary mb-4">No notices posted yet.</p>
            <button onClick={openAdd} className="flex items-center justify-center gap-1.5 bg-primary hover:brightness-95 text-primary-foreground text-[14px] font-bold py-2 px-4 rounded-[var(--radius-md)] transition-all shadow-sm cursor-pointer">
              <Plus size={16} /> Post Notice
            </button>
          </div>
        ) : (
          <div className="h-96 w-full">
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
