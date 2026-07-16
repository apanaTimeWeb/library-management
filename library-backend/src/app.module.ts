import { ExpenseCategoriesAdminModule } from './modules/admin/expense-categories/expense-categories/expense-categories.module';
import { ReportsAdminModule } from './modules/admin/reports/reports/reports.module';
import { ManagerDocumentsModule } from './modules/manager/documents/documents/documents.module';
import { ManagerReportsModule } from './modules/manager/reports/reports/reports.module';
import { ManagerStudentDashboardModule } from './modules/manager/student-dashboard/student-dashboard/student-dashboard.module';
import { ManagerStudentReportsModule } from './modules/manager/student-reports/student-reports/student-reports.module';
import { SuperadminBillingModule } from './modules/superadmin/billing/billing/billing.module';
import { SuperadminLibrariesModule } from './modules/superadmin/libraries/libraries/libraries.module';
import { SuperadminReportsModule } from './modules/superadmin/reports/reports/reports.module';
import { SuperadminSetupWizardModule } from './modules/superadmin/setup-wizard/setup-wizard/setup-wizard.module';
import { SuperadminSystemHealthModule } from './modules/superadmin/system-health/system-health/system-health.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PublicEnquiryModule } from './modules/public/enquiry/enquiry/enquiry.module';
import { AdminModule } from './modules/admin/dashboard/admin/admin.module';
import { AttendanceAdminModule } from './modules/admin/students/attendance/attendance.module';
import { AdminAuditLogsModule } from './modules/admin/audit-logs/audit-logs/audit-logs.module';
import { AdminAccountingExpensesModule } from './modules/admin/accounting/expenses/expenses.module';
import { AdminAccountingFinancialReportsModule } from './modules/admin/accounting/financial-reports/financial-reports.module';
import { AdminAccountingAssetMaintenanceModule } from './modules/admin/accounting/asset-maintenance/asset-maintenance.module';
import { AdminAccountingAssetsModule } from './modules/admin/accounting/assets/assets.module';
import { AdminAccountingDailySettlementsModule } from './modules/admin/accounting/daily-settlements/daily-settlements.module';
import { branchesModule } from './modules/admin/branches/branches/branches.module';
import { ComplaintsAdminModule } from './modules/admin/support-tickets/complaints/complaints.module';
import { AdminCouponsModule } from './modules/admin/coupons/coupons.module';
import { EnquiriesAdminModule } from './modules/admin/crm/enquiries/enquiries.module';
import { ExpensesAdminModule } from './modules/admin/expenses/expenses/expenses.module';
import { LockersAdminModule } from './modules/admin/seats_shifts_lockers/lockers/lockers.module';
import { PaymentsAdminModule } from './modules/admin/finance/payments/payments-payments.module';
import { PermissionsAdminModule } from './modules/admin/permissions/permissions/permissions.module';
import { PlansAdminModule } from './modules/admin/plans/plans/plans.module';
import { RolesAdminModule } from './modules/admin/staff-users/roles/roles.module';
import { SeatsAdminModule } from './modules/admin/seats_shifts_lockers/seats/seats.module';
import { ShiftsAdminModule } from './modules/admin/seats_shifts_lockers/shifts/shifts.module';
import { StudentSlotsAdminModule } from './modules/admin/seats_shifts_lockers/student-slots/student-slots.module';
import { StudentsModule } from './modules/admin/students/students/students.module';
import { SubscriptionsAdminModule } from './modules/admin/subscriptions/subscriptions/subscriptions.module';
import { UsersAdminModule } from './modules/admin/staff-users/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ManagerAttendanceModule } from './modules/manager/students/attendance/attendance.module';
import { ManagerComplaintsModule } from './modules/manager/support-tickets/complaints/complaints.module';
import { ManagerEnquiriesModule } from './modules/manager/crm/enquiries/enquiries.module';
import { ManagerExpensesModule } from './modules/manager/finance/expenses/expenses.module';
import { ManagerLockersModule } from './modules/manager/seats_shifts_lockers/lockers/lockers.module';
import { ManagerModule } from './modules/manager/dashboard/manager/manager.module';
import { ManagerPaymentsModule } from './modules/manager/finance/payments/payments.module';
import { ManagerSeatsModule } from './modules/manager/seats_shifts_lockers/seats/seats.module';
import { ManagerShiftsModule } from './modules/manager/seats_shifts_lockers/shifts/shifts.module';
import { ManagerStudentSlotsModule } from './modules/manager/seats_shifts_lockers/student-slots/student-slots.module';
import { ManagerStudentsModule } from './modules/manager/students/students/students.module';
import { SuperadminAuditLogsModule } from './modules/superadmin/audit-logs/audit-logs/audit-logs.module';
import { SuperadminBranchesModule } from './modules/superadmin/branches/branches/branches.module';
import { SuperadminComplaintsModule } from './modules/superadmin/support-tickets/complaints/complaints.module';
import { SuperadminCouponsModule } from './modules/superadmin/coupons/coupons.module';
import { SuperadminExpensesModule } from './modules/superadmin/finance/expenses/expenses.module';
import { SuperadminLockersModule } from './modules/superadmin/seats_shifts_lockers/lockers/lockers.module';
import { SuperadminPaymentsModule } from './modules/superadmin/finance/payments/payments.module';
import { SuperadminPermissionsModule } from './modules/superadmin/staff-users/permissions/permissions.module';
import { SuperadminPlansModule } from './modules/superadmin/subscriptions/plans/plans.module';
import { SuperadminRolesModule } from './modules/superadmin/staff-users/roles/roles.module';
import { SuperadminSeatsModule } from './modules/superadmin/seats_shifts_lockers/seats/seats.module';
import { SuperadminShiftsModule } from './modules/superadmin/seats_shifts_lockers/shifts/shifts.module';
import { SuperadminStudentSlotsModule } from './modules/superadmin/seats_shifts_lockers/student-slots/student-slots.module';
import { SuperadminStudentsModule } from './modules/superadmin/students/students/students.module';
import { SuperadminSubscriptionsModule } from './modules/superadmin/subscriptions/subscriptions/subscriptions.module';
import { SuperadminModule } from './modules/superadmin/dashboard/superadmin/superadmin.module';
import { SuperadminTenantsModule } from './modules/superadmin/system/tenants/tenants.module';
import { SuperadminUsersModule } from './modules/superadmin/staff-users/users/users.module';

