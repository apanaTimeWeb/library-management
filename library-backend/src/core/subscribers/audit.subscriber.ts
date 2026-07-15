import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { AuditLog } from '../entities/audit-log.entity';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  afterInsert(event: InsertEvent<any>) {
    if (event.entity && event.metadata.name !== 'AuditLog') {
      this.logAction(event, 'CREATE', null, event.entity);
    }
  }

  afterUpdate(event: UpdateEvent<any>) {
    if (event.entity && event.metadata.name !== 'AuditLog') {
      this.logAction(event, 'UPDATE', event.databaseEntity, event.entity);
    }
  }

  afterRemove(event: RemoveEvent<any>) {
    if (event.databaseEntity && event.metadata.name !== 'AuditLog') {
      this.logAction(event, 'DELETE', event.databaseEntity, null);
    }
  }

  afterSoftRemove(event: UpdateEvent<any>) {
    if (event.entity && event.metadata.name !== 'AuditLog') {
      this.logAction(event, 'SOFT_DELETE', event.databaseEntity, event.entity);
    }
  }

  private async logAction(
    event: any,
    action: string,
    oldValues: any,
    newValues: any,
  ) {
    try {
      const manager = event.manager;
      if (!manager) return;

      const entityName = event.metadata.name;
      const entityId =
        (newValues && newValues.id) || (oldValues && oldValues.id) || 'UNKNOWN';

      const log = new AuditLog();
      log.entity = entityName;
      log.entityId = entityId;
      log.action = action;
      log.oldValues = oldValues ? this.sanitize(oldValues) : null;
      log.newValues = newValues ? this.sanitize(newValues) : null;

      // In a real subscriber, capturing performedBy requires CLS (AsyncLocalStorage)
      // or passing user data to the repo.save() method via `{ data: { user } }`.
      const queryRunnerData = event.queryRunner?.data;
      if (queryRunnerData?.user) {
        log.performedById = queryRunnerData.user.id;
        log.performedByName = queryRunnerData.user.name;
        log.tenantId = queryRunnerData.user.tenantId;
        log.branchId = queryRunnerData.user.branch?.id;
      }

      await manager.save(AuditLog, log);
    } catch (e) {
      console.error('Failed to save audit log', e);
    }
  }

  private sanitize(obj: any): any {
    const copy = { ...obj };
    const sensitiveFields = [
      'password',
      'refreshTokenHash',
      'token',
      'refreshToken',
    ];
    for (const field of sensitiveFields) {
      if (field in copy) {
        copy[field] = '***';
      }
    }
    return copy;
  }
}
