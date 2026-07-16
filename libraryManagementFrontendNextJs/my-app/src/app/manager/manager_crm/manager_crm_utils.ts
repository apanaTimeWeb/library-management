/**
 * Utility: mask phone number
 * Masks phone numbers to show only first two and last four digits.
 */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 6) return phone;
  return digits.slice(0, 2) + '****' + digits.slice(-4);
}

/**
 * Utility: get initials
 * Gets initials from a full name.
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
