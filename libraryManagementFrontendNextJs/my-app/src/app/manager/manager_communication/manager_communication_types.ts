

export interface Notice {
  id: string;
  title: string;
  message: string;
  validTill: string;
  postedBy: string;
  postedDate: string;
  status: NoticeStatus;
}
export interface NoticeFormValues {
  title: string;
  message: string;
  validTill: string;
}
export interface Complaint {
  id: string;
  title: string;
  student: string;
  isAnonymous: boolean;
  description: string;
  status: ComplaintStatus;
  date: string;
  resolvedBy: string;
  resolvedDate: string;
  resolvedNote: string;
}
export interface ComplaintFormValues {
  student: string;
  anonymous: boolean;
  title: string;
  description: string;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type NoticeStatus = 'Active' | 'Expired';
export type ComplaintStatus = 'Open' | 'In-Progress' | 'Resolved';

// RESPONSIBILITY: All TypeScript types for the manager_communication module.
