export const ADMIN_COMMUNICATION_MOCK_COMPLAINTS = [
  { id: '1', title: 'AC not cooling',     student: 'Rahul Sharma', isAnonymous: false, description: 'The AC in Zone A has not been cooling properly for the past 3 days. Very uncomfortable to study.', status: 'Open',        date: '2026-04-10', resolvedBy: '—', resolvedDate: '—', resolvedNote: '' },
  { id: '2', title: 'WiFi very slow',     student: 'Anonymous',    isAnonymous: true,  description: 'Internet speed is extremely slow during evening hours. Cannot load study materials.',              status: 'In-Progress', date: '2026-04-09', resolvedBy: 'Admin', resolvedDate: '—', resolvedNote: '' },
  { id: '3', title: 'Locker door broken', student: 'Priya Verma',  isAnonymous: false, description: 'Locker door hinge is broken. Cannot lock properly.',                                               status: 'Resolved',    date: '2026-04-07', resolvedBy: 'Staff Ravi', resolvedDate: '2026-04-08', resolvedNote: 'Hinge replaced.' },
  { id: '4', title: 'Noise from outside', student: 'Anonymous',    isAnonymous: true,  description: 'Construction noise from outside is very disturbing during morning hours.',                         status: 'Open',        date: '2026-04-11', resolvedBy: '—', resolvedDate: '—', resolvedNote: '' },
];
export const ADMIN_COMMUNICATION_COMPLAINTS_TABS = ['All', 'Open', 'In-Progress', 'Resolved'];

export const ADMIN_COMMUNICATION_MOCK_NOTIFICATIONS = [
  { id: '1', category: 'Finance',    icon: '??', title: '5 subscriptions expire today',           description: 'Rahul, Priya, Amit, Sneha, Rohan — subscriptions end today.',                 time: '2h ago', priority: 'High',   link: '/renewals',         read: false },
  { id: '2', category: 'CRM',        icon: '??', title: 'Call Rahul — enquired 3 days ago',       description: 'Rahul Sharma enquired about Morning shift. Follow up now.',                   time: '3h ago', priority: 'Medium', link: '/crm/enquiries',        read: false },
  { id: '3', category: 'Finance',    icon: '??', title: '3 Payment Promise dates hit today',      description: 'Amit Kumar, Deepak Mishra, Anita Roy promised payment today.',                time: '4h ago', priority: 'High',   link: '/payment-promises', read: false },
  { id: '4', category: 'Operations', icon: '??', title: 'Seat A-05 maintenance overdue 45 days',  description: 'Last maintenance was on 2026-02-25. Immediate attention required.',           time: '1d ago', priority: 'Medium', link: '/system/maintenance',      read: false },
  { id: '5', category: 'Attendance', icon: '??', title: 'Sneha Patel absent 7 consecutive days',  description: 'Sneha Patel has not attended for 7 days. Parent alert recommended.',          time: '1d ago', priority: 'High',   link: '/absentee-report',  read: false },
  { id: '6', category: 'Finance',    icon: '?', title: '2 late fee penalties auto-applied',      description: 'Late fees applied to Vikram Nair and Kavita Singh for overdue payments.',     time: '2d ago', priority: 'Medium', link: '/late-fees',        read: true  },
  { id: '7', category: 'Operations', icon: '??', title: 'Locker L-03 issue reported',             description: 'Lock jammed on Locker L-03. Reported by student on 2026-04-08.',             time: '3d ago', priority: 'Medium', link: '/system/maintenance',      read: true  },
];
export const ADMIN_COMMUNICATION_NOTIFICATION_CATS = [
  { id: 'All',        label: 'All Notifications',  icon: '??' },
  { id: 'Finance',    label: 'Finance',             icon: '??' },
  { id: 'CRM',        label: 'CRM',                 icon: '??' },
  { id: 'Operations', label: 'Operations',          icon: '??' },
  { id: 'Attendance', label: 'Attendance',          icon: '??' },
  { id: 'High Only',  label: 'Priority: High Only', icon: '??' },
];

