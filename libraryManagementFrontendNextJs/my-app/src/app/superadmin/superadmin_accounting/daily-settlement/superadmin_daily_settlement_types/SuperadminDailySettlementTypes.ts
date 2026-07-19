// RESPONSIBILITY: Renders or handles logic for SuperadminDailySettlementTypes.ts.


export interface SuperadminDailySettlementEntry {
  id: number;
  shift: string;
  openingBalance: number;
  cashCollected: number;
  upiCollected: number;
  expenses: number;
  closingBalance: number;
  settledBy: string;
  status: 'pending' | 'settled';
}

