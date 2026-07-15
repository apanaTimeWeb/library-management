import { Module } from '@nestjs/common';
import { AdminReportsController } from './reports.controller';
import { AdminReportsService } from './reports.service';

@Module({
  controllers: [AdminReportsController],
  providers: [AdminReportsService],
})
export class AdminReportsModule {}
