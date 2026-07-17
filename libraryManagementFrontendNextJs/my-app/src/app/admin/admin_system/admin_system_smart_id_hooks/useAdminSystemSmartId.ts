import { useState, useCallback } from 'react';
import { ADMIN_SYSTEM_SMART_ID_ACTIVE_IDS, ADMIN_SYSTEM_SMART_ID_FLOW_STEPS } from '@/app/admin/admin_system/admin_system_data/AdminSystemMockData2';

const ALL_IDS = Array.from({ length: 20 }, (_, i) => i + 1);
const GAP_IDS = ALL_IDS.filter(id => !ADMIN_SYSTEM_SMART_ID_ACTIVE_IDS.includes(id));

export function useAdminSystemSmartId() {
  const [confirmed, setConfirmed] = useState(false);
  const [regenerated, setRegenerated] = useState(false);

  const handleRegenerate = useCallback(() => {
    setRegenerated(true);
    setConfirmed(false);
  }, []);

  return {
    confirmed, setConfirmed,
    regenerated, handleRegenerate,
    activeIds: ADMIN_SYSTEM_SMART_ID_ACTIVE_IDS,
    flowSteps: ADMIN_SYSTEM_SMART_ID_FLOW_STEPS,
    allIds: ALL_IDS,
    gapIds: GAP_IDS
  };
}
