

export interface SuperadminCommunicationWhatsappTemplate {
  id: string;
  label: string;
  icon: string;
  body: string;
}
export interface SuperadminCommunicationComplaint {
  id: string;
  title: string;
  student: string;
  isAnonymous: boolean;
  description: string;
  status: SuperadminCommunicationComplaintStatus;
  date: string;
  resolvedBy: string;
  resolvedDate: string;
  resolvedNote: string;
}
export interface SuperadminCommunicationWhatsappLog {
  id: string;
  dateTime: string;
  phone: string;
  student: string;
  type: 'welcome' | 'fee_reminder' | 'receipt' | 'notice' | 'renewal';
  status: 'Pending' | 'Sent' | 'Delivered' | 'Failed';
  error: string;
  message: string;
}
export interface SuperadminCommunicationNotification {
  id: string;
  category: 'Finance' | 'CRM' | 'Operations' | 'Attendance';
  icon: string;
  title: string;
  description: string;
  time: string;
  priority: 'High' | 'Medium';
  link: string;
  read: boolean;
}
export interface SuperadminCommunicationNotice {
  id: string;
  title: string;
  message: string;
  validTill: string;
  postedBy: string;
  postedDate: string;
  status: 'Active' | 'Expired';
}
export type SuperadminCommunicationComplaintStatus = 'Open' | 'In-Progress' | 'Resolved';
