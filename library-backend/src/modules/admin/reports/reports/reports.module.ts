import { Module } from '@nestjs/common';
import { ReportsAdminController } from './reports.controller';
import { ReportsAdminService } from './reports.service';

@Module({
  controllers: [ReportsAdminController],
  providers: [ReportsAdminService],
})
export class ReportsAdminModule {}
