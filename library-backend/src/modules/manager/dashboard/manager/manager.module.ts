import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';
import { Seat } from '@/core/entities/seat.entity';
import { Subscription } from '@/core/entities/subscription.entity';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { Complaint } from '@/core/entities/complaint.entity';
import { AuthModule } from '@/modules/auth/auth.module';

// Micro-Services
import { ManagerDashboardService } from '@/modules/manager/dashboard/manager/services/manager-dashboard.service';
import { DashboardReportsService } from '@/modules/manager/reports/dashboard/services/dashboard-reports.service';
import { DashboardStudentReportsService } from '@/modules/manager/student-reports/dashboard/services/dashboard-student-reports.service';

// Micro-Controllers
import { ManagerDashboardController } from '@/modules/manager/dashboard/manager/controllers/manager-dashboard.controller';
import { DashboardReportsController } from '@/modules/manager/reports/dashboard/controllers/dashboard-reports.controller';
import { DashboardStudentReportsController } from '@/modules/manager/student-reports/dashboard/controllers/dashboard-student-reports.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Seat, Subscription, Enquiry, Complaint]),
    AuthModule,
  ],
  providers: [ManagerDashboardService, DashboardReportsService, DashboardStudentReportsService],
  controllers: [
    ManagerDashboardController,
    DashboardReportsController,
    DashboardStudentReportsController,
  ],
})
export class ManagerModule {}
