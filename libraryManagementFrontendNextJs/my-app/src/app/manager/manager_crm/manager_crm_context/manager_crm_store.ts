import { create } from 'zustand';
import type { Enquiry, FetchState } from '@/app/manager/manager_crm/manager_crm_types';

// RESPONSIBILITY: Module-scoped Zustand store for managing CRM Enquiries API data.
// DATA FLOW: API -> useCrmStore -> useManagerCrmEnquiries -> ManagerCrmEnquiriesClient

interface CrmState {
  enquiries: Enquiry[];
  status: FetchState;
  error: string | null;
  fetchData: () => Promise<void>;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
}

export const useCrmStore = create<CrmState>((set, get) => ({
  enquiries: [],
  status: 'idle',
  error: null,
  fetchData: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading' });
    try {
      const { fetchEnquiries } = await import('../manager_crm_api/manager_crm_api');
      const data = await fetchEnquiries();
      
      interface RawEnquiry {
        id: string | number;
        name: string;
        phone: string;
        preferredShift: string;
        status: string;
        handledBy?: { name: string };
        createdAt: string;
      }
      
      const mapped = (data as RawEnquiry[]).map((e: RawEnquiry) => ({
        id: String(e.id),
        name: String(e.name),
        phone: String(e.phone),
        shift: String(e.preferredShift),
        status: (e.status.charAt(0).toUpperCase() + e.status.slice(1)) as Enquiry['status'],
        handledBy: String(e.handledBy?.name || 'Unassigned'),
        addedDate: new Date(e.createdAt).toLocaleDateString(),
        avatar: String(e.name).substring(0, 2).toUpperCase()
      }));
      set({ enquiries: mapped, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },
  updateEnquiryStatus: (id, status) => set((state) => ({
    enquiries: state.enquiries.map(enq => enq.id === id ? { ...enq, status } : enq)
  }))
}));
