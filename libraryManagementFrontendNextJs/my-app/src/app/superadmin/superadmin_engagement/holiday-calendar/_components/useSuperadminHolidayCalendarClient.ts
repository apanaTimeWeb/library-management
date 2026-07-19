// RESPONSIBILITY: Provides logic for SuperadminHolidayCalendarClient
import { useState } from 'react';
import { SUPERADMIN_ENGAGEMENT_MOCK_HOLIDAYS } from '@/app/superadmin/superadmin_engagement/superadmin_engagement_utils/SuperadminEngagementMockData';
import type { SuperadminEngagementHoliday as Holiday } from '@/app/superadmin/superadmin_engagement/superadmin_engagement_types/SuperadminEngagementTypes';

export function useSuperadminHolidayCalendarClient() {
  const now = new Date();
  const [year, setYear]         = useState(now.getFullYear());
  const [month, setMonth]       = useState(now.getMonth());
  const [holidays, setHolidays] = useState<Holiday[]>(SUPERADMIN_ENGAGEMENT_MOCK_HOLIDAYS as Holiday[]);
  const [showAdd, setShowAdd]   = useState(false);
  const [form, setForm]         = useState({ date:'', name:'', type:'National' });
  const [toast, setToast]       = useState('');

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500); };

  const prevMonth = () => month===0 ? (setYear(y=>y-1), setMonth(11)) : setMonth(m=>m-1);
  const nextMonth = () => month===11 ? (setYear(y=>y+1), setMonth(0))  : setMonth(m=>m+1);

  const addHoliday = () => {
    if (!form.date || !form.name) return;
    setHolidays(p => [...p, { id: Date.now().toString(), ...form }]);
    setForm({ date:'', name:'', type:'National' });
    setShowAdd(false);
    showToast('📅 Holiday added successfully');
  };

  const removeHoliday = (id: string) => {
    setHolidays(p => p.filter(h => h.id !== id));
    showToast('🗑️ Holiday removed');
  };

  return {
    year, month, holidays, showAdd, setShowAdd, form, setForm, toast, showToast,
    prevMonth, nextMonth, addHoliday, removeHoliday
  };
}
