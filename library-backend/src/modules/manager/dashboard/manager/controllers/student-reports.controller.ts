import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StudentReportsService } from '../services/student-reports.service';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { TenantGuard } from '../../../../auth/auth/guards/tenant.guard';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';

@ApiTags('Manager')
@ApiBearerAuth()
@Controller('api/manager/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('manager', 'admin', 'superadmin')
export class StudentReportsController {
  constructor(private readonly studentReportsService: StudentReportsService) {}

  @Get('student-reports')
  @ApiOperation({ summary: 'Student reports' })
  async getStudentReports() {
    return this.studentReportsService.getStudentReportsData();
  }
}
