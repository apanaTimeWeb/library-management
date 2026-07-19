export type NoticeStatus = 'Active' | 'Expired';
export type ComplaintStatus = 'Open' | 'In-Progress' | 'Resolved';
export type NotificationStatus = 'Sent' | 'Delivered' | 'Read' | 'Failed';
export type TemplateStatus = 'Approved' | 'Pending Approval' | 'Rejected';
export type WhatsAppLogStatus = 'Sent' | 'Delivered' | 'Read' | 'Failed';

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

export interface ManagerCommunicationNotification {
  id: string;
  title: string;
  message: string;
  targetAudience: string;
  sentDate: string;
  sentBy: string;
  status: NotificationStatus;
  deliveredCount: number;
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

export interface ManagerCommunicationWhatsAppLog {
  id: string;
  studentName: string;
  phoneNumber: string;
  templateUsed: string;
  sentDate: string;
  status: WhatsAppLogStatus;
}

export interface ManagerCommunicationStats {
  activeNotices: number;
  openComplaints: number;
  notificationsSent: number;
  whatsappMessagesSent: number;
}
