export type SuperadminAuditLogAction = 'Created' | 'Updated' | 'Deleted' | 'Fee_Collected' | string;

export interface SuperadminAuditLog {
  id: string;
  time: string;
  user: string;
  entity: string;
  target: string;
  action: SuperadminAuditLogAction;
  ip: string;
  detail: string;
}
