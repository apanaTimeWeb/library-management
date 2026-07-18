import { ReactNode } from 'react';

export type EnquiryStatus = 'New' | 'Visited' | 'Interested' | 'Converted' | 'Lost';

export interface FollowUp {
  id: string;
  date: string;
  note: string;
  by: string;
  method?: 'call' | 'email' | 'whatsapp' | 'in-person';
}

export interface EnquiryDetail {
  id: string; name: string; phone: string; email?: string; date?: string; status: string;
  enquiryDate: string; preferredBranch: string; shift: string; handledBy: string; source: string; notes?: string; score?: number;
  followUps: FollowUp[]; timeline?: Record<string, unknown>[]; isToday?: boolean; isUpcoming?: boolean; isOverdue?: boolean; avatar?: string;
}

export interface ManagerCrmKanbanCardProps {
  enq: import('@/app/manager/manager_crm/manager_crm_types').Enquiry;
  colClass: string;
  onClick: () => void;
}

export interface ManagerCrmEnquiriesTableProps {
  filtered: import('@/app/manager/manager_crm/manager_crm_types').Enquiry[];
  updateEnquiryStatus: (id: string, status: import('@/app/manager/manager_crm/manager_crm_types').Enquiry['status']) => void;
  onAddEnquiry?: () => void;
}

export interface ManagerCrmEnquiriesKanbanProps {
  isEmpty: boolean;
  getCardsByStatus: (status: import('@/app/manager/manager_crm/manager_crm_types/ManagerCrmTypes').EnquiryStatus) => import('@/app/manager/manager_crm/manager_crm_types').Enquiry[];
  onAddEnquiry?: () => void;
}

export interface MarkLostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details: string) => void;
  isSubmitting: boolean;
}

export interface ManagerCrmErrorBoundaryProps {
  children: ReactNode;
}

export interface ManagerCrmErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface ManagerCrmState {
  enquiries: import('@/app/manager/manager_crm/manager_crm_types').Enquiry[];
  status: import('@/app/manager/manager_crm/manager_crm_types').FetchState;
  error: string | null;
  fetchData: () => Promise<void>;
  updateEnquiryStatus: (id: string, status: import('@/app/manager/manager_crm/manager_crm_types').Enquiry['status']) => void;
}

export interface RawEnquiry {
  id: string | number;
  name: string;
  phone: string;
  preferredShift: string;
  status: string;
  handledBy?: { name: string };
  createdAt: string;
}
