// RESPONSIBILITY: Utility functions for the Superadmin Libraries module.

/**
 * Masks a phone number for UI display.
 * E.g., +91 9876543210 -> +91 98****3210
 */
export function maskSuperadminLibraryPhone(phone: string): string {
  if (!phone || phone.length < 10) return phone;
  // Match the last 10 digits to mask the middle 4
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10) return phone;
  
  // A simplistic mask assuming format like "+91 9876543210" or "9876543210"
  // Keep the prefix and the last 4 digits, mask the middle.
  // Actually, standard masking: 98****3210
  const match = phone.match(/(\+?\d{1,3}\s?)?(\d{2})\d{4}(\d{4})/);
  if (match) {
    const prefix = match[1] || '';
    return `${prefix}${match[2]}****${match[3]}`;
  }
  return phone;
}
