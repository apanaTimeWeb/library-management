import { Module } from '@nestjs/common';
import { SuperadminReportsController } from './reports.controller';
import { SuperadminReportsService } from './reports.service';

@Module({
  controllers: [SuperadminReportsController],
  providers: [SuperadminReportsService],
})
export class SuperadminReportsModule {}
