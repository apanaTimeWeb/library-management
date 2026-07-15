import { Controller, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateStudentService } from '@/modules/superadmin/students/students/services/update-student.service';
import { UpdateStudentDto } from '@/modules/superadmin/students/students/dto/update-student.dto';
import { STUDENTS_CONSTANTS } from '../constants/students.constants';
import { Student } from '@/core/entities/student.entity';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Superadmin Students')
@ApiBearerAuth()
@Controller('api/superadmin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UpdateStudentController {
  constructor(private readonly service: UpdateStudentService) {}

  // SLA: FAST
  @Patch(':id')
  @Roles('superadmin', 'admin', 'manager')
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
