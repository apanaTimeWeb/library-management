import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../../../core/entities/student.entity';
import { Seat } from '../../../../core/entities/seat.entity';
import { Subscription } from '../../../../core/entities/subscription.entity';
import { Enquiry } from '../../../../core/entities/enquiry.entity';
import { Complaint } from '../../../../core/entities/complaint.entity';
import { AuthAuthModule } from '../../../auth/auth/auth.module';

// Micro-Services
import { DashboardService } from './services/dashboard.service';
import { ReportsService } from './services/reports.service';
import { StudentReportsService } from './services/student-reports.service';

// Micro-Controllers
import { DashboardController } from './controllers/dashboard.controller';
import { ReportsController } from './controllers/reports.controller';
import { StudentReportsController } from './controllers/student-reports.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Seat, Subscription, Enquiry, Complaint]),
    AuthAuthModule,
  ],
  providers: [
    DashboardService,
    ReportsService,
    StudentReportsService,
  ],
  controllers: [
    DashboardController,
    ReportsController,
    StudentReportsController,
  ],
})
export class ManagerModule {}
