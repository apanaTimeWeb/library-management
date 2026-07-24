export type NoticeStatus = 'Active' | 'Expired';
export type ComplaintStatus = 'Open' | 'In-Progress' | 'Resolved';
export interface ManagerCommunicationNotice {
  id: string;
  title: string;
  message: string;
  validTill: string;
  postedBy: string;
  postedDate: string;
  status: NoticeStatus;
}

export interface ManagerCommunicationComplaint {
  id: string;
  ticketId: string;
  studentName: string;
  studentId: string;
  category: string;
  description: string;
  date: string;
  status: ComplaintStatus;
  priority: 'High' | 'Medium' | 'Low';
  resolvedBy?: string;
}






export interface ManagerCommunicationStats {
  activeNotices: number;
  openComplaints: number;
}
