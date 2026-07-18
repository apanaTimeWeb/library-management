import { CreditCard, CalendarDays, Users, Database } from 'lucide-react';
import React from 'react';
import { SuperadminSystemQuickExport } from "./SuperadminSystemDataExportConstants_types";

export const SUPERADMIN_SYSTEM_QUICK_EXPORTS: SuperadminSystemQuickExport[] = [
  { id: 'due-fees',     label: 'Fee Due Report',        description: 'Students with pending fee payments',  icon: CreditCard,  format: 'CSV' },
  { id: 'expiring',     label: 'Expiring Subscriptions',description: 'Students expiring in the next 7 days', icon: CalendarDays, format: 'CSV' },
  { id: 'active',       label: 'Active Students',       description: 'All currently active students',        icon: Users,       format: 'XLSX' },
  { id: 'full-backup',  label: 'Full Data Backup',      description: 'Everything — all modules in one ZIP',  icon: Database,    format: 'ZIP' },
];
