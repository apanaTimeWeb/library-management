

export interface SuperadminSystemHealthMetric {
  label: string;
  sub: string;
  val: string;
  pct: number;
  colorKey: SuperadminSystemHealthColourKey;
}
export interface SuperadminSystemHealthGateway {
  n: string;
  st: string;
  dotColorKey: SuperadminSystemHealthColourKey;
}
export interface SuperadminSystemHealthDataResponse {
  infrastructure: SuperadminSystemHealthMetric[];
  databases: SuperadminSystemHealthMetric[];
  gateways: SuperadminSystemHealthGateway[];
}
export interface SuperadminSystemHealthMetricCardProps {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  metrics: SuperadminSystemHealthMetric[];
}
export interface SuperadminSystemHealthHeaderProps {
  lastRefresh: string;
  refreshing: boolean;
  onRefresh: () => void;
}
export interface SuperadminSystemHealthGatewaysCardProps {
  gateways: SuperadminSystemHealthGateway[];
}
export interface SuperadminSystemHealthClientProps {
  initialData: SuperadminSystemHealthDataResponse;
}
export type SuperadminSystemHealthColourKey = 'success' | 'info' | 'warning' | 'danger';
