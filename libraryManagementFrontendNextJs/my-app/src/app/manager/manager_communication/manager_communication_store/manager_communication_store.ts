import { create } from 'zustand';
import {
  ManagerCommunicationNotice,
  ManagerCommunicationComplaint,
  ManagerCommunicationNotification,
  ManagerCommunicationWhatsAppTemplate,
  ManagerCommunicationWhatsAppLog,
  ManagerCommunicationStats
} from '@/app/manager/manager_communication/manager_communication_types/manager_communication_types';
import {
  COMMUNICATION_STATS_MOCK,
  NOTICES_MOCK,
  COMPLAINTS_MOCK,
  NOTIFICATIONS_MOCK,
  WHATSAPP_TEMPLATES_MOCK,
  WHATSAPP_LOGS_MOCK
} from '@/app/manager/manager_communication/manager_communication_constants/manager_communication_constants';

interface ManagerCommunicationState {
  notices: ManagerCommunicationNotice[];
  complaints: ManagerCommunicationComplaint[];
  notifications: ManagerCommunicationNotification[];
  whatsappTemplates: ManagerCommunicationWhatsAppTemplate[];
  whatsappLogs: ManagerCommunicationWhatsAppLog[];
  stats: ManagerCommunicationStats | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;

  fetchNotices: () => Promise<void>;
  fetchComplaints: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  fetchWhatsAppTemplates: () => Promise<void>;
  fetchWhatsAppLogs: () => Promise<void>;
}

export const useManagerCommunicationStore = create<ManagerCommunicationState>((set, get) => ({
  notices: [],
  complaints: [],
  notifications: [],
  whatsappTemplates: [],
  whatsappLogs: [],
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

  fetchNotifications: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ notifications: NOTIFICATIONS_MOCK, stats: COMMUNICATION_STATS_MOCK, status: 'success' });
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
  },

  fetchWhatsAppLogs: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ whatsappLogs: WHATSAPP_LOGS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  }
}));
