// RESPONSIBILITY: Renders or handles logic for SuperadminSeatsMockData.ts.
export const SUPERADMIN_SEATS_MOCK_ALLOCATIONS = [
  { studentName: 'Alex Rivera', smartId: 'LIB-001', seatNo: 'S-02', shift: 'Morning', customSlots: '8AM10AM, 5PM8PM', lockerNo: 'A01', validFrom: '01 Oct 2024', validTill: '31 Oct 2024', daysLeft: 7, status: 'Active' },
  { studentName: 'Priya Sharma', smartId: 'LIB-002', seatNo: 'S-11', shift: 'Evening', customSlots: '', lockerNo: '', validFrom: '15 Sep 2024', validTill: '14 Oct 2024', daysLeft: 3, status: 'Active' },
  { studentName: 'Rohan Mehta', smartId: 'LIB-003', seatNo: 'S-22', shift: 'Morning', customSlots: '', lockerNo: 'B04', validFrom: '01 Sep 2024', validTill: '30 Sep 2024', daysLeft: -5, status: 'Expired' },
  { studentName: 'Sneha Patel', smartId: 'LIB-004', seatNo: 'S-36', shift: 'Full Day', customSlots: '', lockerNo: '', validFrom: '10 Oct 2024', validTill: '09 Nov 2024', daysLeft: 20, status: 'Active' },
  { studentName: 'Vikram Rao', smartId: 'LIB-005', seatNo: 'S-45', shift: 'Evening', customSlots: '6PM9PM', lockerNo: 'C10', validFrom: '20 Oct 2024', validTill: '19 Nov 2024', daysLeft: 30, status: 'Active' },
  { studentName: 'Ananya Gupta', smartId: 'LIB-006', seatNo: 'S-08', shift: 'Morning', customSlots: '', lockerNo: '', validFrom: '05 Oct 2024', validTill: '04 Oct 2024', daysLeft: 12, status: 'Suspended' },
];

export const SUPERADMIN_SEATS_MOCK_LOCKERS = [
  { id: '1', lockerId: 'A01', status: 'Occupied', assignedTo: 'Alex Chen', studentId: 'LIB-021', assignedSince: '01 Oct 2024' },
  { id: '2', lockerId: 'A02', status: 'Free', assignedTo: '', studentId: '', assignedSince: '' },
  { id: '3', lockerId: 'A05', status: 'Maintenance', assignedTo: '', studentId: '', assignedSince: '' },
  { id: '4', lockerId: 'B04', status: 'Occupied', assignedTo: 'Maria Vargas', studentId: 'LIB-055', assignedSince: '15 Sep 2024' },
  { id: '5', lockerId: 'B06', status: 'Free', assignedTo: '', studentId: '', assignedSince: '' },
  { id: '6', lockerId: 'C10', status: 'Occupied', assignedTo: 'Ravi Kumar', studentId: 'LIB-099', assignedSince: '10 Oct 2024' },
];
export const SUPERADMIN_SEATS_MOCK_HISTORY = [
  { seatNo: 'S-12', studentName: 'Rahul Verma', smartId: 'LIB-088', shift: 'Morning', occupiedFrom: '01 Jan 2024', occupiedTill: '31 Mar 2024', duration: '90 days', reason: 'Admission' },
  { seatNo: 'S-12', studentName: 'Pooja Nair', smartId: 'LIB-045', shift: 'Morning', occupiedFrom: '01 Apr 2024', occupiedTill: '15 Jun 2024', duration: '75 days', reason: 'Seat Change' },
  { seatNo: 'S-12', studentName: 'Arjun Singh', smartId: 'LIB-112', shift: 'Morning', occupiedFrom: '01 Jul 2024', occupiedTill: '30 Sep 2024', duration: '91 days', reason: 'Shift Change' },
  { seatNo: 'S-07', studentName: 'Meera Joshi', smartId: 'LIB-033', shift: 'Evening', occupiedFrom: '15 Feb 2024', occupiedTill: '14 May 2024', duration: '89 days', reason: 'Admission' },
  { seatNo: 'S-07', studentName: 'Karan Malhotra', smartId: 'LIB-077', shift: 'Evening', occupiedFrom: '01 Jun 2024', occupiedTill: '10 Aug 2024', duration: '70 days', reason: 'Seat Change' },
  { seatNo: 'S-31', studentName: 'Divya Kapoor', smartId: 'LIB-099', shift: 'Full Day', occupiedFrom: '01 Mar 2024', occupiedTill: '31 Aug 2024', duration: '183 days', reason: 'Admission' },
];

export const SUPERADMIN_SEATS_MOCK_SEATS = [
  { id: '1', seatNo: 'S-042', branch: 'North Wing', status: 'Working', assignedTo: 'Elias Hawthorne', lastMaintenance: 'Oct 14, 2024' },
  { id: '2', seatNo: 'S-109', branch: 'South Archive', status: 'Maintenance', assignedTo: '', lastMaintenance: 'Today' },
  { id: '3', seatNo: 'S-012', branch: 'Main Reading', status: 'Broken', assignedTo: '', lastMaintenance: 'Pending' },
  { id: '4', seatNo: 'S-088', branch: 'North Wing', status: 'Working', assignedTo: 'Seraphina Vane', lastMaintenance: 'Nov 02, 2024' },
];

export const SUPERADMIN_SEATS_MOCK_SHIFT_GAPS = [
  {
    id: '1', name: 'Morning', occupied: 38, capacity: 60,
    booked: [
      { startH: 6,  endH: 10, label: 'Batch A (22 students)' },
      { startH: 10, endH: 12, label: 'Batch B (16 students)' },
    ],
    gaps: [{ startH: 8, endH: 10, seats: 6, revLoss: 600 }],
  },
  {
    id: '2', name: 'Afternoon', occupied: 18, capacity: 60,
    booked: [
      { startH: 12, endH: 15, label: 'Batch C (18 students)' }
    ],
    gaps: [{ startH: 15, endH: 18, seats: 42, revLoss: 1200 }]
  }
];

export const SUPERADMIN_SEATS_MOCK_SHIFTS = [
  { id: '1', name: 'Morning',   startTime: '06:00', endTime: '12:00', occupancy: 32, capacity: 40, active: true  },
  { id: '2', name: 'Afternoon', startTime: '12:00', endTime: '18:00', occupancy: 18, capacity: 40, active: true  },
  { id: '3', name: 'Evening',   startTime: '18:00', endTime: '22:00', occupancy: 0,  capacity: 40, active: false },
];

export const SUPERADMIN_SEATS_MOCK_MIGRATION_STUDENTS = [
  { id: '1', name: 'Alex Rivera',  smartId: 'LIB-88429', currentShift: 'Morning',  currentSeat: 'A-12', validTill: '2025-04-30', plan: 'Monthly ?1000', dailyRate: 33 },
  { id: '2', name: 'Priya Sharma', smartId: 'LIB-00234', currentShift: 'Evening',  currentSeat: 'B-05', validTill: '2025-05-15', plan: 'Monthly ?1200', dailyRate: 40 },
  { id: '3', name: 'Rohan Mehta',  smartId: 'LIB-00567', currentShift: 'Full Day', currentSeat: 'C-08', validTill: '2025-06-01', plan: 'Monthly ?1500', dailyRate: 50 },
];

