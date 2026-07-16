'use client';
import React, { useState } from 'react';
import { useSuperadminAssets } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_hooks/useSuperadminAssets';
import { SuperadminAssetsHeader } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_components/SuperadminAssetsHeader';
import { SuperadminAssetsKpiGrid } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_components/SuperadminAssetsKpiGrid';
import { SuperadminAssetsFilterBar } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_components/SuperadminAssetsFilterBar';
import { SuperadminAssetsTable } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_components/SuperadminAssetsTable';
import { SuperadminAssetsAddDialog } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_components/SuperadminAssetsAddDialog';

export function SuperadminAssetsClient() {
  const { 
    assets, 
    visibleAssets, 
    categories, 
    catFilter, 
    setCatFilter, 
    totalValue, 
    maintenanceCount, 
    disposedCount, 
    handleAddAsset 
  } = useSuperadminAssets();

  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const onSaveAsset = async (assetData: any) => {
    await handleAddAsset(assetData);
    showToast('✅ Asset added successfully');
  };

  return (
    <div className="relative p-2 sm:p-4">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-bg-card border border-border shadow-xl rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-semibold text-text-primary">{toast}</span>
        </div>
      )}

      {showAdd && (
        <SuperadminAssetsAddDialog 
          categories={categories} 
          onClose={() => setShowAdd(false)} 
          onSave={onSaveAsset} 
        />
      )}

      <SuperadminAssetsHeader onAddClick={() => setShowAdd(true)} />
      
      <SuperadminAssetsKpiGrid 
        totalAssets={assets.length} 
        totalValue={totalValue} 
        maintenanceCount={maintenanceCount} 
        disposedCount={disposedCount} 
      />
      
      <SuperadminAssetsFilterBar 
        categories={categories} 
        catFilter={catFilter} 
        setCatFilter={setCatFilter} 
      />
      
      <SuperadminAssetsTable assets={visibleAssets} />
    </div>
  );
}
