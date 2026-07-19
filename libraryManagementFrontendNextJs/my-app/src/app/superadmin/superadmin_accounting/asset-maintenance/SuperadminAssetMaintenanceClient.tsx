'use client';
// RESPONSIBILITY: Main client page orchestrating asset maintenance logs, filter state, and new maintenance requests.
// DATA FLOW: useSuperadminAssetMaintenance -> SuperadminAssetMaintenanceClient -> Table / AddDialog

import React, { useState } from 'react';
import type { SuperadminMaintenanceLog } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_types/SuperadminAssetMaintenanceTypes';
import { useSuperadminAssetMaintenance as useSuperadminAssetMaintenance } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_hooks/useSuperadminAssetMaintenance';
import { SuperadminAssetMaintenanceHeader } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_components/SuperadminAssetMaintenanceHeader';
import { SuperadminAssetMaintenanceKpiGrid } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_components/SuperadminAssetMaintenanceKpiGrid';
import { SuperadminAssetMaintenanceFilterBar } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_components/SuperadminAssetMaintenanceFilterBar';
import { SuperadminAssetMaintenanceTable } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_components/SuperadminAssetMaintenanceTable';
import { SuperadminAssetMaintenanceAddDialog } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_components/SuperadminAssetMaintenanceAddDialog';

export function SuperadminAssetMaintenanceClient() {
  const { 
    visibleLogs, 
    statusFilter, 
    setStatusFilter, 
    pendingCount, 
    inProgressCount, 
    completedCount, 
    totalCost, 
    handleCompleteLog, 
    handleAddLog 
  } = useSuperadminAssetMaintenance();

  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const onSaveLog = async (logData: unknown) => {
    // @ts-ignore
    await handleAddLog(logData);
    showToast('âœ… Maintenance request logged successfully');
  };

  const onComplete = async (id: number) => {
    await handleCompleteLog(id);
    showToast('âœ… Maintenance marked as completed');
  };

  return (
    <div className="relative p-2 sm:p-4">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-card border border-border shadow-xl rounded-md px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-semibold text-text-primary">{toast}</span>
        </div>
      )}

      {showAdd && (
        <SuperadminAssetMaintenanceAddDialog 
          onClose={() => setShowAdd(false)} 
          onSave={onSaveLog} 
        />
      )}

      <SuperadminAssetMaintenanceHeader onAddClick={() => setShowAdd(true)} />
      
      <SuperadminAssetMaintenanceKpiGrid 
        pendingCount={pendingCount} 
        inProgressCount={inProgressCount} 
        completedCount={completedCount} 
        totalCost={totalCost} 
      />
      
      <SuperadminAssetMaintenanceFilterBar 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter} 
      />
      
      <SuperadminAssetMaintenanceTable 
        logs={visibleLogs} 
        onComplete={onComplete}
      />
    </div>
  );
}
