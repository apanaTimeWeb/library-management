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
  enquiry: EnquiryDetail;
}

export interface ManagerCrmEnquiriesTableProps {
  data: EnquiryDetail[];
}

export interface ManagerCrmEnquiriesKanbanProps {
  data: EnquiryDetail[];
}

export interface MarkLostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details: string) => void;
  isSubmitting: boolean;
}
