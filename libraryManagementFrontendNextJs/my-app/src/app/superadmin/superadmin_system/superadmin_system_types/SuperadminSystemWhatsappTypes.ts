// RESPONSIBILITY: Renders or handles logic for SuperadminSystemWhatsappTypes.ts.


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

