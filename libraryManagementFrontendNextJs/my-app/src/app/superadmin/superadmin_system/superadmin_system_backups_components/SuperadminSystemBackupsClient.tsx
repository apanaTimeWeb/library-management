'use client';
// RESPONSIBILITY: Renders the SuperadminSystemBackupsClient component.
import { SuperadminCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminBadge } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminBadge';
import { SuperadminKpiCard } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminKpiCard';
import { SuperadminSwitch } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminSwitch';
import {
  Database, ChevronRight, Download, RefreshCw, CheckCircle, Clock,
  AlertTriangle, HardDrive, Shield, Cloud, Loader2, Archive, XCircle, Save, User, Trash2
} from 'lucide-react';
import { useSuperadminSystemBackups } from '@/app/superadmin/superadmin_system/superadmin_system_backups_hooks/useSuperadminSystemBackups';
import React, { useState } from 'react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

const STATUS_CFG: Record<string, { label: string; variant: 'success' | 'danger' | 'warning'; icon: React.ElementType }> = {
  success:     { label: 'Success',     variant: 'success', icon: CheckCircle  },
  failed:      { label: 'Failed',      variant: 'danger',  icon: AlertTriangle },
  'in-progress':{ label: 'In Progress', variant: 'warning', icon: Loader2      },
};

