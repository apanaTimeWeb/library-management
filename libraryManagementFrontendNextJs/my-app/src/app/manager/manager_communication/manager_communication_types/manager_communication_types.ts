

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
export interface ManagerCommunicationState {
  notices: Notice[];
  noticesStatus: FetchState;
  noticesError: string | null;
  complaints: Complaint[];
  complaintsStatus: FetchState;
  complaintsError: string | null;
  fetchNotices: () => Promise<void>;
  addNotice: (notice: Partial<Notice>) => Promise<void>;
  updateNotice: (id: string, updates: Partial<Notice>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;
  fetchComplaints: () => Promise<void>;
  addComplaint: (complaint: Partial<Complaint>) => Promise<void>;
  updateComplaintStatus: (id: string, status: Complaint['status'], resolution?: string) => Promise<void>;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
