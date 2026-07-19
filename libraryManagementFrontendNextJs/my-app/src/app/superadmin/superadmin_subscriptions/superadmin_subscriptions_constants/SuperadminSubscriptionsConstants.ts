// RESPONSIBILITY: Renders or handles logic for SuperadminSubscriptionsConstants.ts.
import type { SuperadminSubscription, SuperadminSubscriptionKpi } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_types/SuperadminSubscriptionsTypes';

export const SUPERADMIN_SUBSCRIPTIONS_PLANS = ['Basic (Monthly)', 'Pro (Monthly)', 'Enterprise (Annual)'];

export const SUPERADMIN_SUBSCRIPTIONS_MOCK_DATA: SuperadminSubscription[] = [
  { id: '1', tenant: 'The Alexandria Modern', plan: 'Enterprise (Annual)', cycle: 'Yearly',  nextInvoice: '12 Oct, 2026', status: 'Paid',     mrr: 15000, seats: 120, startDate: '12 Oct, 2025' },
  { id: '2', tenant: 'City Reading Hub',       plan: 'Pro (Monthly)',      cycle: 'Monthly', nextInvoice: '15 Apr, 2026', status: 'Due Soon', mrr: 2999,  seats: 80,  startDate: '15 Mar, 2025' },
  { id: '3', tenant: 'Scholar Spaces',         plan: 'Basic (Monthly)',    cycle: 'Monthly', nextInvoice: '01 Apr, 2026', status: 'Overdue',  mrr: 999,   seats: 150, startDate: '01 Jan, 2025' },
  { id: '4', tenant: 'Quiet Corner Lib',       plan: 'Basic (Monthly)',    cycle: 'Monthly', nextInvoice: '28 Apr, 2026', status: 'Paid',     mrr: 999,   seats: 40,  startDate: '28 Feb, 2025' },
  { id: '5', tenant: 'StudyNest Patna',        plan: 'Pro (Monthly)',      cycle: 'Monthly', nextInvoice: '10 May, 2026', status: 'Paid',     mrr: 2999,  seats: 120, startDate: '10 Jan, 2025' },
];

export const SUPERADMIN_SUBSCRIPTIONS_KPI: SuperadminSubscriptionKpi[] = [
  { label: 'Active Subscriptions',      val: '24',        icon: 'users',         colorType: 'primary', trend: '+3 this month',       trendType: 'success' },
  { label: 'Monthly Recurring Revenue', val: '₹1,42,500', icon: 'receipt_text',  colorType: 'success', trend: 'â†‘ 12% vs last month', trendType: 'success' },
  { label: 'Churn Rate',                val: '1.2%',       icon: 'trending_down', colorType: 'warning', trend: 'Healthy âœ“',          trendType: 'success' },
];

