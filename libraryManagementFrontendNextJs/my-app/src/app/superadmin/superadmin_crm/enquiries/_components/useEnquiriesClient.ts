/**
 * RESPONSIBILITY: Logic and state management for EnquiriesClient.
 */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@/lib/logger';
import { SUPERADMIN_ROUTES, SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_CRM_MOCK_ENQUIRIES } from '@/app/superadmin/superadmin_crm/superadmin_crm_constants/SuperadminCrmConstants';
import type { Enquiry, EnquiryStatus } from '@/app/superadmin/superadmin_crm/superadmin_crm_shared_components/superadmin_types';

export function useEnquiriesClient() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  useEffect(() => {
    fetchApi(SUPERADMIN_API_ROUTES.CRM_ENQUIRIES).then(( data: unknown ) => {
      const actualData = Array.isArray(data) ? data : (data as any)?.data;
      if (!Array.isArray(actualData) || actualData.length === 0 || actualData[0]?.id?.startsWith('MOCK-')) {
        setEnquiries(SUPERADMIN_CRM_MOCK_ENQUIRIES);
        return;
      }
      const mapped: Enquiry[] = actualData.map(( e: Record<string, unknown> ) => ({
        id: String(e.id || ''),
        name: String(e.name || ''),
        phone: String(e.phone || ''),
        shift: String(e.preferredShift || ''),
        status: (typeof e.status === 'string' ? e.status.charAt(0).toUpperCase() + e.status.slice(1) : 'New') as EnquiryStatus,
        handledBy: typeof e.handledBy === 'object' && e.handledBy ? String((e.handledBy as Record<string, unknown>).name || 'Unassigned') : 'Unassigned',
        addedDate: e.createdAt ? new Date(String(e.createdAt)).toLocaleDateString() : '',
        avatar: String(e.name || 'U').substring(0, 2).toUpperCase(),
        enquiryDate: e.createdAt ? new Date(String(e.createdAt)).toLocaleDateString() : '',
        source: 'Walk-in',
        preferredBranch: 'Main Branch',
        followUps: [],
        isOverdue: false,
        isToday: false,
        isUpcoming: false,
      }));
      setEnquiries(mapped);
    }).catch(err => logger.error('Failed to load CRM enquiries', err));
  }, []);

  const filtered = enquiries.filter(( e: Enquiry ) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search.replace(/\D/g, ''));
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const colEnquiries = (status: EnquiryStatus) =>
    filtered.filter(( e: Enquiry ) => e.status === status);

  const handleQuickConvert = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const enq = enquiries.find((x) => x.id === id);
    if (!enq) return;
    router.push(
      `${SUPERADMIN_ROUTES.STUDENTS}?action=new&name=${encodeURIComponent(enq.name)}&phone=${encodeURIComponent(enq.phone)}`
    );
  };

  const handleQuickLost = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEnquiries((prev) =>
      prev.map(( x: Enquiry ) => (x.id === id ? { ...x, status: 'Lost' as EnquiryStatus } : x))
    );
  };

  return {
    router,
    enquiries, setEnquiries,
    view, setView,
    search, setSearch,
    statusFilter, setStatusFilter,
    filtered, colEnquiries,
    handleQuickConvert, handleQuickLost
  };
}
