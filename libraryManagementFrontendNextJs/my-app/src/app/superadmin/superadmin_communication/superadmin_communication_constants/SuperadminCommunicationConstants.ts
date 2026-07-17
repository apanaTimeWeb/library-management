export const SUPERADMIN_COMMUNICATION_MOCK_COMPLAINTS = [
  { id: '1', title: 'AC not cooling',     student: 'Rahul Sharma', isAnonymous: false, description: 'The AC in Zone A has not been cooling properly for the past 3 days. Very uncomfortable to study.', status: 'Open',        date: '2026-04-10', resolvedBy: '—', resolvedDate: '—', resolvedNote: '' },
  { id: '2', title: 'WiFi very slow',     student: 'Anonymous',    isAnonymous: true,  description: 'Internet speed is extremely slow during evening hours. Cannot load study materials.',              status: 'In-Progress', date: '2026-04-09', resolvedBy: 'Admin', resolvedDate: '—', resolvedNote: '' },
  { id: '3', title: 'Locker door broken', student: 'Priya Verma',  isAnonymous: false, description: 'Locker door hinge is broken. Cannot lock properly.',                                               status: 'Resolved',    date: '2026-04-07', resolvedBy: 'Staff Ravi', resolvedDate: '2026-04-08', resolvedNote: 'Hinge replaced.' },
  { id: '4', title: 'Noise from outside', student: 'Anonymous',    isAnonymous: true,  description: 'Construction noise from outside is very disturbing during morning hours.',                         status: 'Open',        date: '2026-04-11', resolvedBy: '—', resolvedDate: '—', resolvedNote: '' },
];

export const SUPERADMIN_COMMUNICATION_MOCK_NOTICES = [
  { id: 'N1', title: 'Library Closed for Maintenance', message: 'The library will be closed on Sunday due to scheduled maintenance.', postedBy: 'Admin', postedDate: '2026-04-10', validTill: '2026-04-15', status: 'Active' },
  { id: 'N2', title: 'New AC Installed', message: 'We have installed a new AC in the quiet zone.', postedBy: 'Manager', postedDate: '2026-04-08', validTill: '2026-04-30', status: 'Active' },
  { id: 'N3', title: 'Holiday Notice', message: 'Library will remain closed on the occasion of Holi.', postedBy: 'Admin', postedDate: '2026-03-20', validTill: '2026-03-26', status: 'Expired' },
];
