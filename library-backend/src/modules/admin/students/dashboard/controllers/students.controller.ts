import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StudentsService } from '@/modules/admin/students/dashboard/services/students.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // SLA: FAST
  @Get('students')
  @ApiOperation({ summary: 'Get students' })
  async getStudents(): Promise<any[]> {
    return this.studentsService.getStudents();
  }
}