export function SuperadminSystemBackupsClient() {
    const table = useClientTable(backups);
  const {
    autoBackup, setAutoBackup, cloudSync, setCloudSync, backupTime, setBackupTime,
    retention, setRetention, creating, downloading, backups, stats,
    handleCreateBackup, handleDownload, handleDeleteBackup
  } = useSuperadminSystemBackups();
  const [cloudProvider, setCloudProvider] = useState('Google Drive');

  const cloudProviderOptions = [
    { label: 'Google Drive', value: 'Google Drive' },
    { label: 'AWS S3', value: 'AWS S3' },
    { label: 'Dropbox', value: 'Dropbox' },
    { label: 'Custom S3-Compatible', value: 'Custom S3-Compatible' }
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-medium tracking-wide mb-1">
          <span>System</span><ChevronRight size={12} /><span>Backups</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
              <Database size={28} className="text-primary" />
              Backup Manager
            </h1>
            <p className="text-text-secondary mt-1 text-sm">
              Automated nightly backups with cloud sync. Your data is always safe.
            </p>
          </div>
          <SuperadminButton
            id="create-backup-btn"
            variant="primary"
            onClick={handleCreateBackup}
            disabled={creating}
          >
            {creating
              ? <><Loader2 size={16} className="animate-spin mr-2" /> Creating Backup...</>
              : <><Download size={16} className="mr-2" /> Create Manual Backup</>}
          </SuperadminButton>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <SuperadminKpiCard title="Total Backups" value={stats.total} icon={Archive} subtitle="All time" />
        <SuperadminKpiCard title="Successful" value={stats.successCount} icon={CheckCircle} trend="up" trendLabel="Reliable" />
        <SuperadminKpiCard title="Failed" value={stats.failedCount} icon={XCircle} trend={stats.failedCount > 0 ? 'down' : 'neutral'} trendLabel={stats.failedCount > 0 ? 'Needs attention' : 'All good'} />
        <SuperadminKpiCard title="Last Backup" value={stats.lastSuccess ? 'Today' : 'Never'} icon={Clock} subtitle={stats.lastSuccess?.createdAt ?? '—'} />
      </div>

      {/* Backup Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Auto Backup Settings */}
        <SuperadminCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={18} className="text-primary" /> Automatic Backup Schedule
            </CardTitle>
            <CardDescription>Configure nightly backup schedule and retention period.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between p-4 rounded-lg bg-bg-pageg-card border border-border">
              <div>
                <p className="text-sm font-semibold text-text-primary">Enable Nightly Backups</p>
                <p className="text-xs text-text-secondary">Automatically backs up all data every night</p>
              </div>
              <SuperadminSwitch id="auto-backup-toggle" checked={autoBackup} onCheckedChange={setAutoBackup} />
            </div>

            <div className="space-y-2">
              <label htmlFor="backup-time" className="text-sm font-medium text-text-secondary">Backup Time (24hr)</label>
              <div className="flex items-center gap-3">
                <input
                  id="backup-time"
                  type="time"
                  value={backupTime}
                  onChange={e => setBackupTime(e.target.value)}
                  disabled={!autoBackup}
                  className="px-3 py-2 rounded-md bg-bg-pageg-input border border-border text-sm text-text-primary focus:outline-none focus:border-primary disabled:opacity-40"
                />
                <span className="text-sm text-text-secondary">Daily at {backupTime}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="retention-days" className="text-sm font-medium text-text-secondary">Retention Period (days)</label>
              <div className="flex items-center gap-3">
                <input
                  id="retention-days"
                  type="number"
                  value={retention}
                  onChange={e => setRetention(+e.target.value)}
                  min={7}
                  max={365}
                  className="w-24 px-3 py-2 rounded-md bg-bg-pageg-input border border-border text-sm text-text-primary focus:outline-none focus:border-primary"
                />
                <span className="text-sm text-text-secondary">Old backups deleted after {retention} days</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SuperadminButton id="save-backup-schedule-btn" variant="primary"><Save size={16} className="mr-2" /> Save Schedule</SuperadminButton>
          </CardFooter>
        </SuperadminCard>

        {/* Cloud Sync */}
        <SuperadminCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud size={18} className="text-primary" /> Cloud Sync
            </CardTitle>
            <CardDescription>Sync backups to a secure cloud storage destination.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between p-4 rounded-lg bg-bg-pageg-card border border-border">
              <div>
                <p className="text-sm font-semibold text-text-primary">Enable Cloud Sync</p>
                <p className="text-xs text-text-secondary">Automatically upload backups to cloud after creation</p>
              </div>
              <SuperadminSwitch id="cloud-sync-toggle" checked={cloudSync} onCheckedChange={setCloudSync} />
            </div>

            {cloudSync && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Cloud Provider</label>
                  <SuperadminSearchableDropdown
                    options={cloudProviderOptions}
                    value={cloudProvider}
                    onChange={setCloudProvider}
                  />
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-success-bg border border-success/30">
                      <div className="h-8 w-8 rounded-full bg-success-bg flex items-center justify-center">
                        <Shield size={16} className="text-success" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-success">Connected — Google Drive</p>
                        <p className="text-xs text-text-secondary">Last synced: 2026-04-12 at 02:03 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Storage usage */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-text-secondary">
                <span className="flex items-center gap-1"><HardDrive size={12} /> Local Storage Used</span>
                <span className="text-text-primary font-semibold">28.4 MB / 500 MB</span>
              </div>
              <div className="h-2.5 rounded-full bg-bg-pageg-input overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '5.6%' }} />
              </div>
              <p className="text-xs text-text-secondary">471.6 MB remaining</p>
            </div>
          </CardContent>
          <CardFooter>
            <SuperadminButton id="save-cloud-config-btn" variant="primary"><Save size={16} className="mr-2" /> Save Cloud Config</SuperadminButton>
            <SuperadminButton id="test-cloud-connection-btn" variant="ghost">Test Connection</SuperadminButton>
          </CardFooter>
        </SuperadminCard>
      </div>

      {/* Backup History */}
      <SuperadminCard>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Backup History</CardTitle>
              <CardDescription>All backup records — download or restore from any checkpoint.</CardDescription>
            </div>
            <SuperadminButton id="refresh-backups-btn" variant="ghost" size="sm">
              <RefreshCw size={14} className="mr-1" /> Refresh
            </SuperadminButton>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wide">
                  <th className="text-left py-3 pr-4">Backup Name</th>
                  <th className="text-left py-3 pr-4">Type</th>
                  <th className="text-left py-3 pr-4">Size</th>
                  <th className="text-left py-3 pr-4">Created At</th>
                  <th className="text-left py-3 pr-4">Status</th>
                  <th className="text-left py-3 pr-4">Includes</th>
                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {table.paginatedData.map((backup) => {
                  const cfg  = STATUS_CFG[backup.status];
                  const Icon = cfg.icon;
                  return (
                    <tr key={backup.id} className="hover:bg-bg-pageg-card transition-colors group">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <Database size={14} className="text-text-secondary" />
                          <span className="font-medium text-text-primary">{backup.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <SuperadminBadge variant={backup.type === 'auto' ? 'default' : 'default'}>
                          {backup.type === 'auto' ? <RefreshCw size={12} className="mr-1 inline" /> : <User size={12} className="mr-1 inline" />} {backup.type === 'auto' ? 'Auto' : 'Manual'}
                        </SuperadminBadge>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs text-text-secondary">{backup.size}</td>
                      <td className="py-3 pr-4 text-text-secondary text-xs">{backup.createdAt}</td>
                      <td className="py-3 pr-4">
                        <SuperadminBadge variant={cfg.variant}>
                          <Icon size={10} className={`mr-1 ${backup.status === 'in-progress' ? 'animate-spin' : ''}`} />
                          {cfg.label}
                        </SuperadminBadge>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-wrap gap-1">
                          {backup.modules.slice(0, 3).map(( m: string ) => (
                            <span key={m} className="text-xs px-1.5 py-0.5 rounded bg-bg-pageg-input text-text-secondary">{m}</span>
                          ))}
                          {backup.modules.length > 3 && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-bg-pageg-input text-text-secondary">+{backup.modules.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {backup.status === 'success' && (
                            <SuperadminButton
                              id={`download-backup-${backup.id}`}
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(backup.id)}
                              disabled={downloading === backup.id}
                            >
                              {downloading === backup.id
                                ? <Loader2 size={12} className="animate-spin" />
                                : <Download size={12} />}
                            </SuperadminButton>
                          )}
                          <SuperadminButton
                            id={`delete-backup-${backup.id}`}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBackup(backup.id)}
                            className="text-danger hover:bg-danger-bg/50"
                          >
                            <Trash2 size={16} />
                          </SuperadminButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
          </div>
        </CardContent>
      </SuperadminCard>
    </div>
  );
}
