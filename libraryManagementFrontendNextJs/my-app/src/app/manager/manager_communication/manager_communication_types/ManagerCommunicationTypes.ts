// RESPONSIBILITY: Renders or handles logic for ManagerCommunicationTypes.ts.


export interface Template { id: string; label: string; icon: string; body: string; }
export interface WaLog {
  id: string; dateTime: string; phone: string; student: string;
  type: 'welcome' | 'fee_reminder' | 'receipt' | 'notice' | 'renewal';
  status: 'Pending' | 'Sent' | 'Delivered' | 'Failed';
  error: string; message: string;
}
export interface Notification {
  id: string; category: 'Finance' | 'CRM' | 'Operations' | 'Attendance';
  icon: string; title: string; description: string;
  time: string; priority: 'High' | 'Medium'; link: string; read: boolean;
}
export type Category = 'All' | 'Finance' | 'CRM' | 'Operations' | 'Attendance' | 'High Only';

