
export const ADMIN_ENGAGEMENT_MOCK_ABSENTEES = [
  { id:'1', name:'Priya Verma',   initials:'PV', smartId:'SL-002', shift:'Morning',   daysAbsent:4,  lastSeen:'2026-04-08', parentPhone:'+91 981234', parentEmail:'parent1@email.com', notified:false },
  { id:'2', name:'Sneha Patel',   initials:'SP', smartId:'SL-004', shift:'Morning',   daysAbsent:8,  lastSeen:'2026-04-04', parentPhone:'+91 975678', parentEmail:'parent2@email.com', notified:false },
  { id:'3', name:'Deepak Mishra', initials:'DM', smartId:'SL-008', shift:'Afternoon', daysAbsent:3,  lastSeen:'2026-04-09', parentPhone:'+91 969012', parentEmail:'parent3@email.com', notified:false },
  { id:'4', name:'Anita Roy',     initials:'AR', smartId:'SL-011', shift:'Evening',   daysAbsent:12, lastSeen:'2026-03-31', parentPhone:'+91 953456', parentEmail:'parent4@email.com', notified:true  },
  { id:'5', name:'Vikram Nair',   initials:'VN', smartId:'SL-015', shift:'Morning',   daysAbsent:5,  lastSeen:'2026-04-07', parentPhone:'+91 947890', parentEmail:'parent5@email.com', notified:false },
];

export const ADMIN_ENGAGEMENT_MOCK_ATTENDANCE = [
  { id:'1', smartId:'SL-001', name:'Rahul Sharma',   initials:'RS', shift:'Morning',   consecutiveAbsent:0, status:null, inTime:'09:00', outTime:'13:00' },
  { id:'2', smartId:'SL-002', name:'Priya Verma',    initials:'PV', shift:'Morning',   consecutiveAbsent:4, status:null, inTime:'',      outTime:''      },
  { id:'3', smartId:'SL-003', name:'Amit Kumar',     initials:'AK', shift:'Afternoon', consecutiveAbsent:0, status:null, inTime:'13:00', outTime:'18:00' },
  { id:'4', smartId:'SL-004', name:'Sneha Patel',    initials:'SP', shift:'Morning',   consecutiveAbsent:7, status:null, inTime:'',      outTime:''      },
  { id:'5', smartId:'SL-005', name:'Rohan Das',      initials:'RD', shift:'Evening',   consecutiveAbsent:0, status:null, inTime:'18:00', outTime:'22:00' },
  { id:'6', smartId:'SL-006', name:'Kavita Singh',   initials:'KS', shift:'Afternoon', consecutiveAbsent:0, status:null, inTime:'13:00', outTime:'18:00' },
  { id:'7', smartId:'SL-007', name:'Arjun Mehta',    initials:'AM', shift:'Morning',   consecutiveAbsent:2, status:null, inTime:'',      outTime:''      },
  { id:'8', smartId:'SL-008', name:'Nisha Gupta',    initials:'NG', shift:'Evening',   consecutiveAbsent:0, status:null, inTime:'18:00', outTime:'22:00' },
];

export const ADMIN_ENGAGEMENT_MOCK_HOLIDAYS = [
  { id:'1', date:'2026-04-14', name:'Dr. Ambedkar Jayanti',      type:'National'  },
  { id:'2', date:'2026-04-21', name:'Ram Navami',                type:'Religious' },
  { id:'3', date:'2026-05-01', name:'International Labour Day',  type:'National'  },
  { id:'4', date:'2026-08-15', name:'Independence Day',          type:'National'  },
  { id:'5', date:'2026-10-02', name:'Gandhi Jayanti',            type:'National'  },
];

export const ADMIN_ENGAGEMENT_WEEK_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

