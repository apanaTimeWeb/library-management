'use client';
import React, { useState } from 'react';
import { useSuperadminAssetMaintenance } from './superadmin_asset_maintenance_hooks/useSuperadminAssetMaintenance';
import { SuperadminAssetMaintenanceHeader } from './superadmin_asset_maintenance_components/SuperadminAssetMaintenanceHeader';
import { SuperadminAssetMaintenanceKpiGrid } from './superadmin_asset_maintenance_components/SuperadminAssetMaintenanceKpiGrid';
import { SuperadminAssetMaintenanceFilterBar } from './superadmin_asset_maintenance_components/SuperadminAssetMaintenanceFilterBar';
import { SuperadminAssetMaintenanceTable } from './superadmin_asset_maintenance_components/SuperadminAssetMaintenanceTable';
import { SuperadminAssetMaintenanceAddDialog } from './superadmin_asset_maintenance_components/SuperadminAssetMaintenanceAddDialog';

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

  const onSaveLog = async (logData: any) => {
    await handleAddLog(logData);
    showToast('✅ Maintenance request logged successfully');
  };

  const onComplete = async (id: number) => {
    await handleCompleteLog(id);
    showToast('✅ Maintenance marked as completed');
  };

  return (
    <div className="relative p-2 sm:p-4">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-[var(--bg-card)] border border-[var(--border)] shadow-xl rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-semibold text-[var(--text-primary)]">{toast}</span>
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
