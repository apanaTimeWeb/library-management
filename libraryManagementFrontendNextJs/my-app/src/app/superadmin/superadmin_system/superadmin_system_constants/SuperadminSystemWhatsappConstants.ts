// RESPONSIBILITY: Renders or handles logic for SuperadminSystemWhatsappConstants.ts.
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import React from 'react';
import { SuperadminSystemWhatsappProvider, SuperadminSystemWhatsappLogStatus } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemWhatsappTypes';

export const SUPERADMIN_SYSTEM_WHATSAPP_PROVIDERS: SuperadminSystemWhatsappProvider[] = [
  { id: 'twilio',   label: 'Twilio',   requiresSecret: true  },
  { id: 'wati',     label: 'Wati',     requiresSecret: false },
  { id: 'aisensy',  label: 'AiSensy',  requiresSecret: false },
  { id: 'custom',   label: 'Custom',   requiresSecret: true  },
];

export const SUPERADMIN_SYSTEM_WHATSAPP_STATUS_CFG: Record<
  SuperadminSystemWhatsappLogStatus,
  { variant: 'success' | 'danger' | 'warning'; icon: React.ElementType }
> = {
  delivered: { variant: 'success', icon: CheckCircle },
  failed:    { variant: 'danger',  icon: XCircle     },
  pending:   { variant: 'warning', icon: Clock       },
};

