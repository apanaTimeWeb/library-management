import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StudentsGetStudentService } from '@/modules/admin/students/students/services/students-get-student.service';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { StudentDetailItem } from '@/modules/admin/students/students/interfaces/students-students.interfaces';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('admin/students')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class StudentsGetStudentController {
  constructor(private readonly getStudentService: StudentsGetStudentService) {}

  // SLA: FAST
  @Get(':id')
  @AuthRoles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Get student by ID or SmartID' })
  async getStudentById(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<StudentDetailItem> {
    return this.getStudentService.findOne(id, req.user?.branchId);
  }
}
