// RESPONSIBILITY: Renders the useAdminCrmEnquiries.ts component/hook.
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { ADMIN_ROUTES, ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import { type Enquiry, type EnquiryStatus } from '@/app/admin/admin_crm/admin_crm_components/AdminCrmtypes/AdminCrmtypes';


export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type ViewMode = 'kanban' | 'table';

export function useAdminCrmEnquiries() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const viewParam = (searchParams.get('view') as ViewMode) || 'kanban';
  const searchParam = searchParams.get('q') || '';
  const statusParam = searchParams.get('status') || 'All';

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>('idle');

  const pushParams = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v && v !== 'All' && v !== 'kanban') params.set(k, v);
      else params.delete(k);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  useEffect(() => {
    setFetchState('loading');
    fetchApi(ADMIN_API_ROUTES.CRM_ENQUIRIES)
      .then((data: unknown) => {
        let rows: any[] = [];
        if (Array.isArray(data)) rows = data;
        else if (data && typeof data === 'object' && Array.isArray((data as Record<string, any>).data)) rows = (data as Record<string, any>).data;
        if (rows.length === 0) throw new Error('Force Mock');
        const mapped: Enquiry[] = rows.map((e: Record<string, unknown>) => ({
          id:              String(e.id ?? ''),
          name:            String(e.name ?? ''),
          phone:           String(e.phone ?? ''),
          shift:           String(e.shift || e.preferredShift || 'General'),
          status:          (String(e.status ?? 'new').charAt(0).toUpperCase() + String(e.status ?? 'new').slice(1)) as EnquiryStatus,
          handledBy:       typeof e.handledBy === 'string' ? e.handledBy : ((e.handledBy as Record<string, unknown>)?.name as string || 'Unassigned'),
          addedDate:       String(e.addedDate || new Date((e.createdAt || e.date || Date.now()) as string | number).toLocaleDateString()),
          source:          String(e.source ?? 'Walk-in'),
          preferredBranch: String(e.preferredBranch || e.branch || 'Main Branch'),
          enquiryDate:     String(e.enquiryDate || new Date((e.createdAt || e.date || Date.now()) as string | number).toLocaleDateString()),
          avatar:          String(e.avatar || (e.name as string)?.substring(0, 2).toUpperCase() || 'NA'),
          followUps:       (e.followUps as never[]) || [],
          isToday:         e.isToday as boolean | undefined,
          isUpcoming:      e.isUpcoming as boolean | undefined,
          isOverdue:       e.isOverdue as boolean | undefined,
          convertedDate:   e.convertedDate as string | undefined
        }));
        setEnquiries(mapped);
        setFetchState('success');
      })
      .catch(() => {
        setFetchState('error');
      });
  }, []);

  const filtered = useMemo(() => {
    return enquiries.filter((e) => {
      const searchLower = searchParam.toLowerCase();
      const matchSearch = searchLower === '' || 
        (e.name || '').toLowerCase().includes(searchLower) ||
        (e.phone || '').toLowerCase().includes(searchLower);
      const matchStatus = statusParam === 'All' || e.status === statusParam;
      return matchSearch && matchStatus;
    });
  }, [enquiries, searchParam, statusParam]);

  const colEnquiries = useCallback((status: EnquiryStatus) => {
    return filtered.filter((e) => e.status === status);
  }, [filtered]);

  const handleQuickConvert = (ev: React.MouseEvent, enq: Enquiry) => {
    ev.stopPropagation();
    router.push(`${ADMIN_ROUTES.STUDENTS}/new?name=${encodeURIComponent(enq.name)}&phone=${encodeURIComponent(enq.phone)}`);
  };

  const handleQuickLost = (ev: React.MouseEvent, id: string) => {
    ev.stopPropagation();
    setEnquiries((prev) => prev.map((x) => (x.id === id ? { ...x, status: 'Lost' as EnquiryStatus } : x)));
  };

  return {
    viewParam,
    searchParam,
    statusParam,
    enquiries,
    fetchState,
    filtered,
    pushParams,
    colEnquiries,
    handleQuickConvert,
    handleQuickLost,
    router
  };
}
