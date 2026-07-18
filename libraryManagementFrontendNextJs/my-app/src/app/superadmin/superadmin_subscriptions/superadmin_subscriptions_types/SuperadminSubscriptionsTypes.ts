

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
export interface SuperadminSubscriptionsPanelProps {
  sub: SuperadminSubscription;
  onClose: () => void;
  onUpdate: (s: SuperadminSubscription) => Promise<void>;
  onRenew: (id: string) => Promise<void>;
}
export interface SuperadminSubscriptionsKpiGridProps {
  kpis: SuperadminSubscriptionKpi[];
}
export interface SuperadminSubscriptionsGridProps {
  subs: SuperadminSubscription[];
  filteredSubs: SuperadminSubscription[];
  filter: string;
  setFilter: (f: string) => void;
  onRowClick: (sub: SuperadminSubscription) => void;
}
