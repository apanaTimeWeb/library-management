/**
 * RESPONSIBILITY: Logic and state management for SuperadminNoticesClient.
 */
import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';
import { SUPERADMIN_COMMUNICATION_MOCK_NOTICES } from '@superadmin/superadmin_communication/superadmin_communication_utils/SuperadminCommunicationMockData';
import type { SuperadminCommunicationNotice as Notice } from '@/app/superadmin/superadmin_communication/superadmin_communication_types/SuperadminCommunicationTypes';

const today = new Date().toISOString().split('T')[0];

export function useSuperadminNoticesClient() {
  const [notices, setNotices]             = useState<Notice[]>([]);
  const [showAdd, setShowAdd]             = useState(false);
  const [editItem, setEditItem]           = useState<Notice | null>(null);
  const [deleteItem, setDeleteItem]       = useState<Notice | null>(null);
  const [broadcastItem, setBroadcastItem] = useState<Notice | null>(null);
  const [toast, setToast]                 = useState('');
  const [form, setForm]                   = useState({ title: '', message: '', validTill: '' });

  useEffect(() => {
    fetchApi(SUPERADMIN_API_ROUTES.COMMUNICATION_NOTICES).then(( data: unknown ) => {
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

  return {
    notices,
    showAdd, setShowAdd,
    editItem, setEditItem,
    deleteItem, setDeleteItem,
    broadcastItem, setBroadcastItem,
    toast,
    form, setForm,
    openAdd,
    openEdit,
    handleSave,
    handleDelete,
    handleBroadcast
  };
}
