// RESPONSIBILITY: Renders or handles logic for Superadminsuperadmin_types.ts.


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
  addedDate: string;
  source: EnquirySource | string;
  handledBy: string;
  enquiryDate: string;
  preferredBranch: string;
  avatar: string;
  followUps: FollowUp[];
  isOverdue?: boolean;
  isToday?: boolean;
  isUpcoming?: boolean;
  convertedDate?: string;
}
export interface KanbanColumn {
  id: EnquiryStatus;
  label: string;
  colorClass: string;
  dotColor: string;
  cardClass: string;
  badgeClass: string;
}
export type EnquiryStatus = 'New' | 'Visited' | 'Interested' | 'Converted' | 'Lost';
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

// â”€â”€â”€ CRM Shared TypeScript Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Self-contained â€” no imports from outside (crm) folder
// â”€â”€â”€ Kanban Column Config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    id: 'New',
    label: 'New',
    colorClass: 'crm-col-label--new',
    dotColor: 'crm-col-dot--new',
    cardClass: 'crm-kanban-card--new',
    badgeClass: 'crm-badge--new',
  },
  {
    id: 'Visited',
    label: 'Visited',
    colorClass: 'crm-col-label--visited',
    dotColor: 'crm-col-dot--visited',
    cardClass: 'crm-kanban-card--visited',
    badgeClass: 'crm-badge--visited',
  },
  {
    id: 'Interested',
    label: 'Interested',
    colorClass: 'crm-col-label--interested',
    dotColor: 'crm-col-dot--interested',
    cardClass: 'crm-kanban-card--interested',
    badgeClass: 'crm-badge--interested',
  },
  {
    id: 'Converted',
    label: 'Converted',
    colorClass: 'crm-col-label--converted',
    dotColor: 'crm-col-dot--converted',
    cardClass: 'crm-kanban-card--converted',
    badgeClass: 'crm-badge--converted',
  },
  {
    id: 'Lost',
    label: 'Lost',
    colorClass: 'crm-col-label--lost',
    dotColor: 'crm-col-dot--lost',
    cardClass: 'crm-kanban-card--lost',
    badgeClass: 'crm-badge--neutral',
  },
];

// â”€â”€â”€ Status â†’ Badge class mapping â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Colors per module_03_crm_enquiries.md:
//   New â†’ --info (blue) | Visited â†’ --warning (amber) | Interested â†’ --purple
//   Converted â†’ --success (green) | Lost â†’ neutral grey
export const STATUS_BADGE: Record<EnquiryStatus, string> = {
  New:        'crm-badge--new',
  Visited:    'crm-badge--visited',
  Interested: 'crm-badge--interested',
  Converted:  'crm-badge--converted',
  Lost:       'crm-badge--neutral',
};

// â”€â”€â”€ Utility: mask phone number â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 6) return phone;
  return digits.slice(0, 2) + '****' + digits.slice(-4);
}

// â”€â”€â”€ Utility: get initials â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(( n: string ) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

