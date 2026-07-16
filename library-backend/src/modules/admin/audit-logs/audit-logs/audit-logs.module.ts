import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogsAdminService } from './audit-logs.service';
import { AuditLogsAdminController } from './audit-logs.controller';
import { AuditLog } from '@/core/entities/audit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  providers: [AuditLogsAdminService],
  controllers: [AuditLogsAdminController],
  exports: [AuditLogsAdminService], // Export so other modules can call auditLogsService.log()
})
export class AuditLogsAdminModule {}
