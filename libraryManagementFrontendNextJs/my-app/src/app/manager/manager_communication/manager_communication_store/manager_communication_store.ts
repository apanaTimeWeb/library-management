import { create } from 'zustand';
import {
  ManagerCommunicationNotice,
  ManagerCommunicationComplaint,
  ManagerCommunicationStats
} from '@/app/manager/manager_communication/manager_communication_types/manager_communication_types';
import {
  COMMUNICATION_STATS_MOCK,
  NOTICES_MOCK,
  COMPLAINTS_MOCK
} from '@/app/manager/manager_communication/manager_communication_constants/manager_communication_constants';

interface ManagerCommunicationState {
  notices: ManagerCommunicationNotice[];
  complaints: ManagerCommunicationComplaint[];
  stats: ManagerCommunicationStats | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;

  fetchNotices: () => Promise<void>;
  fetchComplaints: () => Promise<void>;
}

export const useManagerCommunicationStore = create<ManagerCommunicationState>((set, get) => ({
  notices: [],
  complaints: [],
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


}));
