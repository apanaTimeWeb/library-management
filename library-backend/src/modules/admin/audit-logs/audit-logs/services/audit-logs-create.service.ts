import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '@/core/entities/audit-log.entity';
import { AuditLogsLogActionParams } from '../interfaces/audit-logs.interfaces';

@Injectable()
export class AuditLogsCreateService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepo: Repository<AuditLog>,
  ) {}

  /**
   * Log any significant action in the system.
   * Call this from services after performing the action.
   */
  async execute(params: AuditLogsLogActionParams): Promise<void> {
    try {
      // Sanitize old/new values — remove any sensitive fields before storing
      const sanitized = {
        oldValues: this.sanitize(params.oldValues),
        newValues: this.sanitize(params.newValues),
      };

      const browser = this.parseBrowser(params.userAgent);

      const log = this.auditLogRepo.create({
        entity: params.entity,
        entityId: params.entityId,
        action: params.action,
        oldValues: sanitized.oldValues,
        newValues: sanitized.newValues,
        performedById: params.performedById,
        performedByName: params.performedByName,
        performedByRole: params.performedByRole,
        tenantId: params.tenantId,
        branchId: params.branchId,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent ? params.userAgent.substring(0, 500) : null,
        browser,
      });

      await this.auditLogRepo.save(log);
    } catch (error: any) {
      // Audit log failure should NOT break the main operation
      console.error('Failed to write audit log:', error?.message);
    }
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  /** Remove sensitive fields from stored data */
  private sanitize(
    obj: Record<string, any> | null | undefined,
  ): Record<string, any> | null {
    if (!obj) return null;
    const SENSITIVE_KEYS = [
      'password', 'passwordHash', 'refreshToken', 'refreshTokenHash',
      'accessToken', 'token', 'otp', 'pin', 'secret', 'cvv', 'aadhaar', 'pan'
    ];
    const sanitized = { ...obj };
    for (const key of SENSITIVE_KEYS) {
      if (key in sanitized) {
        sanitized[key] = '[REDACTED]';
      }
    }
    return sanitized;
  }

  /** Parse browser name from user agent string */
  private parseBrowser(userAgent?: string): string {
    if (!userAgent) return 'Unknown';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    return 'Other';
  }
}
