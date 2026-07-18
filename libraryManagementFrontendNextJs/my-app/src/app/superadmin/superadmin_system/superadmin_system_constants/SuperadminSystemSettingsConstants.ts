import { Palette, AlertCircle, Zap, CreditCard, Bell, Globe } from 'lucide-react';

export const SUPERADMIN_SYSTEM_SETTINGS_CATEGORIES = [
  { id: 'branding',     label: 'Branding',         icon: Palette     },
  { id: 'late-fee',     label: 'Late Fee Rules',    icon: AlertCircle },
  { id: 'auto-suspend', label: 'Auto-Suspend Rules',icon: Zap         },
  { id: 'upi',          label: 'UPI / Payment',     icon: CreditCard  },
  { id: 'notifications',label: 'Notifications',     icon: Bell        },
  { id: 'general',      label: 'General',           icon: Globe       },
];
