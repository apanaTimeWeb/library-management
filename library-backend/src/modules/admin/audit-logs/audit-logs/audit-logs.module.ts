import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from '@/core/entities/audit-log.entity';

import { AuditLogsGetAllController } from './controllers/audit-logs-get-all.controller';
import { AuditLogsGetAllService } from './services/audit-logs-get-all.service';
import { AuditLogsCreateService } from './services/audit-logs-create.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  controllers: [AuditLogsGetAllController],
  providers: [AuditLogsGetAllService, AuditLogsCreateService],
  exports: [AuditLogsCreateService],
})
export class AdminAuditLogsModule {}
