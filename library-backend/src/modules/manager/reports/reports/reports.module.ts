import { Module } from '@nestjs/common';
import { ManagerReportsController } from './reports.controller';
import { ManagerReportsService } from './reports.service';

@Module({
  controllers: [ManagerReportsController],
  providers: [ManagerReportsService],
})
export class ManagerReportsModule {}
