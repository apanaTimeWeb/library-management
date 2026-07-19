export const SUPERADMIN_PAYMENTS_MODE_BADGES: Record<string, string> = {
  cash: 'bg-pay-cash-bg text-pay-cash border border-pay-cash-bg/20',
  upi:  'bg-pay-upi-bg text-pay-upi border border-pay-upi-bg/20',
  card: 'bg-pay-card-bg text-pay-card border border-pay-card-bg/20',
  bank: 'bg-pay-bank-bg text-pay-bank border border-pay-bank-bg/20',
};

export const SUPERADMIN_PAYMENTS_MODE_OPTIONS = [
  { label: 'All Modes', value: 'all' },
  { label: 'Cash', value: 'cash' },
  { label: 'UPI', value: 'upi' },
  { label: 'Card', value: 'card' },
  { label: 'Bank Transfer', value: 'bank' }
];
