import { Controller, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StudentsUpdateStudentService } from '@/modules/admin/students/students/services/students-update-student.service';
import { StudentsUpdateStudentDto } from '@/modules/admin/students/students/dto/students-update-student.dto';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('admin/students')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class StudentsUpdateStudentController {
  constructor(private readonly updateStudentService: StudentsUpdateStudentService) {}

  // SLA: FAST
  @Patch(':id')
  @AuthRoles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Update a student' })
  async updateStudent(
    @Param('id') id: string,
    @Body() data: StudentsUpdateStudentDto,
    @Req() req: any,
  ): Promise<any> {
    return this.updateStudentService.update(id, req.user?.branchId, data);
  }
}
