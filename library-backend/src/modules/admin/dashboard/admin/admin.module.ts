import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';
import { Payment } from '@/core/entities/payment.entity';
import { Seat } from '@/core/entities/seat.entity';

// Micro-Services
import { DashboardService } from './services/dashboard.service';
import { ReportsService } from '@/modules/admin/reports/dashboard/services/reports.service';
import { AuditLogsService } from '@/modules/admin/audit-logs/dashboard/services/audit-logs.service';
import { BlacklistService } from '@/modules/admin/blacklist/dashboard/services/blacklist.service';
import { BranchesService } from '@/modules/admin/branches/dashboard/services/branches.service';
import { CouponsService } from '@/modules/admin/coupons/dashboard/services/coupons.service';
import { ExpenseCategoriesService } from '@/modules/admin/expense-categories/dashboard/services/expense-categories.service';
import { ExpensesService } from '@/modules/admin/expenses/dashboard/services/expenses.service';
import { PermissionsService } from '@/modules/admin/permissions/dashboard/services/permissions.service';
import { PlansService } from '@/modules/admin/plans/dashboard/services/plans.service';
import { StaffUsersService } from '@/modules/admin/staff-users/dashboard/services/staff-users.service';
import { StudentsService } from '@/modules/admin/students/dashboard/services/students.service';

// Micro-Controllers
import { DashboardController } from './controllers/dashboard.controller';
import { ReportsController } from '@/modules/admin/reports/dashboard/controllers/reports.controller';
import { AuditLogsController } from '@/modules/admin/audit-logs/dashboard/controllers/audit-logs.controller';
import { BlacklistController } from '@/modules/admin/blacklist/dashboard/controllers/blacklist.controller';
import { BranchesController } from '@/modules/admin/branches/dashboard/controllers/branches.controller';
import { CouponsController } from '@/modules/admin/coupons/dashboard/controllers/coupons.controller';
import { ExpenseCategoriesController } from '@/modules/admin/expense-categories/dashboard/controllers/expense-categories.controller';
import { ExpensesController } from '@/modules/admin/expenses/dashboard/controllers/expenses.controller';
import { PermissionsController } from '@/modules/admin/permissions/dashboard/controllers/permissions.controller';
import { PlansController } from '@/modules/admin/plans/dashboard/controllers/plans.controller';
import { StaffUsersController } from '@/modules/admin/staff-users/dashboard/controllers/staff-users.controller';
import { StudentsController } from '@/modules/admin/students/dashboard/controllers/students.controller';

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
