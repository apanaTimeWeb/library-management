import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminSystemWhatsappProvider {
  id: string;
  label: string;
  requiresSecret: boolean;
}
export interface SuperadminSystemWhatsappLog {
  id: string;
  to: string;
  type: string;
  status: SuperadminSystemWhatsappLogStatus;
  sentAt: string;
  template: string;
}
export type SuperadminSystemWhatsappTestStatus = 'idle' | 'testing' | 'success' | 'error';
export type SuperadminSystemWhatsappLogStatus = 'delivered' | 'failed' | 'pending';
