import { useState, useCallback } from 'react';
import { SUPERADMIN_SYSTEM_MOCK_SMART_IDS_ACTIVE } from '@/app/superadmin/superadmin_system/superadmin_system_data/SuperadminSystemMockData';

export function useSuperadminSystemSmartId() {
  const [confirmed, setConfirmed] = useState(false);
  const [regenerated, setRegenerated] = useState(false);

  const activeIds = SUPERADMIN_SYSTEM_MOCK_SMART_IDS_ACTIVE;
  const allIds = Array.from({ length: 20 }, (_, i) => i + 1);
  const gapIds = allIds.filter(id => !activeIds.includes(id));

  const handleRegenerate = useCallback(() => {
    setRegenerated(true);
    setConfirmed(false);
  }, []);

  return {
    confirmed,
    setConfirmed,
    regenerated,
    handleRegenerate,
    activeIds,
    allIds,
    gapIds
  };
}
