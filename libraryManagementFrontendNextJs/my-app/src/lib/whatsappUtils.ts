// RESPONSIBILITY: Renders or handles logic for whatsappUtils.ts.


export interface StudentWhatsAppData {
  name: string;
  smartId: string;
  phone: string;
  parentPhone?: string;
  shift: string;
  seat: string;
  locker: string;
  plan: string;
  amountPaid: number;
  totalPayable: number;
  discount: number;
  paymentMode: string;
  transactionId?: string;
  joinDate: string;
  expiryDate: string;
  branch?: string;
}

export function calcExpiryDate(joinDate: Date, plan: string): Date {
  const d = new Date(joinDate);
  switch (plan) {
    case 'Monthly':     d.setMonth(d.getMonth() + 1);       break;
    case 'Quarterly':   d.setMonth(d.getMonth() + 3);       break;
    case 'Half-Yearly': d.setMonth(d.getMonth() + 6);       break;
    case 'Annual':      d.setFullYear(d.getFullYear() + 1); break;
    default:            d.setMonth(d.getMonth() + 1);       break;
  }
  return d;
}

export function formatDateIN(date: Date): string {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatCurrencyIN(amount: number): string {
  return `Rs.${amount.toLocaleString('en-IN')}`;
}

/**
 * ID Card WhatsApp message — mirrors the printed card layout exactly:
 * Header â†’ Profile â†’ Shift/Seat/Plan/Locker â†’ Validity â†’ Payment
 */
export function formatIdCardMessage(data: StudentWhatsAppData): string {
  const balance = data.totalPayable - data.amountPaid;
  const branch = data.branch ?? 'Main Branch';

  const lines: string[] = [
    `â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—`,
    `â•‘  ðŸ“š SMART LIBRARY 360 â•‘`,
    `â•‘  ðŸ› ${branch.padEnd(19)}â•‘`,
    `â•‘  ðŸªª  S T U D E N T   I D â•‘`,
    `â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•`,
    ``,
    `ðŸ‘¤ *${data.name}*`,
    `ðŸ†” Smart ID: *#${data.smartId}*`,
    `ðŸ“± ${data.phone}`,
    ``,
    `â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„`,
    `â° *Shift :* ${data.shift}`,
    `ðŸ’º *Seat  :* ${data.seat}`,
    `ðŸ“‹ *Plan  :* ${data.plan}`,
    `ðŸ” *Locker:* ${data.locker === 'None' ? 'Not Assigned' : data.locker}`,
    `â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„`,
    ``,
    `ðŸ“… *Valid From :* ${data.joinDate}`,
    `ðŸ“… *Expires On :* *${data.expiryDate}*`,
    ``,
    `â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„â”„`,
    `ðŸ’° Fees     : ${formatCurrencyIN(data.totalPayable)}`,
    data.discount > 0 ? `ðŸŽ Discount : -${formatCurrencyIN(data.discount)}` : '',
    `✅ Paid     : ${formatCurrencyIN(data.amountPaid)}`,
    `ðŸ’³ Mode     : ${data.paymentMode}`,
    data.transactionId ? `ðŸ§¾ Txn ID   : ${data.transactionId}` : '',
    balance > 0
      ? `⚠️ *Balance Due: ${formatCurrencyIN(balance)}*`
      : `✅ *Balance: CLEAR*`,
    ``,
    `â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—`,
    `â•‘  ✅ VERIFIED MEMBER   â•‘`,
    `â•‘  ðŸŽ“ Happy Studying!   â•‘`,
    `â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•`,
  ].filter(l => l !== null && l !== undefined);

  return lines.filter(l => l.trim() !== '' || lines.indexOf(l) % 3 === 0).join('\n');
}

/**
 * Dues reminder message — for students page action button
 */
export function formatDuesMessage(data: StudentWhatsAppData): string {
  const balance = data.totalPayable - data.amountPaid;
  const branch = data.branch ?? 'Main Branch';

  return [
    `â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”`,
    `ðŸ“š *SMART LIBRARY 360*`,
    `ðŸ“ ${branch}`,
    `â”â”â”â” FEE STATEMENT â”â”â”â”`,
    ``,
    `ðŸ‘¤ *Name:* ${data.name}`,
    `ðŸ†” *Smart ID:* ${data.smartId}`,
    `ðŸ“± *Phone:* ${data.phone}`,
    ``,
    `ðŸ“‹ Plan   : ${data.plan}`,
    `â° Shift  : ${data.shift}`,
    `ðŸ’º Seat   : ${data.seat}`,
    ``,
    `ðŸ’° Fees   : ${formatCurrencyIN(data.totalPayable)}`,
    data.discount > 0 ? `ðŸŽ Discount: -${formatCurrencyIN(data.discount)}` : '',
    `✅ Paid   : ${formatCurrencyIN(data.amountPaid)}`,
    ``,
    balance > 0
      ? `⚠️ *DUE AMOUNT: ${formatCurrencyIN(balance)}*\nPlease pay before *${data.expiryDate}*`
      : `✅ *All dues cleared. Thank you!*`,
    ``,
    `ðŸ“… Valid: ${data.joinDate} â†’ ${data.expiryDate}`,
    ``,
    `â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”`,
    `ðŸ“š Smart Library 360`,
    `â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”`,
  ].filter(Boolean).join('\n');
}

export function openWhatsApp(phone: string, message: string): void {
  const digits = phone.replace(/\D/g, '');
  const normalized = digits.startsWith('91') && digits.length === 12
    ? digits
    : `91${digits.slice(-10)}`;
  window.open(`https://wa.me/${normalized}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

