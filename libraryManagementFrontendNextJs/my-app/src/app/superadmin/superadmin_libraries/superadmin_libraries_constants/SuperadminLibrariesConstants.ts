export const SUPERADMIN_LIBRARIES_TOASTS = {
  UPDATE_SUCCESS: (name: string) => `✅ ${name} updated successfully`,
  UPDATE_ERROR: '❌ Failed to update library',
  STATUS_SUCCESS: '⚠️ Library status updated',
  STATUS_ERROR: '❌ Failed to update status',
};

export const SUPERADMIN_LIBRARIES_PLANS = ['Basic', 'Pro', 'Enterprise'] as const;
export const SUPERADMIN_LIBRARIES_STATUSES = ['Active', 'Maintenance'] as const;


export const SUPERADMIN_LIBRARIES_MOCK_DATA: any[] = [
  {
    id: 'lib-001',
    name: 'StudyNest Patna',
    location: 'Boring Road, Patna',
    seats: 120,
    occupied: 110,
    status: 'Active',
    plan: 'Pro',
    owner: 'Rahul Kumar',
    phone: '+91 9876543210',
    joined: 'Jan 12, 2025',
  },
  {
    id: 'lib-002',
    name: 'Scholar Spaces',
    location: 'Kankarbagh, Patna',
    seats: 45,
    occupied: 40,
    status: 'Active',
    plan: 'Basic',
    owner: 'Amit Sharma',
    phone: '+91 9876543211',
    joined: 'Feb 05, 2025',
  },
  {
    id: 'lib-003',
    name: 'The Alexandria Modern',
    location: 'Cyber City, Gurugram',
    seats: 300,
    occupied: 285,
    status: 'Maintenance',
    plan: 'Enterprise',
    owner: 'Neha Singh',
    phone: '+91 9876543212',
    joined: 'Nov 20, 2024',
  },
  {
    id: 'lib-004',
    name: 'Focus Hub',
    location: 'Indiranagar, Bangalore',
    seats: 150,
    occupied: 85,
    status: 'Active',
    plan: 'Pro',
    owner: 'Kiran Reddy',
    phone: '+91 9876543213',
    joined: 'Mar 10, 2025',
  },
  {
    id: 'lib-005',
    name: 'Quiet Zone',
    location: 'Andheri West, Mumbai',
    seats: 80,
    occupied: 75,
    status: 'Active',
    plan: 'Basic',
    owner: 'Vikram Patel',
    phone: '+91 9876543214',
    joined: 'Apr 02, 2025',
  },
];
