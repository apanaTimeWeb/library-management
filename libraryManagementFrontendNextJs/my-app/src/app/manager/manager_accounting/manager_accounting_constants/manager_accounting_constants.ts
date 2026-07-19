import {
  ManagerAccountingExpense,
  ManagerAccountingDailySettlement,
  ManagerAccountingSeatGap,
  ManagerAccountingAsset,
  ManagerAccountingAssetMaintenance,
  ManagerAccountingStats
} from '@/app/manager/manager_accounting/manager_accounting_types/manager_accounting_types';

export const ACCOUNTING_STATS_MOCK: ManagerAccountingStats = {
  monthlyExpenses: 45000,
  dailySettlementDiff: -150,
  totalAssetsValue: 850000,
  pendingMaintenance: 3
};

export const EXPENSES_MOCK: ManagerAccountingExpense[] = [
  { id: '1', expenseId: 'EXP-101', date: '2024-10-25', category: 'Operations', description: 'Office Stationery', amount: 1500, submittedBy: 'Ravi Manager', status: 'Approved' },
  { id: '2', expenseId: 'EXP-102', date: '2024-10-26', category: 'Utilities', description: 'Electricity Bill', amount: 12500, submittedBy: 'Ravi Manager', status: 'Paid' },
  { id: '3', expenseId: 'EXP-103', date: '2024-10-27', category: 'Maintenance', description: 'AC Repair', amount: 3500, submittedBy: 'Admin', status: 'Pending' },
];

export const DAILY_SETTLEMENTS_MOCK: ManagerAccountingDailySettlement[] = [
  { id: '1', date: '2024-10-28', systemExpected: 15400, actualCash: 5000, actualUpi: 10400, actualCard: 0, totalActual: 15400, difference: 0, status: 'Matched', notes: 'All good' },
  { id: '2', date: '2024-10-27', systemExpected: 22000, actualCash: 11000, actualUpi: 10850, actualCard: 0, totalActual: 21850, difference: -150, status: 'Discrepancy', notes: 'Shortfall in cash drawer' },
];

export const SEAT_GAPS_MOCK: ManagerAccountingSeatGap[] = [
  { id: '1', date: '2024-10-28', shiftName: 'Morning Standard', totalSeats: 50, occupiedSeats: 45, emptySeats: 5, potentialLostRevenue: 2500 },
  { id: '2', date: '2024-10-28', shiftName: 'Evening Premium', totalSeats: 50, occupiedSeats: 30, emptySeats: 20, potentialLostRevenue: 10000 },
];

export const ASSETS_MOCK: ManagerAccountingAsset[] = [
  { id: '1', assetId: 'AST-AC-01', name: 'Daikin 1.5 Ton AC', category: 'Appliance', purchaseDate: '2023-01-15', purchaseValue: 45000, condition: 'Good', location: 'Hall A' },
  { id: '2', assetId: 'AST-CH-12', name: 'Ergonomic Chair', category: 'Furniture', purchaseDate: '2023-05-20', purchaseValue: 4500, condition: 'Needs Repair', location: 'Seat A12' },
  { id: '3', assetId: 'AST-INV-01', name: 'Luminous Inverter 2KVA', category: 'Electronics', purchaseDate: '2022-11-10', purchaseValue: 25000, condition: 'Excellent', location: 'Server Room' },
];

export const ASSET_MAINTENANCE_MOCK: ManagerAccountingAssetMaintenance[] = [
  { id: '1', assetName: 'Daikin 1.5 Ton AC', assetId: 'AST-AC-01', taskDescription: 'Quarterly Filter Cleaning & Gas Check', scheduledDate: '2024-11-05', estimatedCost: 1500, status: 'Scheduled', assignedTo: 'CoolCare Services' },
  { id: '2', assetName: 'Ergonomic Chair', assetId: 'AST-CH-12', taskDescription: 'Wheel replacement', scheduledDate: '2024-10-29', estimatedCost: 500, status: 'In Progress', assignedTo: 'Local Carpenter' },
  { id: '3', assetName: 'Water Purifier', assetId: 'AST-WP-01', taskDescription: 'Filter change', scheduledDate: '2024-10-15', estimatedCost: 2000, status: 'Overdue', assignedTo: 'Kent Service' },
];

export const ACCOUNTING_STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-warning-bg text-warning',
  Approved: 'bg-info/10 text-info',
  Paid: 'bg-success-bg text-success',
  Rejected: 'bg-danger-bg text-danger',
  Matched: 'bg-success-bg text-success',
  Discrepancy: 'bg-danger-bg text-danger',
  'Pending Review': 'bg-warning-bg text-warning',
  Excellent: 'bg-success-bg text-success',
  Good: 'bg-info/10 text-info',
  'Needs Repair': 'bg-warning-bg text-warning',
  Broken: 'bg-danger-bg text-danger',
  Scheduled: 'bg-info/10 text-info',
  'In Progress': 'bg-warning-bg text-warning',
  Completed: 'bg-success-bg text-success',
  Overdue: 'bg-danger-bg text-danger',
};
