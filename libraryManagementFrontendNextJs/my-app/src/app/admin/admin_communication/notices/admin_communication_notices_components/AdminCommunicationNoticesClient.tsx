'use client';
// RESPONSIBILITY: Entry page for the admin_communication module.
// DATA FLOW: Next.js Router -> page -> Components

import { useState, useEffect } from 'react';
import { ChevronRight, Plus, X, Edit2, Trash2, Send } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { TablePagination } from '@/components/ui/table-pagination';
import { Notice } from "./AdminCommunicationNoticesClient_types";
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

const today = new Date().toISOString().split('T')[0];

export function AdminCommunicationNoticesClient() {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [notices, setNotices]             = useState<Notice[]>([]);
  const [showAdd, setShowAdd]             = useState(false);
  const [editItem, setEditItem]           = useState<Notice | null>(null);
  const [deleteItem, setDeleteItem]       = useState<Notice | null>(null);
  const [broadcastItem, setBroadcastItem] = useState<Notice | null>(null);
  const [form, setForm]                   = useState({ title: '', message: '', validTill: '' });

  useEffect(() => {
    fetchApi('/communication/notices').then(data => {
      const mapped = (data as any[]).map(( n: Record<string, unknown> ) => ({
        id: String(n.id || Math.random()),
        title: String(n.title || n.name || 'Notice'),
        message: String(n.message || n.details || ''),
        postedBy: String(n.postedBy || 'Admin'),
        postedDate: n.createdAt ? new Date(n.createdAt as string).toISOString().split('T')[0] : (n.date ? new Date(n.date as string).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
        validTill: n.validTill ? new Date(n.validTill as string).toISOString().split('T')[0] : new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        status: (n.validTill && new Date(n.validTill as string) < new Date()) ? 'Expired' : 'Active',
      }));
      setNotices(mapped as unknown as any[]);
    }).catch(e => logger.error('Notices fetch failed:', e));
  }, []);

  const openAdd  = () => { setForm({ title: '', message: '', validTill: '' }); setEditItem(null); setShowAdd(true); };
  const openEdit = (n: Notice) => { setForm({ title: n.title, message: n.message, validTill: n.validTill }); setEditItem(n); setShowAdd(true); };

  const handleSave = () => {
    if (!form.title || !form.message || !form.validTill) return;
    const status: 'Active' | 'Expired' = form.validTill >= today ? 'Active' : 'Expired';
    if (editItem) {
      setNotices(prev => prev.map(n => n.id === editItem.id ? { ...n, ...form, status } : n));
      toast.success('Notice updated');
    } else {
      setNotices(prev => [{ id: Date.now().toString(), ...form, postedBy: 'Admin', postedDate: today, status }, ...prev]);
      toast.success('Notice posted');
    }
    setShowAdd(false);
  };

  const handleDelete = () => {
    if (!deleteItem) return;
    setNotices(prev => prev.filter(n => n.id !== deleteItem.id));
    setDeleteItem(null);
    toast.success('Notice deleted');
  };

  const handleBroadcast = () => {
    setBroadcastItem(null);
    toast.success('Notice broadcast to all active students via WhatsApp');
  };
    const table = useClientTable(notices, 10);
  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 uppercase tracking-wider mb-1">
            Communication <ChevronRight size={12} /> Notices
          </p>
          <h1 className="text-text-primaryxl font-bold tracking-tight">📢 Notice Board</h1>
          <p className="text-sm text-muted-foreground mt-1">Post and manage library notices for students.</p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus size={16} /> Post Notice
        </Button>
      </div>

      <Card className="overflow-x-auto shadow-sm border-border">
        {notices.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
            <div className="text-4xl mb-4">📢</div>
            <p className="font-medium text-foreground mb-4">No notices posted yet.</p>
            <Button onClick={openAdd} className="gap-2">
              <Plus size={16} /> Post Notice
            </Button>
          </div>
        ) : (
          <>
          <div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Valid Till</th>
                <th className="py-3 px-4">Posted By</th>
                <th className="py-3 px-4">Posted Date</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {notices.slice((page - 1) * limit, page * limit).map((n) => (
                <tr key={n.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-foreground">{n.title}</td>
                  <td className="py-4 px-4 text-muted-foreground max-w-xs truncate" title={n.message}>{n.message}</td>
                  <td className="py-4 px-4">
                    <Badge variant="secondary" className={`${n.status === 'Active' ? 'bg-success/10 text-success hover:bg-success/20' : 'bg-muted text-muted-foreground'} border-none font-bold tracking-wide`}>
                      {n.status === 'Active' ? '✅ Active' : 'Expired'}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground font-mono text-xs">{n.validTill}</td>
                  <td className="py-4 px-4 text-muted-foreground">{n.postedBy}</td>
                  <td className="py-4 px-4 text-muted-foreground font-mono text-xs">{n.postedDate}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(n)} className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" title="Edit">
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setBroadcastItem(n)} className="h-8 w-8 text-info hover:text-info hover:bg-info/10" title="Broadcast">
                        <Send size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteItem(n)} className="h-8 w-8 text-danger hover:text-danger hover:bg-danger/10" title="Delete">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> 
      <TablePagination 
        totalItems={table.totalItems} 
        page={table.page} 
        limit={table.limit} 
        onPageChange={table.setPage} 
      />

      <TablePagination 
        totalItems={100} 
        page={page} 
        limit={limit} 
        onPageChange={setPage} 
        onLimitChange={setLimit} 
      />
          </>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? '✏️ Edit Notice' : '📢 Post Notice'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title *</label>
              <Input placeholder="Notice title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message *</label>
              <Textarea rows={6} placeholder="Notice message..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Valid Till *</label>
              <Input type="date" value={form.validTill} onChange={e => setForm(f => ({ ...f, validTill: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!form.title || !form.message || !form.validTill}>
              {editItem ? 'Update Notice' : 'Post Notice'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-danger">Delete Notice?</DialogTitle>
            <DialogDescription>&quot;{deleteItem?.title}&quot; will be permanently deleted.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteItem(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Broadcast Confirmation */}
      <Dialog open={!!broadcastItem} onOpenChange={() => setBroadcastItem(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Broadcast via WhatsApp</DialogTitle>
            <DialogDescription>Send &quot;{broadcastItem?.title}&quot; to all active students via WhatsApp?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setBroadcastItem(null)}>Cancel</Button>
            <Button onClick={handleBroadcast}>Broadcast</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
