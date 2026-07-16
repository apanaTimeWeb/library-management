import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from '@/core/entities/audit-log.entity';

import { CreateAuditLogController } from './controllers/create-audit-log.controller';
import { UpdateAuditLogController } from './controllers/update-audit-log.controller';
import { DeleteAuditLogController } from './controllers/delete-audit-log.controller';
import { GetAllAuditLogsController } from './controllers/get-all-audit-logs.controller';
import { GetAuditLogController } from './controllers/get-audit-log.controller';

import { CreateAuditLogService } from './services/create-audit-log.service';
import { UpdateAuditLogService } from './services/update-audit-log.service';
import { DeleteAuditLogService } from './services/delete-audit-log.service';
import { GetAllAuditLogsService } from './services/get-all-audit-logs.service';
import { GetAuditLogService } from './services/get-audit-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  controllers: [
    CreateAuditLogController,
    UpdateAuditLogController,
    DeleteAuditLogController,
    GetAllAuditLogsController,
    GetAuditLogController,
  ],
  providers: [
    CreateAuditLogService,
    UpdateAuditLogService,
    DeleteAuditLogService,
    GetAllAuditLogsService,
    GetAuditLogService,
  ],
  exports: [GetAuditLogService],
})
export class SuperadminAuditLogsModule {}
