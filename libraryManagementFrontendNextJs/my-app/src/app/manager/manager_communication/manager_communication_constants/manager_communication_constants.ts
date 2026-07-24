import {
  ManagerCommunicationNotice,
  ManagerCommunicationComplaint,
  ManagerCommunicationStats
} from '@/app/manager/manager_communication/manager_communication_types/manager_communication_types';

export const COMMUNICATION_STATS_MOCK: ManagerCommunicationStats = {
  activeNotices: 3,
  openComplaints: 2
};

export const NOTICES_MOCK: ManagerCommunicationNotice[] = [
  { id: '1', title: 'Diwali Holiday', message: 'Library will remain closed on 31st Oct and 1st Nov.', validTill: '2024-11-02', postedBy: 'Admin', postedDate: '2024-10-25', status: 'Active' },
  { id: '2', title: 'Maintenance Window', message: 'AC servicing on 3rd Floor this Sunday.', validTill: '2024-10-28', postedBy: 'Facilities', postedDate: '2024-10-24', status: 'Active' },
  { id: '3', title: 'Fee Reminder', message: 'Please clear your dues by the 5th to avoid late fees.', validTill: '2024-10-15', postedBy: 'Finance', postedDate: '2024-10-01', status: 'Expired' },
];

export const COMPLAINTS_MOCK: ManagerCommunicationComplaint[] = [
  { id: '1', ticketId: 'TKT-24-101', studentName: 'Alex Rivera', studentId: 'LIB-001', category: 'Facilities', description: 'AC is leaking near seat A12.', date: '2024-10-28', status: 'Open', priority: 'High' },
  { id: '2', ticketId: 'TKT-24-102', studentName: 'Anonymous', studentId: 'N/A', category: 'Noise', description: 'Students talking loudly in Hall B.', date: '2024-10-27', status: 'In-Progress', priority: 'Medium' },
  { id: '3', ticketId: 'TKT-24-099', studentName: 'Sneha Patel', studentId: 'LIB-004', category: 'Internet', description: 'Wi-Fi keeps disconnecting.', date: '2024-10-25', status: 'Resolved', priority: 'High', resolvedBy: 'IT Support' },
];




export const COMMUNICATION_STATUS_COLORS: Record<string, string> = {
  Active: 'bg-success-bg text-success',
  Expired: 'bg-danger-bg text-danger',
  Open: 'bg-warning-bg text-warning',
  'In-Progress': 'bg-info/10 text-info',
  Resolved: 'bg-success-bg text-success',
  Sent: 'bg-info/10 text-info',
  Delivered: 'bg-success-bg text-success',
  Read: 'bg-success-bg text-success text-bold',
  Failed: 'bg-danger-bg text-danger',
  Approved: 'bg-success-bg text-success',
  'Pending Approval': 'bg-warning-bg text-warning',
  Rejected: 'bg-danger-bg text-danger',
  High: 'text-danger font-bold',
  Medium: 'text-warning font-semibold',
  Low: 'text-info font-medium',
};
