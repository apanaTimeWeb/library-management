import { create } from 'zustand';
import { fetchApi } from '@/lib/api';
import type { FetchState, Notice, Complaint } from '@/app/manager/manager_communication/manager_communication_types/manager_communication_types';
import { logger } from '@/lib/logger';

// DATA FLOW: API -> Store -> Hook -> Component

interface ManagerCommunicationState {
  notices: Notice[];
  noticesStatus: FetchState;
  noticesError: string | null;

  complaints: Complaint[];
  complaintsStatus: FetchState;
  complaintsError: string | null;

  fetchNotices: () => Promise<void>;
  addNotice: (notice: Partial<Notice>) => Promise<void>;
  updateNotice: (id: string, updates: Partial<Notice>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;

  fetchComplaints: () => Promise<void>;
  addComplaint: (complaint: Partial<Complaint>) => Promise<void>;
  updateComplaintStatus: (id: string, status: Complaint['status'], resolution?: string) => Promise<void>;
}

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
      const data = await fetchApi<any[]>('/communication/notices');
      const actualData = Array.isArray(data) ? data : (data?.data || []);
      const mapped = actualData.map((n: any) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        postedBy: 'Admin',
        postedDate: new Date(n.createdAt).toISOString().split('T')[0],
        validTill: new Date(n.validTill).toISOString().split('T')[0],
        status: new Date(n.validTill) >= new Date() ? 'Active' : 'Expired',
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
      const data = await fetchApi<any[]>('/communication/complaints');
      const actualData = Array.isArray(data) ? data : (data?.data || []);
      const mapped = actualData.map((c: any) => ({
        id: c.id,
        title: c.subject || 'Complaint',
        desc: c.description || '',
        submittedOn: new Date(c.createdAt).toLocaleDateString(),
        status: c.status === 'open' ? 'New' : (c.status === 'resolved' ? 'Resolved' : 'In-Progress'),
        studentName: c.isAnonymous ? 'Anonymous' : 'Mock Student',
        phone: c.phone || '9999999999',
        category: c.category || 'General',
        priority: c.priority || 'Low',
        resolvedOn: c.resolvedOn || undefined,
        resolution: c.resolvedNote || undefined,
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
