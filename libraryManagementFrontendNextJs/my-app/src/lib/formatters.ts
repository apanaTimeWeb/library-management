/**
 * RESPONSIBILITY: Centralized utility for formatting numbers, currencies, and percentages according to the Indian Numbering System.
 */

/**
 * Formats a number as INR currency (e.g., ₹1,23,456.00).
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats large numbers using abbreviations (e.g., ₹12.4L, ₹2.3Cr).
 */
export function formatLargeCurrency(amount: number): string {
  if (isNaN(amount)) return '₹0';
  const isNegative = amount < 0;
  const absAmt = Math.abs(amount);
  const prefix = isNegative ? '-₹' : '₹';

  if (absAmt >= 10000000) {
    return `${prefix}${(absAmt / 10000000).toFixed(1)}Cr`;
  }
  if (absAmt >= 100000) {
    return `${prefix}${(absAmt / 100000).toFixed(1)}L`;
  }
  if (absAmt >= 1000) {
    return `${prefix}${(absAmt / 1000).toFixed(1)}K`;
  }
  
  return `${prefix}${absAmt}`;
}

/**
 * Formats a decimal as a percentage with exactly 1 decimal place (e.g., 12.5%).
 */
export function formatPercentage(value: number): string {
  if (isNaN(value)) return '0.0%';
  return `${value.toFixed(1)}%`;
}
