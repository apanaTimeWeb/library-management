export type NoticeStatus = 'Active' | 'Expired';
export type ComplaintStatus = 'Open' | 'In-Progress' | 'Resolved';
export type TemplateStatus = 'Approved' | 'Pending Approval' | 'Rejected';
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



export interface ManagerCommunicationWhatsAppTemplate {
  id: string;
  templateName: string;
  category: 'Marketing' | 'Utility' | 'Authentication';
  language: string;
  content: string;
  status: TemplateStatus;
  lastUpdated: string;
}



export interface ManagerCommunicationStats {
  activeNotices: number;
  openComplaints: number;
}
