import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StudentReportsService } from '@/modules/manager/student-reports/dashboard/services/student-reports.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { TenantGuard } from '@/modules/auth/auth/guards/tenant.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Manager')
@ApiBearerAuth()
@Controller('api/manager/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('manager', 'admin', 'superadmin')
export class StudentReportsController {
  constructor(private readonly studentReportsService: StudentReportsService) {}

  // SLA: FAST
  @Get('student-reports')
  @ApiOperation({ summary: 'Student reports' })
  async getStudentReports(): Promise<any> {
    return this.studentReportsService.getStudentReportsData();
  }
}
