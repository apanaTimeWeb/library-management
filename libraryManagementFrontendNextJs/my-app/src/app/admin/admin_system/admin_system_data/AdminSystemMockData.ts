
export const ADMIN_SYSTEM_MOCK_BACKUP_HISTORY = [
  {
    id: 'bk-001', name: 'Nightly Auto Backup',    type: 'auto',   size: '4.2 MB', createdAt: '2026-04-12 02:00 AM', status: 'success',
    modules: ['Students', 'Payments', 'Attendance', 'Seats', 'Expenses'],
  },
  {
    id: 'bk-002', name: 'Nightly Auto Backup',    type: 'auto',   size: '4.1 MB', createdAt: '2026-04-11 02:00 AM', status: 'success',
    modules: ['Students', 'Payments', 'Attendance', 'Seats', 'Expenses'],
  },
  {
    id: 'bk-003', name: 'Manual Backup � Pre-Import',type: 'manual', size: '4.0 MB', createdAt: '2026-04-10 11:30 AM', status: 'success',
    modules: ['Students', 'Payments', 'Seats'],
  },
  {
    id: 'bk-004', name: 'Nightly Auto Backup',    type: 'auto',   size: '�',      createdAt: '2026-04-09 02:00 AM', status: 'failed',
    modules: [],
  },
  {
    id: 'bk-005', name: 'Nightly Auto Backup',    type: 'auto',   size: '3.9 MB', createdAt: '2026-04-08 02:00 AM', status: 'success',
    modules: ['Students', 'Payments', 'Attendance', 'Seats', 'Expenses'],
  },
  {
    id: 'bk-006', name: 'Manual Backup � Monthly',type: 'manual', size: '3.7 MB', createdAt: '2026-04-01 09:00 AM', status: 'success',
    modules: ['Students', 'Payments', 'Attendance', 'Seats', 'Expenses', 'CRM', 'WhatsApp Logs'],
  },
];

export const ADMIN_SYSTEM_MOCK_PREVIEW = [
  { row: 1, name: 'Rahul Sharma',    phone: '9876543210', email: 'rahul@gmail.com',   shift: 'Morning',   seat: 'S-01', status: 'ok' },
  { row: 2, name: 'Priya Verma',     phone: '9812345678', email: 'priya@yahoo.com',   shift: 'Afternoon', seat: 'S-02', status: 'ok' },
  { row: 3, name: 'Amit Kumar',      phone: '',           email: 'amit@gmail.com',    shift: 'Evening',   seat: 'S-03', status: 'error',   issue: 'Mobile Number missing' },
  { row: 4, name: 'Sneha Patel',     phone: '9999988888', email: '',                  shift: 'Morning',   seat: 'S-04', status: 'warning', issue: 'Email missing (optional)' },
  { row: 5, name: 'Rohan Das',       phone: '9870001234', email: 'rohan@gmail.com',   shift: 'Afternoon', seat: 'S-05', status: 'ok' },
  { row: 6, name: '',                phone: '9810001234', email: 'unknown@gmail.com', shift: 'Morning',   seat: 'S-06', status: 'error',   issue: 'Student Name is required' },
  { row: 7, name: 'Kavita Singh',    phone: '9820001234', email: 'kavita@gmail.com',  shift: 'Evening',   seat: 'S-07', status: 'ok' },
  { row: 8, name: 'Deepak Mishra',   phone: '9830001234', email: 'deepak@gmail.com',  shift: 'Morning',   seat: '',     status: 'error',   issue: 'Seat Number missing' },
];

export const ADMIN_SYSTEM_TEMPLATE_HEADERS = ['Name*', 'Phone*', 'Email', 'Shift*', 'Seat', 'Plan', 'Fee Paid', 'Join Date'];

