// RESPONSIBILITY: Centralized constants and mock data for admin_plans (`Rule 3`, `Rule 35`).
// DATA FLOW: Constants -> Store, Hooks, and Components.

import { PlanRecord } from '@/app/admin/admin_plans/admin_plans_types/admin_plans_types';

export const PLAN_DEFAULT_FEATURES = ['Any single shift', 'Locker access', 'WiFi included', 'ID card'];

export const MOCK_PLANS: PlanRecord[] = [
  {
    id: 'P1', name: 'Monthly', price: 1000, duration: '1 Month', durationDays: 30,
    features: ['Any single shift', 'Locker access', 'WiFi included', 'ID card'],
    status: 'Active', subscribers: 420,
  },
  {
    id: 'P2', name: 'Quarterly', price: 2800, duration: '3 Months', durationDays: 90,
    features: ['Any single shift', 'Locker access', 'WiFi included', 'ID card', '7% discount'],
    status: 'Active', subscribers: 310,
  },
  {
    id: 'P3', name: 'Half-Yearly', price: 5200, duration: '6 Months', durationDays: 180,
    features: ['Any single shift', 'Locker access', 'WiFi included', 'ID card', '13% discount'],
    status: 'Active', subscribers: 180,
  },
  {
    id: 'P4', name: 'Annual', price: 9500, duration: '12 Months', durationDays: 365,
    features: ['Any single shift', 'Locker access', 'WiFi included', 'ID card', '21% discount', 'Priority seat'],
    status: 'Active', subscribers: 95,
  },
  {
    id: 'P5', name: 'Day Pass', price: 80, duration: '1 Day', durationDays: 1,
    features: ['Single day access', 'WiFi included'],
    status: 'Inactive', subscribers: 0,
  },
];
