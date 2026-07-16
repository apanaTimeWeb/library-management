import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StudentReportsService } from '@/modules/manager/student-reports/dashboard/services/student-reports.service';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Manager')
@ApiBearerAuth()
@Controller('api/manager/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('manager', 'admin', 'superadmin')
export class StudentReportsController {
  constructor(private readonly studentReportsService: StudentReportsService) {}

  // SLA: FAST
  @Get('student-reports')
  @ApiOperation({ summary: 'Student reports' })
  async getStudentReports(): Promise<any> {
    return this.studentReportsService.getStudentReportsData();
  }
}
