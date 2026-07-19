// RESPONSIBILITY: Provides logic for SuperadminComplaintsClient
import { useState } from 'react';
import { SUPERADMIN_COMMUNICATION_MOCK_COMPLAINTS } from '@/app/superadmin/superadmin_communication/superadmin_communication_utils/SuperadminCommunicationMockData';
import type { SuperadminCommunicationComplaint as Complaint, SuperadminCommunicationComplaintStatus as CStatus } from '@/app/superadmin/superadmin_communication/superadmin_communication_types/SuperadminCommunicationTypes';

export const TABS: (CStatus | 'All')[] = ['All', 'Open', 'In-Progress', 'Resolved'];

export function useSuperadminComplaintsClient() {
  const [tab, setTab] = useState<CStatus | 'All'>('All');
  const [complaints, setComplaints] = useState<Complaint[]>(SUPERADMIN_COMMUNICATION_MOCK_COMPLAINTS as Complaint[]);
  const [showAdd, setShowAdd] = useState(false);
  const [viewItem, setViewItem] = useState<Complaint | null>(null);
  const [resolveItem, setResolveItem] = useState<Complaint | null>(null);
  const [resolveNote, setResolveNote] = useState('');
  const [toast, setToast] = useState('');
  const [addForm, setAddForm] = useState({ student: '', anonymous: false, title: '', description: '' });
  const [expandedDesc, setExpandedDesc] = useState<string[]>([]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

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
    showToast('Complaint submitted');
  };

  const markInProgress = (id: string) => {
    setComplaints(prev => prev.map(( c ) => c.id === id ? { ...c, status: 'In-Progress' } : c));
    showToast('Marked In-Progress');
  };

  const handleResolve = () => {
    if (!resolveItem || !resolveNote) return;
    setComplaints(prev => prev.map(( c ) => c.id === resolveItem.id
      ? { ...c, status: 'Resolved', resolvedBy: 'Admin', resolvedDate: new Date().toISOString().split('T')[0], resolvedNote: resolveNote }
      : c));
    setResolveItem(null); setResolveNote('');
    showToast('Complaint resolved');
  };

  const toggleDesc = (id: string) =>
    setExpandedDesc(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return {
    tab, setTab, complaints, showAdd, setShowAdd, viewItem, setViewItem, resolveItem, setResolveItem,
    resolveNote, setResolveNote, toast, addForm, setAddForm, expandedDesc,
    filtered, handleAdd, markInProgress, handleResolve, toggleDesc
  };
}
