import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface Props {
  receiptData: SuperadminFinanceReceiptData;
  onClose: () => void;
}
const MODE_LABELS: Record<any, string> = { cash: 'Cash', upi: 'UPI', card: 'Card', bank: 'Bank Transfer' };
