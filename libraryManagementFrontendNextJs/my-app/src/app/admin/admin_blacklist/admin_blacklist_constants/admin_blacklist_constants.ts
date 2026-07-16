// RESPONSIBILITY: Centralized constants and initial mock data for admin_blacklist (`Rule 3`, `Rule 35`).
// DATA FLOW: Constants -> Store, Hooks, and Components.

import { BlacklistedStudentRecord } from '@/app/admin/admin_blacklist/admin_blacklist_types/admin_blacklist_types';

export const BLACKLIST_DEFAULT_BY = 'Library Admin';
export const BLACKLIST_DEFAULT_SEAT = 'N/A';

export const MOCK_BLACKLIST: BlacklistedStudentRecord[] = [
  { id: 'BL1', name: 'Vikram Patel',  phone: '9876501234', reason: 'Repeated fee default (3 months)',    blacklistedBy: 'Rajesh Kumar', blacklistedOn: '25/07/25', previousSeat: 'S20' },
  { id: 'BL2', name: 'Suresh Yadav',  phone: '9876502345', reason: 'Property damage — broken chair',     blacklistedBy: 'Rajesh Kumar', blacklistedOn: '10/06/25', previousSeat: 'S7'  },
  { id: 'BL3', name: 'Kavita Mishra', phone: '9876503456', reason: 'Disruptive behavior — multiple warnings', blacklistedBy: 'Sunita Patil', blacklistedOn: '02/05/25', previousSeat: 'S14' },
];
