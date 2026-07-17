export interface SuperadminSystemBackupRecord {
  id: string;
  name: string;
  type: 'auto' | 'manual';
  size: string;
  createdAt: string;
  status: 'success' | 'failed' | 'in-progress';
  modules: string[];
}
