export const SEAT_CLASS: Record<string, string> = {
  available: 'bg-success-bg border-success text-success',
  occupied:  'bg-border border-border text-text-secondary',
  expiring:  'bg-warning-bg border-warning text-warning-hover',
};

export const STATUS_CLASS: Record<string, string> = {
  New:        'bg-info-bg text-info',
  Visited:    'bg-warning-bg text-warning',
  Interested: 'bg-primary-subtle text-primary',
  Converted:  'bg-success-bg text-success',
  Lost:       'bg-danger-bg text-danger',
};

export const QUICK_LINKS = [
  { title: 'All Students',    href: '/manager/manager_students'                 },
  { title: 'Enquiries',       href: '/manager/manager_crm/enquiries'            },
  { title: 'Collect Fee',     href: '/manager/manager_finance/collect-fee'      },
  { title: 'Add Complaint',   href: '/manager/manager_communication/complaints' },
  { title: 'Waitlist',        href: '#'                         },
  { title: 'Mark Attendance', href: '/manager/manager_engagement/attendance'    },
  { title: 'QR Scanner',      href: '/manager/manager_engagement/qr-scanner'    },
  { title: 'My Profile',      href: '#'                         },
];
