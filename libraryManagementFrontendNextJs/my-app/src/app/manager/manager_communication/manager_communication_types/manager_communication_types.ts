export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export interface Notice {
  id: string;
  title: string;
  message: string;
  validTill: string;
  postedBy: string;
  postedDate: string;
  status: 'Active' | 'Expired';
}

export interface Complaint {
  id: string;
  title: string;
  studentName: string;
  phone: string;
  submittedOn: string;
  status: 'New' | 'In-Progress' | 'Resolved';
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  desc: string;
  resolution?: string;
  resolvedOn?: string;
}
