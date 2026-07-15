import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuditLogsService } from './audit-logs.service';
import { AdminAuditLogsController } from './audit-logs.controller';
import { AuditLog } from '../../../../core/entities/audit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  providers: [AdminAuditLogsService],
  controllers: [AdminAuditLogsController],
  exports: [AdminAuditLogsService], // Export so other modules can call auditLogsService.log()
})
export class AdminAuditLogsModule {}
