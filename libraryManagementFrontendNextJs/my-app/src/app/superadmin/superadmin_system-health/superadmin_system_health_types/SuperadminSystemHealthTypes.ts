export type SuperadminSystemHealthColourKey = 'success' | 'info' | 'warning' | 'danger';

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
