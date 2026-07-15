import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../../../core/entities/student.entity';
import { Payment } from '../../../../core/entities/payment.entity';
import { Seat } from '../../../../core/entities/seat.entity';

// Micro-Services
import { DashboardService } from './services/dashboard.service';
import { ReportsService } from './services/reports.service';
import { AuditLogsService } from './services/audit-logs.service';
import { BlacklistService } from './services/blacklist.service';
import { BranchesService } from './services/branches.service';
import { CouponsService } from './services/coupons.service';
import { ExpenseCategoriesService } from './services/expense-categories.service';
import { ExpensesService } from './services/expenses.service';
import { PermissionsService } from './services/permissions.service';
import { PlansService } from './services/plans.service';
import { StaffUsersService } from './services/staff-users.service';
import { StudentsService } from './services/students.service';

// Micro-Controllers
import { DashboardController } from './controllers/dashboard.controller';
import { ReportsController } from './controllers/reports.controller';
import { AuditLogsController } from './controllers/audit-logs.controller';
import { BlacklistController } from './controllers/blacklist.controller';
import { BranchesController } from './controllers/branches.controller';
import { CouponsController } from './controllers/coupons.controller';
import { ExpenseCategoriesController } from './controllers/expense-categories.controller';
import { ExpensesController } from './controllers/expenses.controller';
import { PermissionsController } from './controllers/permissions.controller';
import { PlansController } from './controllers/plans.controller';
import { StaffUsersController } from './controllers/staff-users.controller';
import { StudentsController } from './controllers/students.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Payment, Seat]),
  ],
  providers: [
    DashboardService, ReportsService, AuditLogsService, BlacklistService, BranchesService,
    CouponsService, ExpenseCategoriesService, ExpensesService, PermissionsService, PlansService,
    StaffUsersService, StudentsService
  ],
  controllers: [
    DashboardController, ReportsController, AuditLogsController, BlacklistController, BranchesController,
    CouponsController, ExpenseCategoriesController, ExpensesController, PermissionsController, PlansController,
    StaffUsersController, StudentsController
  ],
})
export class AdminModule {}
