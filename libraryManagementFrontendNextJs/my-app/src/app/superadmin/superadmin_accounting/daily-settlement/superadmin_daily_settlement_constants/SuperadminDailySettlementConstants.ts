// RESPONSIBILITY: Renders or handles logic for SuperadminDailySettlementConstants.ts.
import type { SuperadminDailySettlementEntry } from '@/app/superadmin/superadmin_accounting/daily-settlement/superadmin_daily_settlement_types/SuperadminDailySettlementTypes';

export const SUPERADMIN_DAILY_SETTLEMENT_MOCK_DATA: SuperadminDailySettlementEntry[] = [
  { id: 1, shift: 'Morning (6AMâ€“2PM)',   openingBalance: 2000, cashCollected: 4500, upiCollected: 3200, expenses: 800,  closingBalance: 5700, settledBy: 'Ravi Kumar',  status: 'settled' },
  { id: 2, shift: 'Afternoon (2PMâ€“9PM)', openingBalance: 5700, cashCollected: 3100, upiCollected: 2800, expenses: 400,  closingBalance: 8400, settledBy: 'Priya Singh', status: 'pending' },
  { id: 3, shift: 'Night (9PMâ€“6AM)',     openingBalance: 8400, cashCollected: 1200, upiCollected: 900,  expenses: 200,  closingBalance: 9400, settledBy: 'â€”',           status: 'pending' },
];

