import { useState, useMemo, useCallback } from 'react';
import { SUPERADMIN_SYSTEM_MOCK_BACKUP_HISTORY } from '@/app/superadmin/superadmin_system/superadmin_system_data/SuperadminSystemMockData';
import { SuperadminSystemBackupRecord } from '../superadmin_system_types/SuperadminSystemBackupsTypes';

export function useSuperadminSystemBackups() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [cloudSync, setCloudSync] = useState(true);
  const [backupTime, setBackupTime] = useState('02:00');
  const [retention, setRetention] = useState(30);
  const [creating, setCreating] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [backups, setBackups] = useState<SuperadminSystemBackupRecord[]>(SUPERADMIN_SYSTEM_MOCK_BACKUP_HISTORY as SuperadminSystemBackupRecord[]);

  const stats = useMemo(() => {
    const successCount = backups.filter(b => b.status === 'success').length;
    const failedCount = backups.filter(b => b.status === 'failed').length;
    const lastSuccess = backups.find(b => b.status === 'success');
    return { successCount, failedCount, lastSuccess, total: backups.length };
  }, [backups]);

  const handleCreateBackup = useCallback(() => {
    setCreating(true);
    setTimeout(() => {
      const newBackup: SuperadminSystemBackupRecord = {
        id: `bk-${Date.now()}`,
        name: 'Manual Backup',
        type: 'manual',
        size: '4.3 MB',
        createdAt: new Date().toLocaleString('en-IN', { hour12: true }).replace(',', ''),
        status: 'success',
        modules: ['Students', 'Payments', 'Attendance', 'Seats', 'Expenses', 'CRM'],
      };
      setBackups(prev => [newBackup, ...prev]);
      setCreating(false);
    }, 2500);
  }, []);

  const handleDownload = useCallback((id: string) => {
    setDownloading(id);
    setTimeout(() => setDownloading(null), 1500);
  }, []);

  const handleDeleteBackup = useCallback((id: string) => {
    setBackups(prev => prev.filter(b => b.id !== id));
  }, []);

  return {
    autoBackup, setAutoBackup,
    cloudSync, setCloudSync,
    backupTime, setBackupTime,
    retention, setRetention,
    creating,
    downloading,
    backups,
    stats,
    handleCreateBackup,
    handleDownload,
    handleDeleteBackup
  };
}
