// RESPONSIBILITY: Renders or handles logic for manager_crm_constants.ts.
import type { EnquiryStatus, KanbanColumn } from '@/app/manager/manager_crm/manager_crm_types';

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

export const STATUS_BADGE: Record<EnquiryStatus, string> = {
  New: 'crm-badge--info',
  Visited: 'crm-badge--warning',
  Interested: 'crm-badge--primary',
  Converted: 'crm-badge--success',
  Lost: 'crm-badge--danger',
};

export const DOT_CLASS: Record<EnquiryStatus, string> = {
  New: 'crm-col-dot--new',
  Visited: 'crm-col-dot--visited',
  Interested: 'crm-col-dot--interested',
  Converted: 'crm-col-dot--converted',
  Lost: 'crm-col-dot--lost',
};