export const ADMIN_SYSTEM_EXPORT_MODULES = [
  { id: 'students',     label: 'Students',            description: 'All student records including personal info, seat, shift, and status', icon: '??', estimatedRows: 248,  formats: ['CSV', 'XLSX'] },
  { id: 'payments',     label: 'Payments & Fees',     description: 'Complete payment history � fee collected, due amounts, receipts',     icon: '??', estimatedRows: 1240, formats: ['CSV', 'XLSX'] },
  { id: 'attendance',   label: 'Attendance',          description: 'Full attendance log � daily check-ins by student and shift',          icon: '??', estimatedRows: 5800, formats: ['CSV', 'XLSX'] },
  { id: 'expenses',     label: 'Expenses',            description: 'Library expense records � rent, electricity, salaries, etc.',         icon: '??', estimatedRows: 320,  formats: ['CSV', 'XLSX'] },
  { id: 'enquiries',    label: 'CRM Enquiries',       description: 'Lead pipeline � all enquires with status and follow-up history',      icon: '??', estimatedRows: 186,  formats: ['CSV', 'XLSX'] },
  { id: 'seats',        label: 'Seats & Lockers',     description: 'Seat matrix, locker assignments, and maintenance logs',               icon: '??', estimatedRows: 140,  formats: ['CSV', 'XLSX'] },
  { id: 'whatsapp',     label: 'WhatsApp Logs',       description: 'All outbound WhatsApp messages � receipts, renewals, alerts',        icon: '??', estimatedRows: 890,  formats: ['CSV'] },
  { id: 'audit',        label: 'Audit Logs',          description: 'Staff actions log � sensitive operations, deletes, and edits',        icon: '??', estimatedRows: 2400, formats: ['CSV', 'XLSX'] },
];

export const ADMIN_SYSTEM_QUICK_EXPORTS = [
  { id: 'due-fees',     label: 'Fee Due Report',        description: 'Students with pending fee payments',  icon: 'CreditCard',  format: 'CSV' },
  { id: 'expiring',     label: 'Expiring Subscriptions',description: 'Students expiring in the next 7 days', icon: 'CalendarDays', format: 'CSV' },
  { id: 'active',       label: 'Active Students',       description: 'All currently active students',        icon: 'Users',       format: 'XLSX' },
  { id: 'full-backup',  label: 'Full Data Backup',      description: 'Everything � all modules in one ZIP',  icon: 'Database',    format: 'ZIP' },
];


export const ADMIN_SYSTEM_MOCK_SEAT_GAPS = [
  { seat: 'S-03', booked: [{ start: 0, end: 25 }, { start: 70, end: 100 }], gap: { start: 25, end: 70,  label: '10AM � 2PM', hours: 4  } },
  { seat: 'S-07', booked: [{ start: 0, end: 45 }],                          gap: { start: 45, end: 100, label: '12PM � 6PM', hours: 6  } },
  { seat: 'S-12', booked: [{ start: 30, end: 60 }, { start: 80, end: 100 }],gap: { start: 60, end: 80,  label: '2PM � 4PM',  hours: 2  } },
  { seat: 'S-15', booked: [{ start: 0, end: 15 }],                          gap: { start: 15, end: 100, label: '8AM � 6PM',  hours: 10 } },
];

export const ADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS = [
  { id: 'S-01', status: 'Needs Attention', lastMaint: '2026-01-12', daysSince: 89 },
  { id: 'S-07', status: 'OK', lastMaint: '2026-03-20', daysSince: 22 },
  { id: 'S-14', status: 'Needs Attention', lastMaint: '2025-12-31', daysSince: 101 },
  { id: 'S-22', status: 'OK', lastMaint: '2026-04-01', daysSince: 10 },
];

export const ADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS = [
  { name: 'AC Unit - Zone A', qty: 1, status: 'Overdue', lastServiced: '2025-11-15', nextDue: '2026-02-15', daysOverdue: 55 },
  { name: 'Ceiling Fan (Batch)', qty: 8, status: 'Due Soon', lastServiced: '2026-02-01', nextDue: '2026-04-20', daysOverdue: -9 },
  { name: 'CCTV System', qty: 4, status: 'OK', lastServiced: '2026-03-10', nextDue: '2026-06-10', daysOverdue: -60 },
];

export const ADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS = [
  { id: 'L-03', status: 'Issue Reported', lastIssue: 'Lock jammed � 2026-04-08' },
  { id: 'L-11', status: 'OK', lastIssue: 'None' },
  { id: 'L-19', status: 'Issue Reported', lastIssue: 'Door hinge broken � 2026-04-06' },
];

export const ADMIN_SYSTEM_OFFLINE_FEATURES = [
  { available: true,  text: 'Mark attendance (syncs when online)' },
  { available: true,  text: 'View student basic info (cached)' },
  { available: true,  text: 'View seat matrix (read-only)' },
  { available: false, text: 'Financial transactions require internet' },
  { available: false, text: 'WhatsApp messages require internet' },
  { available: false, text: 'Fee collection requires internet' },
];

