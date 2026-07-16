import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardStudentReportsService } from '@/modules/manager/student-reports/dashboard/services/dashboard-student-reports.service';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/session/guards/auth-tenant.guard';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';

@ApiTags('Manager')
@ApiBearerAuth()
@Controller('api/manager/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('manager', 'admin', 'superadmin')
export class DashboardStudentReportsController {
  constructor(private readonly studentReportsService: DashboardStudentReportsService) {}

  // SLA: FAST
  @Get('student-reports')
  @ApiOperation({ summary: 'Student reports' })
  async getStudentReports(): Promise<any> {
    return this.studentReportsService.getStudentReportsData();
  }
}
