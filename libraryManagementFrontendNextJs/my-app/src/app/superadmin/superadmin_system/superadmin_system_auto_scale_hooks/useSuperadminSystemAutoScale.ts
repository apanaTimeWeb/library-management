// RESPONSIBILITY: Renders or handles logic for useSuperadminSystemAutoScale.ts.
import { useState, useMemo } from 'react';

export function useSuperadminSystemAutoScale() {
  const [seatThreshold, setSeatThreshold] = useState(90);
  const [lockerThreshold, setLockerThreshold] = useState(85);
  const [alertEnabled, setAlertEnabled] = useState(true);

  const seatOccupancy = 94;
  const lockerOccupancy = 38;

  const seatRec = useMemo(() => {
    if (seatOccupancy > seatThreshold)
      return { color: 'danger' as const, msg: `🔴 System suggests adding more seats. Current utilization: ${seatOccupancy}%`, action: 'âž• Add Seats', link: '/seat-management' };
    if (seatOccupancy < 40)
      return { color: 'warning' as const, msg: `🟡 Low occupancy detected. Consider Power Saving mode.`, action: 'âš¡ Power Saving →', link: '/system/power-saving' };
    return { color: 'success' as const, msg: `🟢 Seat occupancy is healthy at ${seatOccupancy}%.`, action: null, link: null };
  }, [seatOccupancy, seatThreshold]);

  const lockerRec = useMemo(() => {
    if (lockerOccupancy < 40)
      return { color: 'warning' as const, msg: `🟡 Lockers have low usage (${lockerOccupancy}%). Consider offering locker promotions.`, action: null, link: null };
    if (lockerOccupancy > lockerThreshold)
      return { color: 'danger' as const, msg: `🔴 Locker capacity near limit. Consider adding locker units.`, action: 'âž• Manage Lockers', link: '/locker-matrix' };
    return { color: 'success' as const, msg: `🟢 Locker utilization looks good at ${lockerOccupancy}%.`, action: null, link: null };
  }, [lockerOccupancy, lockerThreshold]);

  return {
    seatThreshold,
    setSeatThreshold,
    lockerThreshold,
    setLockerThreshold,
    alertEnabled,
    setAlertEnabled,
    seatOccupancy,
    lockerOccupancy,
    seatRec,
    lockerRec
  };
}