export const ADMIN_SYSTEM_MOCK_POWER_ZONES = [
  { name: 'Zone A (Ground Floor)', occupancy: 78, capacity: 40, current: 31 },
  { name: 'Zone B (First Floor)', occupancy: 22, capacity: 35, current: 8 },
  { name: 'Zone C (Reading Hall)', occupancy: 91, capacity: 60, current: 55 },
  { name: 'Zone D (Silent Room)', occupancy: 15, capacity: 20, current: 3 },
];

export const ADMIN_SYSTEM_MOCK_POWER_ALERTS = [
  { date: '2026-04-10', shift: 'Evening', zone: 'Zone B', threshold: '30%', action: 'Advisory sent to manager' },
  { date: '2026-04-09', shift: 'Afternoon', zone: 'Zone D', threshold: '30%', action: 'AC shutdown suggested' },
  { date: '2026-04-07', shift: 'Morning', zone: 'Zone B', threshold: '30%', action: 'Advisory sent to manager' },
];


export const ADMIN_SYSTEM_SETTINGS_CATEGORIES = [
  { id: 'branding',     label: 'Branding',         icon: 'Palette'     },
  { id: 'late-fee',     label: 'Late Fee Rules',    icon: 'AlertCircle' },
  { id: 'auto-suspend', label: 'Auto-Suspend Rules',icon: 'Zap'         },
  { id: 'upi',          label: 'UPI / Payment',     icon: 'CreditCard'  },
  { id: 'notifications',label: 'Notifications',     icon: 'Bell'        },
  { id: 'general',      label: 'General',           icon: 'Globe'       },
];

export const ADMIN_SYSTEM_SMART_ID_ACTIVE_IDS = [1, 2, 4, 5, 6, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20];
export const ADMIN_SYSTEM_SMART_ID_FLOW_STEPS = [
  { step: '1', icon: '??', title: 'Student Exits', desc: 'ID freed � student moved to alumni archive' },
  { step: '2', icon: '??', title: 'System Scans', desc: 'Checks for lowest available gap ID in the sequence' },
  { step: '3', icon: '??', title: 'Gap ID Assigned', desc: 'New student gets freed ID � records stay compact & serial' },
];

export const ADMIN_SYSTEM_WAITLIST_QUEUE = [
  { name: 'Rahul Sharma', shift: 'Morning', position: 1, avatar: 'R', joined: '2026-04-08' },
  { name: 'Priya Verma', shift: 'Afternoon', position: 2, avatar: 'P', joined: '2026-04-09' },
  { name: 'Amit Kumar', shift: 'Evening', position: 3, avatar: 'A', joined: '2026-04-10' },
  { name: 'Sneha Patel', shift: 'Morning', position: 4, avatar: 'S', joined: '2026-04-10' },
  { name: 'Rohan Das', shift: 'Afternoon', position: 5, avatar: 'R', joined: '2026-04-11' },
];

export const ADMIN_SYSTEM_WHATSAPP_PROVIDERS = [
  { id: 'twilio',   label: 'Twilio',   logo: '??', requiresSecret: true  },
  { id: 'wati',     label: 'Wati',     logo: '??', requiresSecret: false },
  { id: 'aisensy',  label: 'AiSensy',  logo: '??', requiresSecret: false },
  { id: 'custom',   label: 'Custom',   logo: '??', requiresSecret: true  },
];

export const ADMIN_SYSTEM_WHATSAPP_MESSAGE_LOGS = [
  { id: 'wl-001', to: '98****2310', type: 'Fee Receipt',      status: 'delivered', sentAt: '2026-04-12 10:45 AM', template: 'receipt_confirmation' },
  { id: 'wl-002', to: '97****8810', type: 'Renewal Reminder', status: 'delivered', sentAt: '2026-04-12 09:30 AM', template: 'renewal_alert' },
  { id: 'wl-003', to: '89****1230', type: 'Welcome Message',  status: 'delivered', sentAt: '2026-04-11 06:01 PM', template: 'welcome_new_student' },
  { id: 'wl-004', to: '73****5670', type: 'Fee Reminder',     status: 'failed',    sentAt: '2026-04-11 02:00 PM', template: 'fee_due_reminder' },
  { id: 'wl-005', to: '91****4430', type: 'Seat Vacancy',     status: 'delivered', sentAt: '2026-04-10 11:00 AM', template: 'waitlist_notify' },
  { id: 'wl-006', to: '98****0010', type: 'Fee Receipt',      status: 'delivered', sentAt: '2026-04-10 09:15 AM', template: 'receipt_confirmation' },
];
