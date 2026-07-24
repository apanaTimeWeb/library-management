import { create } from 'zustand';
import {
  ManagerCommunicationNotice,
  ManagerCommunicationComplaint,
  ManagerCommunicationWhatsAppTemplate,
  ManagerCommunicationStats
} from '@/app/manager/manager_communication/manager_communication_types/manager_communication_types';
import {
  COMMUNICATION_STATS_MOCK,
  NOTICES_MOCK,
  COMPLAINTS_MOCK,
  WHATSAPP_TEMPLATES_MOCK
} from '@/app/manager/manager_communication/manager_communication_constants/manager_communication_constants';

interface ManagerCommunicationState {
  notices: ManagerCommunicationNotice[];
  complaints: ManagerCommunicationComplaint[];
  whatsappTemplates: ManagerCommunicationWhatsAppTemplate[];
  stats: ManagerCommunicationStats | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;

  fetchNotices: () => Promise<void>;
  fetchComplaints: () => Promise<void>;
  fetchWhatsAppTemplates: () => Promise<void>;
}

export const useManagerCommunicationStore = create<ManagerCommunicationState>((set, get) => ({
  notices: [],
  complaints: [],
  whatsappTemplates: [],
  stats: null,
  status: 'idle',
  error: null,

  fetchNotices: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ notices: NOTICES_MOCK, stats: COMMUNICATION_STATS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },

  fetchComplaints: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ complaints: COMPLAINTS_MOCK, stats: COMMUNICATION_STATS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },

  fetchWhatsAppTemplates: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ whatsappTemplates: WHATSAPP_TEMPLATES_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  }
}));
