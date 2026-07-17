import { Template, WaLog, Notification, Category } from '@/app/manager/manager_communication/manager_communication_types/ManagerCommunicationTypes';

export const INIT_TEMPLATES: Template[] = [
  { id: 'welcome',      label: 'Welcome Message',       icon: '??', body: 'Welcome to {libraryname}, {name}! Your Smart ID is {smartid}. Your seat {seat} is confirmed in the {shift} shift. Happy reading!' },
  { id: 'fee_reminder', label: 'Fee Reminder (Auto)',   icon: '??', body: 'Hi {name}, a gentle reminder that your subscription fee of {amount} is due on {duedate}. Kindly ignore if already paid. ?? {libraryname}' },
  { id: 'receipt',      label: 'Payment Receipt',       icon: '??', body: 'Dear {name}, we have received your payment of {amount} on {date}. Your new validity is {validtill}. Receipt: {receiptno}. Thank you! ?? {libraryname}' },
  { id: 'absentee',     label: 'Absentee Parent Alert', icon: '??', body: 'Dear Parent, your ward {name} (Seat: {seat}) has been absent for multiple consecutive days. Please contact {libraryname} at {phone}.' },
  { id: 'ptp',          label: 'PTP Payment Reminder',  icon: '??', body: 'Hi {name}, this is a reminder that you had committed to pay {amount} by {duedate}. Please complete your payment. ?? {libraryname}' },
];

export const WA_LOGS_DATA: WaLog[] = [
  { id: '1', dateTime: '2026-04-12 10:45 AM', phone: '98****2310', student: 'Rahul Sharma',  type: 'receipt',      status: 'Delivered', error: '',                       message: 'Dear Rahul, your payment of 1000 has been received. Receipt #R-2026-001. Thank you! - Smart Library 360' },
  { id: '2', dateTime: '2026-04-12 09:30 AM', phone: '97****8810', student: 'Priya Verma',   type: 'renewal',      status: 'Delivered', error: '',                       message: 'Hi Priya, your subscription expires in 3 days on 15-Apr-2026. Please renew to continue access. - Smart Library 360' },
  { id: '3', dateTime: '2026-04-11 06:01 PM', phone: '89****1230', student: 'Amit Kumar',    type: 'welcome',      status: 'Delivered', error: '',                       message: 'Welcome to Smart Library 360, Amit! Your seat S-03 (Morning shift) is confirmed. Smart ID: #003. - Smart Library 360' },
];

export const NOTIFS_DATA: Notification[] = [
  { id: '1', category: 'Finance',    icon: '!', title: '5 subscriptions expire today',           description: 'Rahul, Priya, Amit, Sneha, Rohan - subscriptions end today.',                 time: '2h ago', priority: 'High',   link: '/renewals',         read: false },
  { id: '2', category: 'CRM',        icon: '?', title: 'Call Rahul - enquired 3 days ago',       description: 'Rahul Sharma enquired about Morning shift. Follow up now.',                   time: '3h ago', priority: 'Medium', link: '/crm/enquiries',        read: false },
  { id: '3', category: 'Finance',    icon: '$', title: '3 Payment Promise dates hit today',      description: 'Amit Kumar, Deepak Mishra, Anita Roy promised payment today.',                time: '4h ago', priority: 'High',   link: '/payment-promises', read: false },
];

export const NOTIF_CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'All',        label: 'All Notifications',  icon: '*' },
  { id: 'Finance',    label: 'Finance',             icon: '$' },
  { id: 'CRM',        label: 'CRM',                 icon: '?' },
  { id: 'Operations', label: 'Operations',          icon: '#' },
  { id: 'Attendance', label: 'Attendance',          icon: '@' },
  { id: 'High Only',  label: 'Priority: High Only', icon: '!' },
];
