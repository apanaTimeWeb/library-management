import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';
import { Payment } from '@/core/entities/payment.entity';
import { Seat } from '@/core/entities/seat.entity';

// Micro-Services
import { AdminDashboardService } from './services/admin-dashboard.service';
import { DashboardReportsService } from '@/modules/admin/reports/dashboard/services/dashboard-reports.service';
import { DashboardAuditLogsService } from '@/modules/admin/audit-logs/dashboard/services/dashboard-audit-logs.service';
import { DashboardBlacklistService } from '@/modules/admin/blacklist/dashboard/services/dashboard-blacklist.service';
import { DashboardBranchesService } from '@/modules/admin/branches/dashboard/services/dashboard-branches.service';
import { DashboardCouponsService } from '@/modules/admin/coupons/dashboard/services/dashboard-coupons.service';
import { DashboardExpenseCategoriesService } from '@/modules/admin/expense-categories/dashboard/services/dashboard-expense-categories.service';
import { DashboardExpensesService } from '@/modules/admin/expenses/dashboard/services/dashboard-expenses.service';
import { DashboardPermissionsService } from '@/modules/admin/permissions/dashboard/services/dashboard-permissions.service';
import { DashboardPlansService } from '@/modules/admin/plans/dashboard/services/dashboard-plans.service';
import { DashboardStaffUsersService } from '@/modules/admin/staff-users/dashboard/services/dashboard-staff-users.service';
import { DashboardStudentsService } from '@/modules/admin/students/dashboard/services/dashboard-students.service';

// Micro-Controllers
import { AdminDashboardController } from './controllers/admin-dashboard.controller';
import { DashboardReportsController } from '@/modules/admin/reports/dashboard/controllers/dashboard-reports.controller';
import { DashboardAuditLogsController } from '@/modules/admin/audit-logs/dashboard/controllers/dashboard-audit-logs.controller';
import { DashboardBlacklistController } from '@/modules/admin/blacklist/dashboard/controllers/dashboard-blacklist.controller';
import { DashboardBranchesController } from '@/modules/admin/branches/dashboard/controllers/dashboard-branches.controller';
import { DashboardCouponsController } from '@/modules/admin/coupons/dashboard/controllers/dashboard-coupons.controller';
import { DashboardExpenseCategoriesController } from '@/modules/admin/expense-categories/dashboard/controllers/dashboard-expense-categories.controller';
import { DashboardExpensesController } from '@/modules/admin/expenses/dashboard/controllers/dashboard-expenses.controller';
import { DashboardPermissionsController } from '@/modules/admin/permissions/dashboard/controllers/dashboard-permissions.controller';
import { DashboardPlansController } from '@/modules/admin/plans/dashboard/controllers/dashboard-plans.controller';
import { DashboardStaffUsersController } from '@/modules/admin/staff-users/dashboard/controllers/dashboard-staff-users.controller';
import { DashboardStudentsController } from '@/modules/admin/students/dashboard/controllers/dashboard-students.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Payment, Seat])],
  providers: [AdminDashboardService, DashboardReportsService, DashboardAuditLogsService, DashboardBlacklistService, DashboardBranchesService, DashboardCouponsService, DashboardExpenseCategoriesService, DashboardExpensesService, DashboardPermissionsService, DashboardPlansService, DashboardStaffUsersService, DashboardStudentsService, ],
  controllers: [AdminDashboardController, DashboardReportsController, DashboardAuditLogsController, DashboardBlacklistController, DashboardBranchesController, DashboardCouponsController, DashboardExpenseCategoriesController, DashboardExpensesController, DashboardPermissionsController, DashboardPlansController, DashboardStaffUsersController, DashboardStudentsController, ],
})
export class AdminModule {}
