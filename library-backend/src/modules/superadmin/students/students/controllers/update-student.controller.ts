import { Controller, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateStudentService } from '@/modules/superadmin/students/students/services/update-student.service';
import { UpdateStudentDto } from '@/modules/superadmin/students/students/dto/update-student.dto';
import { STUDENTS_CONSTANTS } from '../constants/students.constants';
import { Student } from '@/core/entities/student.entity';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';

@ApiTags('Superadmin Students')
@ApiBearerAuth()
@Controller('api/superadmin/students')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class UpdateStudentController {
  constructor(private readonly service: UpdateStudentService) {}

  // SLA: FAST
  @Patch(':id')
  @AuthRoles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Update student' })
  async updateStudent(
    @Param('id') id: string,
    @Body() data: UpdateStudentDto,
    @Req() req: any,
  ): Promise<Student> {
    const branchId =
      req.user?.branchId || STUDENTS_CONSTANTS.DEFAULT_BRANCH_ID;
    return this.service.update(id, branchId, data);
  }
}
