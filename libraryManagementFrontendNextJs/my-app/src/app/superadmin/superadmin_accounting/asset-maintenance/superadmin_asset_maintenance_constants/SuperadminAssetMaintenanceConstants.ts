import type { SuperadminMaintenanceLog } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_types/SuperadminAssetMaintenanceTypes';

export const SUPERADMIN_ASSET_MAINTENANCE_MOCK_DATA: SuperadminMaintenanceLog[] = [
  { id: 1, assetName: 'AC Unit — Hall A',   issue: 'Gas refill & filter cleaning',  reportedDate: '2026-04-02', scheduledDate: '2026-04-08', vendor: 'CoolTech Services', cost: 1800, status: 'completed'   },
  { id: 2, assetName: 'Water Purifier',      issue: 'Filter replacement',            reportedDate: '2026-04-05', scheduledDate: '2026-04-10', vendor: 'AquaPure',          cost: 900,  status: 'in-progress' },
  { id: 3, assetName: 'CCTV Camera — B2',    issue: 'Camera not recording',          reportedDate: '2026-04-08', scheduledDate: '2026-04-12', vendor: 'SecureVision',      cost: 1200, status: 'pending'     },
  { id: 4, assetName: 'Biometric Scanner',   issue: 'Fingerprint sensor malfunction',reportedDate: '2026-04-09', scheduledDate: '2026-04-14', vendor: 'TechFix',           cost: 2500, status: 'pending'     },
  { id: 5, assetName: 'Inverter Battery',    issue: 'Battery backup reduced',        reportedDate: '2026-03-28', scheduledDate: '2026-04-03', vendor: 'PowerCare',         cost: 3500, status: 'completed'   },
];

export const SUPERADMIN_ASSET_MAINTENANCE_STATUS_STYLES: Record<string, string> = {
  pending:     'bg-warning-bg text-warning border border-warning/20',
  'in-progress': 'bg-info-bg text-info,#3B82F6 border border-info/20',
  completed:   'bg-success-bg text-success border border-success/20',
};

