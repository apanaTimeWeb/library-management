import { ShieldCheck, ShieldAlert, ShieldX, LucideIcon } from 'lucide-react';

export const ADMIN_FINANCE_TRUST_SCORE_BADGE_CLASSES: Record<string, string> = {
  reliable: 'bg-success-bg text-success border border-success/20 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider',
  moderate: 'bg-warning-bg text-warning border border-warning/20 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider',
  low:      'bg-danger-bg text-danger border border-danger/20 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider',
};

export const ADMIN_FINANCE_TRUST_SCORE_BADGE_ICONS: Record<string, LucideIcon> = {
  reliable: ShieldCheck,
  moderate: ShieldAlert,
  low:      ShieldX,
};

export const ADMIN_FINANCE_TRUST_SCORE_LEVEL_OPTIONS = [
  { value: 'all', label: 'All Levels' },
  { value: 'reliable', label: 'Reliable' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'low', label: 'Low Trust' },
];

export const ADMIN_FINANCE_TRUST_SCORE_SHIFT_OPTIONS = [
  { value: 'all', label: 'All Shifts' },
  { value: 'Morning', label: 'Morning' },
  { value: 'Evening', label: 'Evening' },
  { value: 'Full Day', label: 'Full Day' },
];
