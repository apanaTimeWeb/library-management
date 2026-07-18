import React from 'react';


export interface SuperadminReportsRevenueExpense {
  month: string;
  Revenue: number;
  Expenses: number;
}
export interface SuperadminReportsRevenueTrend {
  month: string;
  Revenue: number;
}
export interface SuperadminReportsStudentGrowth {
  month: string;
  Joined: number;
  Exited: number;
}
export interface SuperadminReportsOccupancy {
  name: string;
  value: number;
}
export interface SuperadminReportsKpiCard {
  label: string;
  value: string;
  iconType: 'primary' | 'success' | 'warning' | 'danger';
  icon: string;
  trend: string;
  trendType: 'up' | 'down';
}
export interface SuperadminReportsDataResponse {
  revenueExpense: SuperadminReportsRevenueExpense[];
  revenueTrend: SuperadminReportsRevenueTrend[];
  studentGrowth: SuperadminReportsStudentGrowth[];
  occupancy: SuperadminReportsOccupancy[];
  kpiCards: SuperadminReportsKpiCard[];
}
export interface SuperadminReportsClientProps {
  initialData: SuperadminReportsDataResponse;
}
export interface SuperadminReportsHeaderProps {
  range: string;
  setRange: (r: string) => void;
}
export interface SuperadminReportsKpiGridProps {
  kpiCards: SuperadminReportsKpiCard[];
}
export interface SuperadminReportsChartsProps {
  data: SuperadminReportsDataResponse;
}
