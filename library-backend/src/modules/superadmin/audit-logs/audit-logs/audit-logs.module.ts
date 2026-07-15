import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminAuditLogsService } from './audit-logs.service';
import { SuperadminAuditLogsController } from './audit-logs.controller';
import { AuditLog } from '@/core/entities/audit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  providers: [SuperadminAuditLogsService],
  controllers: [SuperadminAuditLogsController],
  exports: [SuperadminAuditLogsService], // Export so other modules can call auditLogsService.log()
})
export class SuperadminAuditLogsModule {}
