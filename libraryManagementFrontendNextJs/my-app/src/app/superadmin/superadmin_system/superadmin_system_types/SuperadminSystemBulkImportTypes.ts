export type SuperadminSystemBulkImportRowStatus = 'ok' | 'error' | 'warning';
export type SuperadminSystemBulkImportStep = 'upload' | 'preview' | 'importing' | 'done';

export interface SuperadminSystemBulkImportPreviewRow {
  row: number;
  name: string;
  phone: string;
  email: string;
  shift: string;
  seat: string;
  status: SuperadminSystemBulkImportRowStatus;
  issue?: string;
}
