export const PLAN_DEFAULT_FEATURES = ['Access to Study Room', 'High-speed Wi-Fi', 'Power Backup'];

export const MOCK_PLANS = [
  { id: 'PLAN-1', name: 'Monthly Basic', price: 1000, duration: '1 Month', durationDays: 30, features: PLAN_DEFAULT_FEATURES, status: 'Active' as const, subscribers: 150 },
  { id: 'PLAN-2', name: 'Quarterly Pro', price: 2500, duration: '3 Months', durationDays: 90, features: PLAN_DEFAULT_FEATURES, status: 'Active' as const, subscribers: 85 },
  { id: 'PLAN-3', name: 'Annual Premium', price: 9000, duration: '12 Months', durationDays: 365, features: PLAN_DEFAULT_FEATURES, status: 'Inactive' as const, subscribers: 12 },
];
