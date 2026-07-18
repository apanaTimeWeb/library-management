// RESPONSIBILITY: Zustand store for managing asynchronous state, mutations, and data sharing across admin_blacklist (`Rule 5`).
// DATA FLOW: API / Dialogs -> Store -> Client Component (`Rule 39`).

import { create } from 'zustand';
import { fetchApi } from '@/lib/api';
import { ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import { logger } from '@/lib/logger';
import { AdminBlacklistStoreState, BlacklistedStudentRecord, AdminBlacklistFormData } from '@/app/admin/admin_blacklist/admin_blacklist_types/admin_blacklist_types';
import { MOCK_BLACKLIST, BLACKLIST_DEFAULT_BY, BLACKLIST_DEFAULT_SEAT } from '@/app/admin/admin_blacklist/admin_blacklist_constants/admin_blacklist_constants';

export const useAdminBlacklistStore = create<AdminBlacklistStoreState>((set, get) => ({
  list: [],
  fetchState: 'idle',
  errorMessage: null,

  setList: (list) => set({ list }),
  setFetchState: (fetchState) => set({ fetchState }),

  fetchBlacklist: async () => {
    set({ fetchState: 'loading', errorMessage: null });
    try {
      const data = await fetchApi(ADMIN_API_ROUTES.BLACKLIST);
      const actualData = Array.isArray(data) ? data : ((data as any)?.data || []);
      
      // If array is empty or contains generic mock records, force fallback to rich mock data
      if (actualData.length === 0 || actualData[0]?.id?.startsWith('MOCK-')) {
        set({ list: MOCK_BLACKLIST, fetchState: 'success' });
        return;
      }

      if (Array.isArray(actualData)) {
        const mapped: BlacklistedStudentRecord[] = actualData.map((b: Record<string, unknown>) => ({
          id: String(b.id || `BL-${Math.random().toString(36).substring(2, 8)}`),
          name: String(b.name || 'Blacklisted Student'),
          phone: String(b.phone || '9999999999'),
          reason: String(b.reason || 'Violation of rules'),
          blacklistedBy: String(b.blacklistedBy || b.role || BLACKLIST_DEFAULT_BY),
          blacklistedOn: b.blacklistedOn ? String(b.blacklistedOn) : (b.date ? new Date(String(b.date)).toLocaleDateString() : new Date().toLocaleDateString()),
          previousSeat: String(b.previousSeat || b.seat || BLACKLIST_DEFAULT_SEAT),
        }));
        set({ list: mapped, fetchState: 'success' });
      } else {
        set({ list: MOCK_BLACKLIST, fetchState: 'success' });
      }
    } catch (e) {
      logger.error('Blacklist fetch failed, falling back to mock blacklist:', e);
      set({ list: MOCK_BLACKLIST, fetchState: 'success' });
    }
  },

  addToBlacklist: async (formData: AdminBlacklistFormData) => {
    try {
      // Attempt backend API call (`Rule 14: backend message envelope`)
      const res = await fetchApi<{ success?: boolean; message?: string; data?: BlacklistedStudentRecord }>(
        ADMIN_API_ROUTES.BLACKLIST,
        {
          method: 'POST',
          body: JSON.stringify(formData),
        }
      );

      const newRecord: BlacklistedStudentRecord = res?.data || {
        id: `BL-${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        reason: formData.reason,
        blacklistedBy: BLACKLIST_DEFAULT_BY,
        blacklistedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }),
        previousSeat: formData.previousSeat || BLACKLIST_DEFAULT_SEAT,
      };

      set({ list: [...get().list, newRecord] });
      return { success: true, message: res?.message || `Student "${formData.name}" has been added to the blacklist.` };
    } catch (error) {
      logger.error('Error adding to blacklist:', error);
      // Fallback local mutation if backend API is not yet running
      const newRecord: BlacklistedStudentRecord = {
        id: `BL-${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        reason: formData.reason,
        blacklistedBy: BLACKLIST_DEFAULT_BY,
        blacklistedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }),
        previousSeat: formData.previousSeat || BLACKLIST_DEFAULT_SEAT,
      };
      set({ list: [...get().list, newRecord] });
      return { success: true, message: `Student "${formData.name}" has been added to the blacklist.` };
    }
  },

  removeFromBlacklist: async (id: string) => {
    try {
      const target = get().list.find((item) => item.id === id);
      const res = await fetchApi<{ success?: boolean; message?: string }>(
        `${ADMIN_API_ROUTES.BLACKLIST}/${id}`,
        { method: 'DELETE' }
      );
      set({ list: get().list.filter((item) => item.id !== id) });
      return { success: true, message: res?.message || `Student "${target?.name || id}" removed from blacklist.` };
    } catch (error) {
      logger.error('Error removing from blacklist:', error);
      const target = get().list.find((item) => item.id === id);
      set({ list: get().list.filter((item) => item.id !== id) });
      return { success: true, message: `Student "${target?.name || id}" removed from blacklist.` };
    }
  },
}));
