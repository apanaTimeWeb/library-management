// RESPONSIBILITY: Renders or handles logic for SuperadminSystemBackupsTypes.ts.


export interface SuperadminSystemBackupRecord {
  id: string;
  name: string;
  type: 'auto' | 'manual';
  size: string;
  createdAt: string;
  status: 'success' | 'failed' | 'in-progress';
  modules: string[];
}

