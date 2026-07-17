import { useState } from 'react';
import { ADMIN_SYSTEM_MOCK_SEAT_GAPS } from '@/app/admin/admin_system/admin_system_data/AdminSystemMockData';

export function useAdminSystemGapFilling() {
  const [analyzed, setAnalyzed] = useState(false);
  const [fromDate, setFromDate] = useState('2026-04-11');
  const [toDate, setToDate] = useState('2026-04-18');
  const [shift, setShift] = useState('all');
  const [assigned, setAssigned] = useState<string[]>([]);

  return {
    analyzed, setAnalyzed,
    fromDate, setFromDate,
    toDate, setToDate,
    shift, setShift,
    assigned, setAssigned,
    gaps: ADMIN_SYSTEM_MOCK_SEAT_GAPS
  };
}
