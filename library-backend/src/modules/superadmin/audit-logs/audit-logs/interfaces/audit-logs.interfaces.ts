export interface LogActionParams {
  entity: string;
  entityId: string;
  action: string;
  oldValues?: Record<string, any> | null;
  newValues?: Record<string, any> | null;
  performedById?: string;
  performedByName?: string;
  performedByRole?: string;
  tenantId?: string;
  branchId?: string;
  ipAddress?: string;
  userAgent?: string;
}
