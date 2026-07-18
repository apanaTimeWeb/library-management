import type { StudentAttendance } from '@/app/manager/manager_engagement/manager_engagement_types/manager_engagement_types';

export const INIT_STUDENTS: StudentAttendance[] = [
  { id:'1', smartId:'SL-001', name:'Rahul Sharma',   initials:'RS', shift:'Morning',   consecutiveAbsent:0, status:null, inTime:'09:00', outTime:'13:00' },
  { id:'2', smartId:'SL-002', name:'Priya Verma',    initials:'PV', shift:'Morning',   consecutiveAbsent:4, status:null, inTime:'',      outTime:''      },
  { id:'3', smartId:'SL-003', name:'Amit Kumar',     initials:'AK', shift:'Afternoon', consecutiveAbsent:0, status:null, inTime:'13:00', outTime:'18:00' },
  { id:'4', smartId:'SL-004', name:'Sneha Patel',    initials:'SP', shift:'Morning',   consecutiveAbsent:7, status:null, inTime:'',      outTime:''      },
  { id:'5', smartId:'SL-005', name:'Rohan Das',      initials:'RD', shift:'Evening',   consecutiveAbsent:0, status:null, inTime:'18:00', outTime:'22:00' },
  { id:'6', smartId:'SL-006', name:'Kavita Singh',   initials:'KS', shift:'Afternoon', consecutiveAbsent:0, status:null, inTime:'13:00', outTime:'18:00' },
  { id:'7', smartId:'SL-007', name:'Arjun Mehta',    initials:'AM', shift:'Morning',   consecutiveAbsent:2, status:null, inTime:'',      outTime:''      },
  { id:'8', smartId:'SL-008', name:'Nisha Gupta',    initials:'NG', shift:'Evening',   consecutiveAbsent:0, status:null, inTime:'18:00', outTime:'22:00' },
];
