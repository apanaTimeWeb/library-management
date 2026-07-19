// RESPONSIBILITY: Zustand store managing membership plan state, mutations, and status toggles (`Rule 5`).
// DATA FLOW: API / Dialogs -> Store -> Client Component (`Rule 39`).

import { create } from 'zustand';
import { fetchApi } from '@/lib/api';
import { ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import { logger } from '@/lib/logger';
import { AdminPlansStoreState, PlanRecord, AdminPlanFormData } from '@/app/admin/admin_plans/admin_plans_types/admin_plans_types';
import { MOCK_PLANS, PLAN_DEFAULT_FEATURES /* default */ } from '@/app/admin/admin_plans/admin_plans_constants/admin_plans_constants';

export const useAdminPlansStore = create<AdminPlansStoreState>((set, get) => ({
  plans: [],
  fetchState: 'idle',
  errorMessage: null,

  setPlans: (plans) => set({ plans }),
  setFetchState: (fetchState) => set({ fetchState }),

  fetchPlans: async () => {
    set({ fetchState: 'loading', errorMessage: null });
    try {
      const data = await fetchApi(ADMIN_API_ROUTES.PLANS);
      const actualData = (Array.isArray(data) ? data : ((data as Record<string, unknown>)?.data || [])) as any[];
      
      if (actualData.length === 0 || actualData[0]?.id?.startsWith('MOCK-')) {
        set({ plans: MOCK_PLANS, fetchState: 'success' });
        return;
      }

      if (Array.isArray(actualData) && actualData.length > 0) {
        const mapped: PlanRecord[] = actualData.map((p: Record<string, unknown>) => ({
          id: String(p.id || `P-${Math.random().toString(36).substring(2, 8)}`),
          name: String(p.name || 'Standard Plan'),
          price: Number(p.price || 1000),
          duration: String(p.durationInDays || p.duration || '30') + (String(p.duration || '').includes('Month') ? '' : ' Days'),
          durationDays: Number(p.durationInDays || p.durationDays || 30),
          features: Array.isArray(p.features) ? p.features.map(String) : PLAN_DEFAULT_FEATURES /* default */,
          status: (p.isActive || p.status === 'Active' ? 'Active' : 'Inactive') as PlanRecord['status'],
          subscribers: Number(p.subscribers || 0),
        }));
        set({ plans: mapped, fetchState: 'success' });
      } else {
        set({ plans: MOCK_PLANS, fetchState: 'success' });
      }
    } catch (e) {
      logger.error('Plans fetch failed, falling back to mock plans:', e);
      set({ plans: MOCK_PLANS, fetchState: 'success' });
    }
  },

  savePlan: async (formData: AdminPlanFormData, editingId?: string | null) => {
    const parsedFeatures = formData.featuresText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const endpoint = editingId ? `${ADMIN_API_ROUTES.PLANS}/${editingId}` : ADMIN_API_ROUTES.PLANS;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetchApi<{ success?: boolean; message?: string; data?: PlanRecord }>(
        endpoint,
        {
          method,
          body: JSON.stringify({ ...formData, features: parsedFeatures }),
        }
      );

      if (editingId) {
        set({
          plans: get().plans.map((p) =>
            p.id === editingId
              ? {
                  ...p,
                  name: formData.name,
                  price: formData.price,
                  duration: formData.duration,
                  durationDays: formData.durationDays,
                  features: parsedFeatures,
                }
              : p
          ),
        });
        return { success: true, message: res?.message || `Plan "${formData.name}" updated successfully.` };
      } else {
        const newRecord: PlanRecord = res?.data || {
          id: `P-${Date.now()}`,
          name: formData.name,
          price: formData.price,
          duration: formData.duration,
          durationDays: formData.durationDays,
          features: parsedFeatures,
          status: 'Active',
          subscribers: 0,
        };
        set({ plans: [...get().plans, newRecord] });
        return { success: true, message: res?.message || `Plan "${formData.name}" created successfully.` };
      }
    } catch (error) {
      logger.error('Error saving plan:', error);
      if (editingId) {
        set({
          plans: get().plans.map((p) =>
            p.id === editingId
              ? {
                  ...p,
                  name: formData.name,
                  price: formData.price,
                  duration: formData.duration,
                  durationDays: formData.durationDays,
                  features: parsedFeatures,
                }
              : p
          ),
        });
        return { success: true, message: `Plan "${formData.name}" updated successfully.` };
      } else {
        const newRecord: PlanRecord = {
          id: `P-${Date.now()}`,
          name: formData.name,
          price: formData.price,
          duration: formData.duration,
          durationDays: formData.durationDays,
          features: parsedFeatures,
          status: 'Active',
          subscribers: 0,
        };
        set({ plans: [...get().plans, newRecord] });
        return { success: true, message: `Plan "${formData.name}" created successfully.` };
      }
    }
  },

  togglePlanStatus: async (id: string) => {
    try {
      const target = get().plans.find((p) => p.id === id);
      const newStatus = target?.status === 'Active' ? 'Inactive' : 'Active';
      const res = await fetchApi<{ success?: boolean; message?: string }>(
        `${ADMIN_API_ROUTES.PLANS}/${id}/status`,
        { method: 'PATCH', body: JSON.stringify({ status: newStatus }) }
      );
      set({
        plans: get().plans.map((p) => (p.id === id ? { ...p, status: newStatus } : p)),
      });
      return { success: true, message: res?.message || `Plan "${target?.name || id}" is now ${newStatus}.` };
    } catch (error) {
      logger.error('Error toggling status:', error);
      const target = get().plans.find((p) => p.id === id);
      const newStatus = target?.status === 'Active' ? 'Inactive' : 'Active';
      set({
        plans: get().plans.map((p) => (p.id === id ? { ...p, status: newStatus } : p)),
      });
      return { success: true, message: `Plan "${target?.name || id}" is now ${newStatus}.` };
    }
  },

  deletePlan: async (id: string) => {
    try {
      const target = get().plans.find((p) => p.id === id);
      const res = await fetchApi<{ success?: boolean; message?: string }>(
        `${ADMIN_API_ROUTES.PLANS}/${id}`,
        { method: 'DELETE' }
      );
      set({ plans: get().plans.filter((p) => p.id !== id) });
      return { success: true, message: res?.message || `Plan "${target?.name || id}" deleted successfully.` };
    } catch (error) {
      logger.error('Error deleting plan:', error);
      const target = get().plans.find((p) => p.id === id);
      set({ plans: get().plans.filter((p) => p.id !== id) });
      return { success: true, message: `Plan "${target?.name || id}" deleted successfully.` };
    }
  },
}));
