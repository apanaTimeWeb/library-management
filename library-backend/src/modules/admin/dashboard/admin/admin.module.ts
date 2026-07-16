import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';
import { Payment } from '@/core/entities/payment.entity';
import { Seat } from '@/core/entities/seat.entity';

// Micro-Services
import { AdminDashboardService } from './services/dashboard.service';
import { AdminReportsService } from '@/modules/admin/reports/dashboard/services/reports.service';
import { AdminAuditLogsService } from '@/modules/admin/audit-logs/dashboard/services/audit-logs.service';
import { AdminBlacklistService } from '@/modules/admin/blacklist/dashboard/services/blacklist.service';
import { AdminBranchesService } from '@/modules/admin/branches/dashboard/services/branches.service';
import { AdminCouponsService } from '@/modules/admin/coupons/dashboard/services/coupons.service';
import { AdminExpenseCategoriesService } from '@/modules/admin/expense-categories/dashboard/services/expense-categories.service';
import { AdminExpensesService } from '@/modules/admin/expenses/dashboard/services/expenses.service';
import { AdminPermissionsService } from '@/modules/admin/permissions/dashboard/services/permissions.service';
import { AdminPlansService } from '@/modules/admin/plans/dashboard/services/plans.service';
import { AdminStaffUsersService } from '@/modules/admin/staff-users/dashboard/services/staff-users.service';
import { AdminStudentsService } from '@/modules/admin/students/dashboard/services/students.service';

// Micro-Controllers
import { AdminDashboardController } from './controllers/dashboard.controller';
import { AdminReportsController } from '@/modules/admin/reports/dashboard/controllers/reports.controller';
import { AdminAuditLogsController } from '@/modules/admin/audit-logs/dashboard/controllers/audit-logs.controller';
import { AdminBlacklistController } from '@/modules/admin/blacklist/dashboard/controllers/blacklist.controller';
import { AdminBranchesController } from '@/modules/admin/branches/dashboard/controllers/branches.controller';
import { AdminCouponsController } from '@/modules/admin/coupons/dashboard/controllers/coupons.controller';
import { AdminExpenseCategoriesController } from '@/modules/admin/expense-categories/dashboard/controllers/expense-categories.controller';
import { AdminExpensesController } from '@/modules/admin/expenses/dashboard/controllers/expenses.controller';
import { AdminPermissionsController } from '@/modules/admin/permissions/dashboard/controllers/permissions.controller';
import { AdminPlansController } from '@/modules/admin/plans/dashboard/controllers/plans.controller';
import { AdminStaffUsersController } from '@/modules/admin/staff-users/dashboard/controllers/staff-users.controller';
import { AdminStudentsController } from '@/modules/admin/students/dashboard/controllers/students.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Payment, Seat])],
  providers: [AdminDashboardService, AdminReportsService, AdminAuditLogsService, AdminBlacklistService, AdminBranchesService, AdminCouponsService, AdminExpenseCategoriesService, AdminExpensesService, AdminPermissionsService, AdminPlansService, AdminStaffUsersService, AdminStudentsService, ],
  controllers: [AdminDashboardController, AdminReportsController, AdminAuditLogsController, AdminBlacklistController, AdminBranchesController, AdminCouponsController, AdminExpenseCategoriesController, AdminExpensesController, AdminPermissionsController, AdminPlansController, AdminStaffUsersController, AdminStudentsController, ],
})
export class Module {}
