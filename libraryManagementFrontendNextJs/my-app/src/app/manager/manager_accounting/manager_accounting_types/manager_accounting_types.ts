export type ExpenseCategory = 'Operations' | 'Marketing' | 'Maintenance' | 'Salaries' | 'Utilities' | 'Other';
export type ExpenseStatus = 'Pending' | 'Approved' | 'Paid' | 'Rejected';
export type SettlementStatus = 'Matched' | 'Discrepancy' | 'Pending Review';
export type AssetCondition = 'Excellent' | 'Good' | 'Needs Repair' | 'Broken';
export type MaintenanceStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue';

export interface ManagerAccountingExpense {
  id: string;
  expenseId: string;
  date: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  submittedBy: string;
  status: ExpenseStatus;
}

export interface ManagerAccountingDailySettlement {
  id: string;
  date: string;
  systemExpected: number;
  actualCash: number;
  actualUpi: number;
  actualCard: number;
  totalActual: number;
  difference: number;
  status: SettlementStatus;
  notes: string;
}

export interface ManagerAccountingSeatGap {
  id: string;
  date: string;
  shiftName: string;
  totalSeats: number;
  occupiedSeats: number;
  emptySeats: number;
  potentialLostRevenue: number;
}

export interface ManagerAccountingAsset {
  id: string;
  assetId: string;
  name: string;
  category: 'Furniture' | 'Electronics' | 'Appliance' | 'Other';
  purchaseDate: string;
  purchaseValue: number;
  condition: AssetCondition;
  location: string;
}

export interface ManagerAccountingAssetMaintenance {
  id: string;
  assetName: string;
  assetId: string;
  taskDescription: string;
  scheduledDate: string;
  estimatedCost: number;
  status: MaintenanceStatus;
  assignedTo: string;
}

export interface ManagerAccountingStats {
  monthlyExpenses: number;
  dailySettlementDiff: number;
  totalAssetsValue: number;
  pendingMaintenance: number;
}
