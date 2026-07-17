'use client';
// RESPONSIBILITY: Entry page for the admin_communication module.
// DATA FLOW: Next.js Router -> Page -> Components

import { useState, useMemo, useEffect } from 'react';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import { ChevronRight, Plus, X, Eye, RefreshCw, CheckCircle } from 'lucide-react';
import { ADMIN_COMMUNICATION_MOCK_COMPLAINTS, ADMIN_COMMUNICATION_COMPLAINTS_TABS } from '@/app/admin/admin_communication/admin_communication_constants/AdminCommunicationConstants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import toast from 'react-hot-toast';

type CStatus = 'Open' | 'In-Progress' | 'Resolved';

interface Complaint {
  id: string; title: string; student: string; isAnonymous: boolean;
  description: string; status: CStatus; date: string;
  resolvedBy: string; resolvedDate: string; resolvedNote: string;
}

export default function ComplaintsPage() {
  const [tab, setTab]                   = useState<CStatus | 'All'>('All');
  const [complaints, setComplaints]     = useState<Complaint[]>(ADMIN_COMMUNICATION_MOCK_COMPLAINTS as Complaint[]);
  const [showAdd, setShowAdd]           = useState(false);
  const [viewItem, setViewItem]         = useState<Complaint | null>(null);
  const [resolveItem, setResolveItem]   = useState<Complaint | null>(null);
  const [resolveNote, setResolveNote]   = useState('');

  useEffect(() => {
    fetchApi('/communication/complaints').then(data => {
      const mapped = data.map(( c: any ) => ({
        id: String(c.id || Math.random()),
        title: String(c.subject || c.title || 'Complaint'),
        desc: String(c.description || ''),
        date: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : (c.date || new Date().toLocaleDateString()),
        status: c.status === 'open' ? 'Open' : (c.status === 'resolved' ? 'Resolved' : 'In-Progress'),
        student: String(c.student || c.studentName || 'Mock Student (S-001)'),
      }));
      setComplaints(mapped);
    }).catch(e => logger.error('Complaints fetch failed:', e));
  }, []);
  
  const [addForm, setAddForm]           = useState({ student: '', anonymous: false, title: '', description: '' });
  const [expandedDesc, setExpandedDesc] = useState<string[]>([]);

  const filtered = tab === 'All' ? complaints : complaints.filter(c => c.status === tab);

  const handleAdd = () => {
    if (!addForm.title || !addForm.description) return;
    const c: Complaint = {
      id: Date.now().toString(),
      title: addForm.title,
      student: addForm.anonymous ? 'Anonymous' : (addForm.student || 'Anonymous'),
      isAnonymous: addForm.anonymous,
      description: addForm.description,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      resolvedBy: '—', resolvedDate: '—', resolvedNote: '',
    };
    setComplaints(prev => [c, ...prev]);
    setAddForm({ student: '', anonymous: false, title: '', description: '' });
    setShowAdd(false);
    toast.success('Complaint submitted');
  };

  const markInProgress = (id: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'In-Progress' } : c));
    toast.success('Marked In-Progress');
  };

  const handleResolve = () => {
    if (!resolveItem || !resolveNote) return;
    setComplaints(prev => prev.map(c => c.id === resolveItem.id
      ? { ...c, status: 'Resolved', resolvedBy: 'Admin', resolvedDate: new Date().toISOString().split('T')[0], resolvedNote: resolveNote }
      : c));
    setResolveItem(null); setResolveNote('');
    toast.success('Complaint resolved');
  };

  const statusBadge = (s: CStatus) => {
    if (s === 'Open')        return <Badge variant="destructive" className="bg-danger/10 text-danger hover:bg-danger/20 border-none">Open</Badge>;
    if (s === 'In-Progress') return <Badge variant="secondary" className="bg-warning/10 text-warning hover:bg-warning/20 border-none">In-Progress</Badge>;
    return <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20 border-none">Resolved</Badge>;
  };

  const toggleDesc = (id: string) =>
    setExpandedDesc(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 uppercase tracking-wider mb-1">
            Communication <ChevronRight size={12} /> Complaints
          </p>
          <h1 className="text-2xl font-bold tracking-tight">💬 Complaints</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and resolve student complaints.</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="gap-2">
          <Plus size={16} /> Add Complaint
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-muted/50 p-1 rounded-lg border border-border w-fit">
        {ADMIN_COMMUNICATION_COMPLAINTS_TABS.map(t => (
          <Button
            key={t}
            variant={tab === t ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setTab(t as any)}
            className={`text-sm font-semibold capitalize ${tab === t ? 'bg-background shadow-sm' : ''}`}
          >
            {t}
          </Button>
        ))}
      </div>

      {/* Table */}
      <Card className="overflow-x-auto shadow-sm border-border">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
            <span className="text-4xl mb-3">😊</span>
            <p className="font-medium text-foreground">No open complaints!</p>
            <p className="text-sm">All issues are resolved.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Resolved By</th>
                <th className="py-3 px-4">Resolved Date</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c, i) => {
                const isExpanded = expandedDesc.includes(c.id);
                const isLong = c.description.length > 60;
                return (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 text-muted-foreground font-mono">{i + 1}</td>
                    <td className="py-4 px-4 font-bold text-foreground">{c.title}</td>
                    <td className={`py-4 px-4 ${c.isAnonymous ? 'italic text-muted-foreground' : 'text-foreground font-medium'}`}>{c.student}</td>
                    <td className="py-4 px-4">
                      <span className="text-muted-foreground font-medium">{isLong && !isExpanded ? c.description.slice(0, 60) + '…' : c.description}</span>
                      {isLong && (
                        <button onClick={() => toggleDesc(c.id)} className="text-xs text-info hover:underline ml-1 font-semibold">
                          {isExpanded ? 'less' : 'more'}
                        </button>
                      )}
                    </td>
                    <td className="py-4 px-4">{statusBadge(c.status)}</td>
                    <td className="py-4 px-4 text-muted-foreground">{c.date}</td>
                    <td className="py-4 px-4 text-muted-foreground">{c.resolvedBy}</td>
                    <td className="py-4 px-4 text-muted-foreground">{c.resolvedDate}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setViewItem(c)} className="h-8 w-8 text-muted-foreground hover:text-foreground" title="View">
                          <Eye size={14} />
                        </Button>
                        {c.status === 'Open' && (
                          <Button variant="ghost" size="icon" onClick={() => markInProgress(c.id)} className="h-8 w-8 text-warning hover:text-warning hover:bg-warning/10" title="Mark In-Progress">
                            <RefreshCw size={14} />
                          </Button>
                        )}
                        {c.status !== 'Resolved' && (
                          <Button variant="ghost" size="icon" onClick={() => setResolveItem(c)} className="h-8 w-8 text-success hover:text-success hover:bg-success/10" title="Resolve">
                            <CheckCircle size={14} />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>

      {/* Add Complaint Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Complaint</DialogTitle>
            <DialogDescription>Staff raises complaint on student&apos;s behalf.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Student (optional)</label>
              <Input placeholder="Search student name..." value={addForm.student} onChange={e => setAddForm(f => ({ ...f, student: e.target.value }))} />
            </div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={addForm.anonymous} onChange={e => setAddForm(f => ({ ...f, anonymous: e.target.checked }))} className="rounded border-input text-primary focus:ring-primary" />
              Hide student identity from staff view
            </label>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title *</label>
              <Input placeholder="Brief complaint title" value={addForm.title} onChange={e => setAddForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description *</label>
              <Textarea rows={4} placeholder="Describe the issue in detail..." value={addForm.description} onChange={e => setAddForm(f => ({ ...f, description: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!addForm.title || !addForm.description}>Submit Complaint</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewItem?.title}</DialogTitle>
          </DialogHeader>
          {viewItem && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-2">
                {statusBadge(viewItem.status)}
                <Badge variant="outline">{viewItem.date}</Badge>
              </div>
              <p className="text-sm font-medium">
                By: <span className={viewItem.isAnonymous ? 'italic text-muted-foreground' : 'font-bold text-foreground'}>
                  {viewItem.student}
                </span>
              </p>
              <div className="bg-muted/50 p-4 rounded-lg border border-border text-sm text-foreground whitespace-pre-wrap">
                {viewItem.description}
              </div>
              {viewItem.resolvedNote && (
                <div className="bg-success/5 border border-success/20 p-4 rounded-lg space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-success">Resolution</p>
                  <p className="text-sm font-medium text-foreground">{viewItem.resolvedNote}</p>
                  <p className="text-xs text-muted-foreground">— {viewItem.resolvedBy} on {viewItem.resolvedDate}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setViewItem(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resolve Modal */}
      <Dialog open={!!resolveItem} onOpenChange={() => setResolveItem(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Resolve Complaint</DialogTitle>
            <DialogDescription>&quot;{resolveItem?.title}&quot;</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resolution Note *</label>
              <Textarea rows={3} placeholder="Describe how the issue was resolved..." value={resolveNote} onChange={e => setResolveNote(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setResolveItem(null)}>Cancel</Button>
            <Button onClick={handleResolve} disabled={!resolveNote} className="bg-success hover:bg-success/90 text-white gap-2">
              <CheckCircle size={16} /> Mark Resolved
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
