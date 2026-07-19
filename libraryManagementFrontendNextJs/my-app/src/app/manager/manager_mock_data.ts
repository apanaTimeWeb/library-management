// RESPONSIBILITY: Centralizes all mock data for the manager module to prevent 500 errors during API failure.

export const MOCK_DASHBOARD_DATA = {
  kpiData: [
    { title: 'Total Enquiries', value: '45', icon: 'PhoneCall', trend: '+12%', iconClass: 'bg-info-bg text-info', linkText: 'View CRM', linkHref: '/manager/manager_crm/enquiries', type: 'info' },
    { title: 'New Admissions', value: '12', icon: 'UserPlus', trend: '+5%', iconClass: 'bg-success-bg text-success', linkText: 'View Students', linkHref: '/manager/manager_students', type: 'success' },
    { title: 'Fee Collected', value: '₹45,000', icon: 'CreditCard', trend: '+8%', iconClass: 'bg-primary-bg text-primary', linkText: 'View Analytics', linkHref: '/manager/manager_reports/revenue', type: 'primary' },
    { title: 'Active Students', value: '120', icon: 'Users', trend: '+2%', iconClass: 'bg-warning-bg text-warning', linkText: 'View List', linkHref: '/manager/manager_students', type: 'warning' },
  ],
  seatData: [
    { id: '1', status: 'free', shift: 'Morning' },
    { id: '2', status: 'maintenance', shift: 'Evening' },
    { id: '3', status: 'free', shift: 'Full Day' },
    { id: '4', status: 'occupied', shift: 'Morning' },
    { id: '5', status: 'expiring', shift: 'Evening' },
  ],
  actionItems: [
    { title: 'Follow-ups Due Today', count: '5', countClass: 'bg-warning-bg text-warning rounded-full px-2 py-0.5 text-xs font-bold', showRenew: false, href: '/manager/manager_crm/enquiries' },
    { title: 'Plan Renewals Due', count: '3', countClass: 'bg-danger-bg text-danger rounded-full px-2 py-0.5 text-xs font-bold', showRenew: true, href: '/manager/manager_students' },
    { title: 'Pending Support Tickets', count: '2', countClass: 'bg-info-bg text-info rounded-full px-2 py-0.5 text-xs font-bold', showRenew: false, href: '/manager/manager_support' },
  ],
  recentAdmissions: [
    { name: 'Alex Rivera', smartId: 'LIB-001', shift: 'Morning' },
    { name: 'Priya Sharma', smartId: 'LIB-002', shift: 'Evening' },
    { name: 'Rohan Mehta', smartId: 'LIB-003', shift: 'Morning' },
    { name: 'Aditi Verma', smartId: 'LIB-004', shift: 'Afternoon' },
    { name: 'Vikram Singh', smartId: 'LIB-005', shift: 'Evening' },
    { name: 'Neha Gupta', smartId: 'LIB-006', shift: 'Morning' },
  ],
  recentEnquiries: [
    { name: 'Siddharth Rao', phone: '9876543210', status: 'New' },
    { name: 'Anita Patel', phone: '9876543211', status: 'Visited' },
    { name: 'Karan Johar', phone: '9876543212', status: 'Interested' },
    { name: 'Meera Rajput', phone: '9876543213', status: 'Converted' },
    { name: 'Rahul Desai', phone: '9876543214', status: 'Lost' },
  ]
};

export const MOCK_SEAT_MATRIX = [
  { id: '1', status: 'free', shift: 'Morning' },
  { id: '2', status: 'maintenance', shift: 'Evening' },
  { id: '3', status: 'free', shift: 'Full Day' },
];

export const MOCK_LOCKER_MATRIX = [
  { id: '1', lockerNumber: 'L-01', isActive: true, status: 'Free' },
  { id: '2', lockerNumber: 'L-02', isActive: false, status: 'Maintenance' },
  { id: '3', lockerNumber: 'L-03', isActive: true, status: 'Free' },
];

