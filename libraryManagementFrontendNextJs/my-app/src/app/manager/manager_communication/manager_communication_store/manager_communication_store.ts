// RESPONSIBILITY: Renders or handles logic for manager_communication_store.ts.
import { create } from 'zustand';
import { fetchApi } from '@/lib/api';
import type { FetchState, Notice, Complaint, ManagerCommunicationState } from '@/app/manager/manager_communication/manager_communication_types/manager_communication_types';
import { logger } from '@/lib/logger';

// DATA FLOW: API -> Store -> Hook -> Component

export const useManagerCommunicationStore = create<ManagerCommunicationState>((set, get) => ({
  notices: [],
  noticesStatus: 'idle',
  noticesError: null,

  complaints: [],
  complaintsStatus: 'idle',
  complaintsError: null,

  fetchNotices: async () => {
    set({ noticesStatus: 'loading', noticesError: null });
    try {
      const actualData = await fetchApi<unknown[]>('/communication/notices');
      if (!Array.isArray(actualData) || actualData.length === 0 || String((actualData[0] as { id?: string })?.id).startsWith('MOCK-')) {
        const MOCK_NOTICES: Notice[] = [
          { id: 'N1', title: 'Library Closed for Maintenance', message: 'The library will be closed on Sunday due to scheduled maintenance.', postedBy: 'Admin', postedDate: '2026-04-10', validTill: '2026-04-15', status: 'Active' },
          { id: 'N2', title: 'New AC Installed', message: 'We have installed a new AC in the quiet zone.', postedBy: 'Manager', postedDate: '2026-04-08', validTill: '2026-04-30', status: 'Active' },
        ];

// MULTIPLIED
const base_MOCK_NOTICES = [...MOCK_NOTICES];
while(MOCK_NOTICES.length < 50 && base_MOCK_NOTICES.length > 0) {
  MOCK_NOTICES.push({ ...base_MOCK_NOTICES[MOCK_NOTICES.length % base_MOCK_NOTICES.length], id: Math.random().toString() + 'm' });
}

        set({ notices: MOCK_NOTICES, noticesStatus: 'success' });
        return;
      }
      const mapped = (actualData as Record<string, unknown>[]).map((n: Record<string, unknown>) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        postedBy: 'Admin',
        postedDate: new Date(n.createdAt as string).toISOString().split('T')[0],
        validTill: new Date(n.validTill as string).toISOString().split('T')[0],
        status: new Date(n.validTill as string) >= new Date() ? 'Active' : 'Expired',
      })) as Notice[];
      set({ notices: mapped, noticesStatus: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error('Failed to fetch notices', { message });
      set({ noticesStatus: 'error', noticesError: message });
    }
  },

  addNotice: async (notice) => {
    // In a real app this would call a POST endpoint.
    // For now we just mutate local state.
    const today = new Date().toISOString().split('T')[0];
    const newNotice: Notice = {
      id: Date.now().toString(),
      title: notice.title || '',
      message: notice.message || '',
      validTill: notice.validTill || '',
      postedBy: 'Admin',
      postedDate: today,
      status: (notice.validTill || '') >= today ? 'Active' : 'Expired',
    };
    set((state) => ({ notices: [newNotice, ...state.notices] }));
  },

  updateNotice: async (id, updates) => {
    const today = new Date().toISOString().split('T')[0];
    set((state) => ({
      notices: state.notices.map((n) => {
        if (n.id === id) {
          const merged = { ...n, ...updates };
          merged.status = merged.validTill >= today ? 'Active' : 'Expired';
          return merged as Notice;
        }
        return n;
      }),
    }));
  },

  deleteNotice: async (id) => {
    set((state) => ({ notices: state.notices.filter((n) => n.id !== id) }));
  },

  fetchComplaints: async () => {
    set({ complaintsStatus: 'loading', complaintsError: null });
    try {
      const actualData = await fetchApi<unknown[]>('/communication/complaints');
      if (!Array.isArray(actualData) || actualData.length === 0 || String((actualData[0] as { id?: string })?.id).startsWith('MOCK-')) {
        const MOCK_COMPLAINTS: Complaint[] = [
          { id: 'C1', title: 'AC not cooling', studentName: 'Rahul Sharma', desc: 'The AC in Zone A has not been cooling properly for the past 3 days. Very uncomfortable to study.', status: 'New', submittedOn: '2026-04-10', phone: '9999999999', category: 'General', priority: 'High' },
          { id: 'C2', title: 'WiFi very slow', studentName: 'Anonymous', desc: 'Internet speed is extremely slow during evening hours. Cannot load study materials.', status: 'In-Progress', submittedOn: '2026-04-09', phone: '9999999999', category: 'IT', priority: 'Medium' },
        ];
        set({ complaints: MOCK_COMPLAINTS, complaintsStatus: 'success' });
        return;
      }
      const mapped = (actualData as Record<string, unknown>[]).map((c: Record<string, unknown>) => ({
        id: c.id,
        title: c.subject || 'Complaint',
        desc: c.description || '',
        submittedOn: new Date(c.createdAt).toLocaleDateString(),
        status: c.status === 'open' ? 'New' : (c.status === 'resolved' ? 'Resolved' : 'In-Progress'),
        studentName: c.isAnonymous ? 'Anonymous' : 'Mock Student',
        phone: c.phone || '9999999999',
        category: (c.category as string) || 'General',
        priority: (c.priority as string) || 'Low',
        resolvedOn: (c.resolvedOn as string) || undefined,
        resolution: (c.resolvedNote as string) || undefined,
      })) as Complaint[];
      set({ complaints: mapped, complaintsStatus: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error('Failed to fetch complaints', { message });
      set({ complaintsStatus: 'error', complaintsError: message });
    }
  },

  addComplaint: async (complaint) => {
    const newComplaint = {
      id: Date.now().toString(),
      title: complaint.title || '',
      studentName: complaint.studentName || 'Anonymous',
      phone: complaint.phone || '',
      desc: complaint.desc || '',
      status: 'New' as const,
      submittedOn: new Date().toISOString().split('T')[0],
      category: complaint.category || 'General',
      priority: complaint.priority || 'Low',
      ...complaint
    } as Complaint;
    set((state) => ({ complaints: [newComplaint, ...state.complaints] }));
  },

  updateComplaintStatus: async (id, status, resolution) => {
    set((state) => ({
      complaints: state.complaints.map((c) => {
        if (c.id === id) {
          const updated = { ...c, status };
          if (status === 'Resolved' && resolution) {
            updated.resolvedOn = new Date().toISOString().split('T')[0];
            updated.resolution = resolution;
          }
          return updated;
        }
        return c;
      })
    }));
  }
}));