export const ADMIN_COMMUNICATION_MOCK_WHATSAPP_LOGS = [
  { id: '1', dateTime: '2026-04-12 10:45 AM', phone: '98****2310', student: 'Rahul Sharma',  type: 'receipt',      status: 'Delivered', error: '',                       message: 'Dear Rahul, your payment of ?1000 has been received. Receipt #R-2026-001. Thank you! — Smart Library 360' },
  { id: '2', dateTime: '2026-04-12 09:30 AM', phone: '97****8810', student: 'Priya Verma',   type: 'renewal',      status: 'Delivered', error: '',                       message: 'Hi Priya, your subscription expires in 3 days on 15-Apr-2026. Please renew to continue access. — Smart Library 360' },
  { id: '3', dateTime: '2026-04-11 06:01 PM', phone: '89****1230', student: 'Amit Kumar',    type: 'welcome',      status: 'Delivered', error: '',                       message: 'Welcome to Smart Library 360, Amit! Your seat S-03 (Morning shift) is confirmed. Smart ID: #003. — Smart Library 360' },
  { id: '4', dateTime: '2026-04-11 02:00 PM', phone: '73****5670', student: 'Sneha Patel',   type: 'fee_reminder', status: 'Failed',    error: 'Number not on WhatsApp', message: 'Hi Sneha, your fee of ?1000 is due on 15-Apr-2026. Please pay on time to avoid late charges. — Smart Library 360' },
  { id: '5', dateTime: '2026-04-10 11:00 AM', phone: '91****4430', student: 'Rohan Das',     type: 'notice',       status: 'Delivered', error: '',                       message: 'Notice: Library will be closed on 14-Apr-2026 (Dr. Ambedkar Jayanti). Normal operations resume 15-Apr. — Smart Library 360' },
  { id: '6', dateTime: '2026-04-10 09:15 AM', phone: '98****0010', student: 'Kavita Singh',  type: 'receipt',      status: 'Sent',      error: '',                       message: 'Dear Kavita, your payment of ?800 has been received. Receipt #R-2026-002. Thank you! — Smart Library 360' },
  { id: '7', dateTime: '2026-04-09 03:00 PM', phone: '96****7720', student: 'Deepak Mishra', type: 'fee_reminder', status: 'Pending',   error: '',                       message: 'Hi Deepak, your fee of ?1200 is due on 10-Apr-2026. Please pay on time. — Smart Library 360' },
];

export const ADMIN_COMMUNICATION_WHATSAPP_VARS = ['{name}', '{amount}', '{duedate}', '{planname}', '{libraryname}', '{phone}', '{seat}'];
export const ADMIN_COMMUNICATION_WHATSAPP_TEMPLATES = [
  { id: 'welcome',      label: 'Welcome Message',      icon: '??', body: 'Welcome to {libraryname}, {name}! Your seat {seat} is confirmed. We wish you a productive study journey. — Smart Library Team' },
  { id: 'fee_reminder', label: 'Fee Reminder',          icon: '??', body: 'Hi {name}, your fee of ?{amount} is due on {duedate}. Please pay on time to avoid late charges. — {libraryname}' },
  { id: 'renewal',      label: 'Renewal Alert',         icon: '??', body: 'Hi {name}, your {planname} subscription expires in 3 days. Renew now to continue uninterrupted access. — {libraryname}' },
  { id: 'receipt',      label: 'Payment Receipt',       icon: '??', body: 'Dear {name}, your payment of ?{amount} has been received. Thank you! Contact us at {phone} for queries. — {libraryname}' },
  { id: 'notice',       label: 'Notice Broadcast',      icon: '??', body: 'Important Notice from {libraryname}: Dear {name}, please note the following update from the library management.' },
  { id: 'absentee',     label: 'Absentee Parent Alert', icon: '??', body: 'Dear Parent, your ward {name} (Seat: {seat}) has been absent for multiple consecutive days. Please contact {libraryname} at {phone}.' },
  { id: 'ptp',          label: 'PTP Payment Reminder',  icon: '??', body: 'Hi {name}, this is a reminder that you had committed to pay ?{amount} by {duedate}. Please complete your payment. — {libraryname}' },
];
