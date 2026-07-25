// RESPONSIBILITY: Renders or handles logic for ManagerEngagementConstants.ts.
import { AbsenteeRow } from '@/app/manager/manager_engagement/manager_engagement_types/ManagerEngagementTypes';

export const ABSENTEE_MOCK_DATA: AbsenteeRow[] = [
  { id:'1', name:'Priya Verma',   initials:'PV', smartId:'SL-002', shift:'Morning',   daysAbsent:4,  lastSeen:'2026-04-08', parentPhone:'+91 981234', parentEmail:'parent1@email.com', notified:false },
  { id:'2', name:'Sneha Patel',   initials:'SP', smartId:'SL-004', shift:'Morning',   daysAbsent:8,  lastSeen:'2026-04-04', parentPhone:'+91 975678', parentEmail:'parent2@email.com', notified:false },
  { id:'3', name:'Deepak Mishra', initials:'DM', smartId:'SL-008', shift:'Afternoon', daysAbsent:3,  lastSeen:'2026-04-09', parentPhone:'+91 969012', parentEmail:'parent3@email.com', notified:false },
  { id:'4', name:'Anita Roy',     initials:'AR', smartId:'SL-011', shift:'Evening',   daysAbsent:12, lastSeen:'2026-03-31', parentPhone:'+91 953456', parentEmail:'parent4@email.com', notified:true  },
  { id:'5', name:'Vikram Nair',   initials:'VN', smartId:'SL-015', shift:'Morning',   daysAbsent:5,  lastSeen:'2026-04-07', parentPhone:'+91 947890', parentEmail:'parent5@email.com', notified:false },
];


