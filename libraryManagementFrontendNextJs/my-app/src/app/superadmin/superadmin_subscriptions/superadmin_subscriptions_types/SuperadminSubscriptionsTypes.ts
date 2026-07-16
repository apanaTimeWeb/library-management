export interface SuperadminSubscription {
  id: string;
  tenant: string;
  plan: string;
  cycle: string;
  nextInvoice: string;
  status: 'Paid' | 'Due Soon' | 'Overdue';
  mrr: number;
  seats: number;
  startDate: string;
}

export interface SuperadminSubscriptionKpi {
  label: string;
  val: string;
  icon: string;
  colorType: 'primary' | 'success' | 'warning' | 'danger';
  trend: string;
  trendType?: 'success' | 'warning' | 'danger';
}
