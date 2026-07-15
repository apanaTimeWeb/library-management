import { Module } from '@nestjs/common';
import { ManagerStudentReportsController } from './student-reports.controller';
import { ManagerStudentReportsService } from './student-reports.service';

@Module({
  controllers: [ManagerStudentReportsController],
  providers: [ManagerStudentReportsService],
})
export class ManagerStudentReportsModule {}
