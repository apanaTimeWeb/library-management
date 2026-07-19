// RESPONSIBILITY: Renders or handles logic for SuperadminSystemBulkImportConstants.ts.
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import React from 'react';

export const SUPERADMIN_SYSTEM_BULK_IMPORT_TEMPLATE_HEADERS = [
  'Name*', 'Phone*', 'Email', 'Shift*', 'Seat', 'Plan', 'Fee Paid', 'Join Date'
];

export const SUPERADMIN_SYSTEM_BULK_IMPORT_STATUS_CONFIG: Record<
  string, 
  { label: string; variant: 'success' | 'warning' | 'danger'; icon: React.ElementType }
> = {
  ok:      { label: 'OK',      variant: 'success', icon: CheckCircle  },
  warning: { label: 'Warning', variant: 'warning', icon: AlertTriangle },
  error:   { label: 'Error',   variant: 'danger',  icon: XCircle      },
};

