import { useState, useMemo } from 'react';
import type { SuperadminAsset } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_types/SuperadminAssetsTypes';
import { SUPERADMIN_ASSETS_MOCK_DATA, SUPERADMIN_ASSETS_STATUS_STYLES } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_constants/SuperadminAssetsConstants';

// DATA FLOW: API → useSuperadminAssets.ts → SuperadminAssetsComponent
export function superadmin_useSuperadminAssets() {
  const [assets, setAssets] = useState<SuperadminAsset[]>(SUPERADMIN_ASSETS_MOCK_DATA);
  const [catFilter, setCatFilter] = useState('all');

  const categories = useMemo(() => {
    return Array.from(new Set(assets.map(a => a.category)));
  }, [assets]);

  const visibleAssets = useMemo(() => {
    return catFilter === 'all' ? assets : assets.filter(a => a.category === catFilter);
  }, [assets, catFilter]);

  const { totalValue, maintenanceCount, disposedCount } = useMemo(() => {
    return {
      totalValue: assets.filter(a => a.status !== 'disposed').reduce((s, a) => s + a.currentValue, 0),
      maintenanceCount: assets.filter(a => a.status === 'maintenance').length,
      disposedCount: assets.filter(a => a.status === 'disposed').length
    };
  }, [assets]);

  const handleAddAsset = async (newAsset: Omit<SuperadminAsset, 'id' | 'status' | 'currentValue'>) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));
    const asset: SuperadminAsset = {
      ...newAsset,
      id: Date.now(),
      status: 'active',
      currentValue: newAsset.purchaseValue
    };
    setAssets(prev => [asset, ...prev]);
  };

  return {
    assets,
    visibleAssets,
    categories,
    catFilter,
    setCatFilter,
    totalValue,
    maintenanceCount,
    disposedCount,
    handleAddAsset,
    statusStyles: SUPERADMIN_ASSETS_STATUS_STYLES
  };
}
