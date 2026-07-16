export type EnquiryStatus = 'New' | 'Visited' | 'Interested' | 'Converted' | 'Lost';
export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export type EnquirySource =
  | 'Walk-in'
  | 'WhatsApp'
  | 'Referral'
  | 'Social Media'
  | 'Phone Call'
  | 'Google Ads'
  | 'Instagram'
  | 'Facebook'
  | 'Other';

export interface FollowUp {
  id: string;
  date: string;
  time: string;
  by: string;
  remark: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  shift: string;
  status: EnquiryStatus;
  handledBy: string;
  addedDate: string;
  convertedDate?: string;
  avatar: string;
  source?: EnquirySource | string;
  enquiryDate?: string;
  preferredBranch?: string;
  followUps?: FollowUp[];
  isOverdue?: boolean;
  isToday?: boolean;
  isUpcoming?: boolean;
}

export interface KanbanColumn {
  id: EnquiryStatus;
  label: string;
  colorClass: string;
  dotColor: string;
  cardClass: string;
  badgeClass: string;
}
