// RESPONSIBILITY: Provides logic for NotificationCenterClient
import { useState } from 'react';
import { SUPERADMIN_COMMUNICATION_MOCK_NOTIFICATIONS } from '@/app/superadmin/superadmin_communication/superadmin_communication_data/SuperadminCommunicationMockData';
import type { SuperadminCommunicationNotification as Notification } from '@/app/superadmin/superadmin_communication/superadmin_communication_types/SuperadminCommunicationTypes';
import { Category } from "./useNotificationCenterClient_types";

export function useNotificationCenterClient() {
  const [cat, setCat]       = useState<Category>('All');
  const [notifs, setNotifs] = useState<Notification[]>(SUPERADMIN_COMMUNICATION_MOCK_NOTIFICATIONS as Notification[]);

  const filtered = notifs.filter(n => {
    if (cat === 'All')       return true;
    if (cat === 'High Only') return n.priority === 'High';
    return n.category === cat;
  });

  const unread = notifs.filter(n => !n.read).length;
  const markAllRead = () => setNotifs(prev => prev.map(( n ) => ({ ...n, read: true })));

  return {
    cat, setCat, notifs, filtered, unread, markAllRead
  };
}
