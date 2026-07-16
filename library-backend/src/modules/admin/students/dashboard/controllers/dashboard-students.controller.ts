import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardStudentsService } from '@/modules/admin/students/dashboard/services/dashboard-students.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class DashboardStudentsController {
  constructor(private readonly studentsService: DashboardStudentsService) {}

  // SLA: FAST
  @Get('students')
  @ApiOperation({ summary: 'Get students' })
  async getStudents(): Promise<any[]> {
    return this.studentsService.getStudents();
  }
}
