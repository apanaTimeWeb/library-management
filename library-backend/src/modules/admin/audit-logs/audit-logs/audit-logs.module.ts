import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from '@/core/entities/audit-log.entity';

import { GetAllAuditLogsController } from './controllers/get-all-audit-logs.controller';
import { GetAllAuditLogsService } from './services/get-all-audit-logs.service';
import { CreateAuditLogService } from './services/create-audit-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  controllers: [GetAllAuditLogsController],
  providers: [GetAllAuditLogsService, CreateAuditLogService],
  exports: [CreateAuditLogService], // Export so other modules can call createAuditLogService.execute()
})
export class AuditLogsAdminModule {}
