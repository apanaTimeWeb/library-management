import { FollowUp, Enquiry, KanbanColumn, EnquiryStatus, EnquirySource } from "./superadmin_types_types";

// ─── CRM Shared TypeScript Types ─────────────────────────────────────────────
// Self-contained — no imports from outside (crm) folder
// ─── Kanban Column Config ─────────────────────────────────────────────────────
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

// ─── Status → Badge class mapping ────────────────────────────────────────────
// Colors per module_03_crm_enquiries.md:
//   New → --info (blue) | Visited → --warning (amber) | Interested → --purple
//   Converted → --success (green) | Lost → neutral grey
export const STATUS_BADGE: Record<EnquiryStatus, string> = {
  New:        'crm-badge--new',
  Visited:    'crm-badge--visited',
  Interested: 'crm-badge--interested',
  Converted:  'crm-badge--converted',
  Lost:       'crm-badge--neutral',
};

// ─── Utility: mask phone number ───────────────────────────────────────────────
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 6) return phone;
  return digits.slice(0, 2) + '****' + digits.slice(-4);
}

// ─── Utility: get initials ────────────────────────────────────────────────────
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(( n: string ) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
