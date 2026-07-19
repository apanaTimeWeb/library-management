// RESPONSIBILITY: Renders or handles logic for PublicLandingConstants.ts.
import { PublicFeatureItem, PublicFAQItem } from "@/app/public/public_types/PublicLanding_types";

export const PUBLIC_FEATURES: PublicFeatureItem[] = [
  {
    title: 'Seat Booking & Matrix',
    description: 'Visual seat map. Students can choose their own seat. Booked, free, and reserved seats all at a glance.',
    iconName: 'LayoutGrid',
  },
  {
    title: 'Fee Collection & Receipt',
    description: 'Monthly, quarterly, half-yearly plans. Track cash or online. Instant WhatsApp receipts.',
    iconName: 'CreditCard',
  },
  {
    title: 'WhatsApp Alerts',
    description: 'Fee due, seat expiry, and attendance â€” automatic WhatsApp alerts. No manual reminders needed.',
    iconName: 'Bell',
  },
  {
    title: 'Access Control (RFID)',
    description: 'Scan ID card to enter. Biometric and RFID integration for seamless access management.',
    iconName: 'IdCard',
  },
  {
    title: 'Multi-Shift Management',
    description: 'Manage Morning, Afternoon, Evening, and Night shifts independently with distinct fee structures.',
    iconName: 'Clock',
  },
  {
    title: 'Complaint & Notice Board',
    description: 'Students can raise issues directly from their app. Broadcast notices to all active members instantly.',
    iconName: 'MessageCircle',
  }
];

export const PUBLIC_FAQS: PublicFAQItem[] = [
  {
    question: 'Can I manage multiple shifts?',
    answer: 'Yes! Smart Library 360 supports unlimited shifts. You can set different seat matrices and fee structures for Morning, Afternoon, Evening, and Night.',
  },
  {
    question: 'How do WhatsApp alerts work?',
    answer: 'The system automatically triggers WhatsApp messages for fee dues, seat expiries, and attendance anomalies. No manual intervention required.',
  },
  {
    question: 'Can I print Student ID cards directly?',
    answer: 'Absolutely. Generate professional ID cards with photos, seat numbers, validity dates, and QR codes in a single click.',
  },
  {
    question: 'What happens if a student misses their fee payment?',
    answer: 'The system sends automatic reminders 3 days before, 1 day before, and on the due date. If left unpaid, the seat is automatically soft-blocked.',
  },
  {
    question: 'Is this software cloud-based?',
    answer: 'Yes! You can manage your library from anywhere using your mobile phone or laptop. All data is securely stored in the cloud.',
  },
];

