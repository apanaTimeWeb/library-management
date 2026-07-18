

export interface BackupRecord {
  id: string;
  name: string;
  type: 'auto' | 'manual';
  size: string;
  createdAt: string;
  status: 'success' | 'failed' | 'in-progress';
  modules: string[];
}

// RESPONSIBILITY: Renders the AdminSystemBackupsTypes.ts component/hook.
