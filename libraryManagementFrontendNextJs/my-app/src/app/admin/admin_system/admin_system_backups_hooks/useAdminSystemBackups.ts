import { useState, useCallback, useMemo } from 'react';
import { ADMIN_SYSTEM_MOCK_BACKUP_HISTORY } from '@/app/admin/admin_system/admin_system_data/AdminSystemMockData2';
import { BackupRecord } from '../admin_system_types/AdminSystemBackupsTypes';

export function useAdminSystemBackups() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [cloudSync, setCloudSync] = useState(true);
  const [backupTime, setBackupTime] = useState('02:00');
  const [retention, setRetention] = useState(30);
  const [creating, setCreating] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [backups, setBackups] = useState<BackupRecord[]>(ADMIN_SYSTEM_MOCK_BACKUP_HISTORY as BackupRecord[]);

  const successCount = useMemo(() => backups.filter(b => b.status === 'success').length, [backups]);
  const failedCount = useMemo(() => backups.filter(b => b.status === 'failed').length, [backups]);
  const lastSuccess = useMemo(() => backups.find(b => b.status === 'success'), [backups]);

  const handleCreateBackup = useCallback(() => {
    setCreating(true);
    setTimeout(() => {
      const newBackup: BackupRecord = {
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
    creating, downloading, backups,
    successCount, failedCount, lastSuccess,
    handleCreateBackup, handleDownload, handleDeleteBackup
  };
}