export const MOCK_ALLOCATIONS = [
  { studentName: 'Alex Rivera', smartId: 'LIB-001', seatNo: 'S-02', shift: 'Morning', customSlots: '8AM–10AM, 5PM–8PM', lockerNo: 'A01', validFrom: '01 Oct 2024', validTill: '31 Oct 2024', daysLeft: 7, status: 'Active' },
  { studentName: 'Priya Sharma', smartId: 'LIB-002', seatNo: 'S-11', shift: 'Evening', customSlots: '—', lockerNo: '—', validFrom: '15 Sep 2024', validTill: '14 Oct 2024', daysLeft: 3, status: 'Active' },
  { studentName: 'Rohan Mehta', smartId: 'LIB-003', seatNo: 'S-22', shift: 'Morning', customSlots: '—', lockerNo: 'B04', validFrom: '01 Sep 2024', validTill: '30 Sep 2024', daysLeft: -5, status: 'Expired' },
  { studentName: 'Sneha Patel', smartId: 'LIB-004', seatNo: 'S-36', shift: 'Full Day', customSlots: '—', lockerNo: '—', validFrom: '10 Oct 2024', validTill: '09 Nov 2024', daysLeft: 20, status: 'Active' },
  { studentName: 'Vikram Rao', smartId: 'LIB-005', seatNo: 'S-45', shift: 'Evening', customSlots: '6PM–9PM', lockerNo: 'C10', validFrom: '20 Oct 2024', validTill: '19 Nov 2024', daysLeft: 30, status: 'Active' },
  { studentName: 'Ananya Gupta', smartId: 'LIB-006', seatNo: 'S-08', shift: 'Morning', customSlots: '—', lockerNo: '—', validFrom: '05 Oct 2024', validTill: '04 Oct 2024', daysLeft: 12, status: 'Suspended' },
];

export const MOCK_SEAT_HISTORY = [
  { seatNo: 'S-12', studentName: 'Rahul Verma', smartId: 'LIB-088', shift: 'Morning', occupiedFrom: '01 Jan 2024', occupiedTill: '31 Mar 2024', duration: '90 days', reason: 'Admission' },
  { seatNo: 'S-12', studentName: 'Pooja Nair', smartId: 'LIB-045', shift: 'Morning', occupiedFrom: '01 Apr 2024', occupiedTill: '15 Jun 2024', duration: '75 days', reason: 'Seat Change' },
  { seatNo: 'S-12', studentName: 'Arjun Singh', smartId: 'LIB-112', shift: 'Morning', occupiedFrom: '01 Jul 2024', occupiedTill: '30 Sep 2024', duration: '91 days', reason: 'Shift Change' },
  { seatNo: 'S-07', studentName: 'Meera Joshi', smartId: 'LIB-033', shift: 'Evening', occupiedFrom: '15 Feb 2024', occupiedTill: '14 May 2024', duration: '89 days', reason: 'Admission' },
  { seatNo: 'S-07', studentName: 'Karan Malhotra', smartId: 'LIB-077', shift: 'Evening', occupiedFrom: '01 Jun 2024', occupiedTill: '10 Aug 2024', duration: '70 days', reason: 'Seat Change' },
  { seatNo: 'S-31', studentName: 'Divya Kapoor', smartId: 'LIB-099', shift: 'Full Day', occupiedFrom: '01 Mar 2024', occupiedTill: '31 Aug 2024', duration: '183 days', reason: 'Admission' },
];

export const MOCK_STUDENTS = [
  { id: 'MOCK-1', smartId: 'LIB-MOCK-1', name: 'Mock Student 1', phone: '9876543210', status: 'Active', shift: 'Morning', seatNumber: 'S-1', planDuration: '1 Month', joiningDate: '2024-01-01', validTill: '2024-01-31' },
];

export const MOCK_ENQUIRIES = [
  { id: 'MOCK-1', name: 'Siddharth Rao', phone: '9876543210', status: 'New', source: 'Walk-in', inquiryDate: '2024-01-01', expectedJoinDate: '2024-01-05', nextFollowUp: '2024-01-03' }
];

export const MOCK_COMMUNICATION_HISTORY = [
  { id: 'MOCK-1', studentName: 'Mock Student', message: 'Welcome to the library!', date: '2024-01-01', status: 'Sent', channel: 'SMS' }
];
