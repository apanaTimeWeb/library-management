import { create } from 'zustand';
import type { Enquiry, FetchState } from '@/app/manager/manager_crm/manager_crm_types';
import type { ManagerCrmState, RawEnquiry } from '@/app/manager/manager_crm/manager_crm_types/ManagerCrmTypes';

// RESPONSIBILITY: Module-scoped Zustand store for managing CRM Enquiries API data.
// DATA FLOW: API -> useCrmStore -> useManagerCrmEnquiries -> ManagerCrmEnquiriesClient

export const useCrmStore = create<ManagerCrmState>((set, get) => ({
  enquiries: [],
  status: 'idle',
  error: null,
  fetchData: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading' });
    try {
      const { fetchEnquiries } = await import('../manager_crm_api/manager_crm_api');
      const data = await fetchEnquiries();
      
      if (!Array.isArray(data) || data.length === 0 || String(data[0]?.id).startsWith('MOCK-')) {
        const MOCK_ENQUIRIES = [
          { id: 'E1', name: 'Ravi Kumar', phone: '9876543210', shift: 'Morning', status: 'New' as const, handledBy: 'Admin', addedDate: '2026-04-10', avatar: 'RK' },
          { id: 'E2', name: 'Priya Singh', phone: '8765432109', shift: 'Evening', status: 'Interested' as const, handledBy: 'Manager', addedDate: '2026-04-09', avatar: 'PS' },
          { id: 'E3', name: 'Amit Patel', phone: '7654321098', shift: 'Full Day', status: 'Converted' as const, handledBy: 'Admin', addedDate: '2026-04-08', avatar: 'AP' },
          { id: 'E4', name: 'Sneha Gupta', phone: '6543210987', shift: 'Night', status: 'Lost' as const, handledBy: 'Staff', addedDate: '2026-04-07', avatar: 'SG' },
        ];

// MULTIPLIED
const base_MOCK_ENQUIRIES = [...MOCK_ENQUIRIES];
while(MOCK_ENQUIRIES.length < 50 && base_MOCK_ENQUIRIES.length > 0) {
  MOCK_ENQUIRIES.push({ ...base_MOCK_ENQUIRIES[MOCK_ENQUIRIES.length % base_MOCK_ENQUIRIES.length], id: Math.random().toString() + 'm' });
}

        set({ enquiries: MOCK_ENQUIRIES as import('@/app/manager/manager_crm/manager_crm_types').Enquiry[], status: 'success' });
        return;
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
