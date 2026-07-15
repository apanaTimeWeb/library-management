import { Module } from '@nestjs/common';
import { ManagerStudentDashboardController } from './student-dashboard.controller';
import { ManagerStudentDashboardService } from './student-dashboard.service';

@Module({
  controllers: [ManagerStudentDashboardController],
  providers: [ManagerStudentDashboardService],
})
export class ManagerStudentDashboardModule {}