@Module({
  imports: [
    ExpenseCategoriesAdminModule,
    ReportsAdminModule,
    ManagerDocumentsModule,
    ManagerReportsModule,
    ManagerStudentDashboardModule,
    ManagerStudentReportsModule,
    SuperadminBillingModule,
    SuperadminLibrariesModule,
    SuperadminReportsModule,
    SuperadminSetupWizardModule,
    SuperadminSystemHealthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 60000, limit: 60 },
      { name: 'medium', ttl: 900000, limit: 300 },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        ssl:
          configService.get<string>('NODE_ENV') === 'production'
            ? { rejectUnauthorized: false }
            : false,
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        redact: [
          'req.headers.authorization',
          'req.body.password',
          'req.body.token',
        ],
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { singleLine: true } }
            : undefined,
      },
    }),
    PublicEnquiryModule,
    AdminModule,
    AttendanceAdminModule,
    AdminAuditLogsModule,
    AdminAccountingExpensesModule,
    AdminAccountingFinancialReportsModule,
    AdminAccountingAssetMaintenanceModule,
    AdminAccountingAssetsModule,
    AdminAccountingDailySettlementsModule,
    branchesModule,
    ComplaintsAdminModule,
    AdminCouponsModule,
    EnquiriesAdminModule,
    ExpensesAdminModule,
    LockersAdminModule,
    PaymentsAdminModule,
    PermissionsAdminModule,
    PlansAdminModule,
    RolesAdminModule,
    SeatsAdminModule,
    ShiftsAdminModule,
    StudentSlotsAdminModule,
    StudentsModule,
    SubscriptionsAdminModule,
    UsersAdminModule,
    AuthModule,
    ManagerAttendanceModule,
    ManagerComplaintsModule,
    ManagerEnquiriesModule,
    ManagerExpensesModule,
    ManagerLockersModule,
    ManagerModule,
    ManagerPaymentsModule,
    ManagerSeatsModule,
    ManagerShiftsModule,
    ManagerStudentSlotsModule,
    ManagerStudentsModule,
    SuperadminAuditLogsModule,
    SuperadminBranchesModule,
    SuperadminComplaintsModule,
    SuperadminCouponsModule,
    SuperadminExpensesModule,
    SuperadminLockersModule,
    SuperadminPaymentsModule,
    SuperadminPermissionsModule,
    SuperadminPlansModule,
    SuperadminRolesModule,
    SuperadminSeatsModule,
    SuperadminShiftsModule,
    SuperadminStudentSlotsModule,
    SuperadminStudentsModule,
    SuperadminSubscriptionsModule,
    SuperadminModule,
    SuperadminTenantsModule,
    SuperadminUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
