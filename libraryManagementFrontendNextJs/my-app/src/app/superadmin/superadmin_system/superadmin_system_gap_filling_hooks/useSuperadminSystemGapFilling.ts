// DATA FLOW: SuperadminSystemMockData -> useSuperadminSystemGapFilling -> SuperadminSystemGapFillingClient
import { useState, useCallback } from 'react';
import { SUPERADMIN_SYSTEM_MOCK_SEAT_GAPS } from '@/app/superadmin/superadmin_system/superadmin_system_data/SuperadminSystemMockData';
import { SuperadminSystemSeatGapRecord } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemGapFillingTypes';

/**
 * Custom hook to manage state and logic for the Gap Filling algorithm UI.
 */
export function useSuperadminSystemGapFilling() {
  const [analyzed, setAnalyzed] = useState(false);
  const [fromDate, setFromDate] = useState('2026-04-11');
  const [toDate, setToDate] = useState('2026-04-18');
  const [shift, setShift] = useState('all');
  const [assigned, setAssigned] = useState<string[]>([]);

  const runAnalysis = useCallback(() => {
    // In a real app, this would trigger an API call with fromDate, toDate, shift
    setAnalyzed(true);
  }, []);

  const assignSeat = useCallback((seatId: string) => {
    setAssigned(prev => [...prev, seatId]);
  }, []);

  return {
    analyzed,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    shift,
    setShift,
    assigned,
    runAnalysis,
    assignSeat,
    seatGaps: SUPERADMIN_SYSTEM_MOCK_SEAT_GAPS as SuperadminSystemSeatGapRecord[]
  };
}
