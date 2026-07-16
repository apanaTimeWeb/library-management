// RESPONSIBILITY: Centralized domain type definitions across the Superadmin module ensuring zero `any` usage.
// DATA FLOW: superadmin_types.ts -> Components / Hooks / APIs

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export interface SuperadminKpiMetric {
  label: string;
  value: string | number;
  subText?: string;
  trend?: {
    value: string;
    isUp?: boolean;
    isPositive?: boolean;
  };
}

export interface SuperadminRecentLibraryRecord {
  id: string;
  name: string;
  city: string;
  plan: string;
  status: 'Active' | 'Trial' | 'Suspended' | 'Overdue';
  joinedDate: string;
}

export interface SuperadminAuditLogRecord {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  status: 'Success' | 'Failed' | 'Warning';
  ipAddress?: string;
}

export interface SuperadminCommunicationNotice {
  id: string;
  title: string;
  targetAudience: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Published' | 'Draft' | 'Archived';
  publishedAt: string;
  content: string;
}

export interface SuperadminCommunicationComplaint {
  id: string;
  libraryName: string;
  subject: string;
  status: 'Open' | 'In-Progress' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  description?: string;
}

export interface SuperadminWhatsappTemplateRecord {
  id: string;
  name: string;
  category: string;
  language: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  content: string;
}

export interface SuperadminWhatsappLogRecord {
  id: string;
  recipient: string;
  templateName: string;
  sentAt: string;
  status: 'Delivered' | 'Read' | 'Failed' | 'Sent';
}

export interface SuperadminSupportTicketRecord {
  id: string;
  subject: string;
  libraryName: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In-Progress' | 'Resolved';
  assignedTo: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: any;
  error?: string;
  statusCode?: number;
}
