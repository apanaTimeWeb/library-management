import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateStudentService } from '@/modules/superadmin/students/students/services/create-student.service';
import { CreateStudentDto } from '@/modules/superadmin/students/students/dto/create-student.dto';
import { STUDENTS_CONSTANTS } from '../constants/students.constants';
import { Student } from '@/core/entities/student.entity';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Superadmin Students')
@ApiBearerAuth()
@Controller('api/superadmin/students')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class CreateStudentController {
  constructor(private readonly service: CreateStudentService) {}

  // SLA: FAST
  @Post()
  @AuthRoles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Create student' })
  async createStudent(
    @Body() data: CreateStudentDto,
    @Req() req: any,
  ): Promise<Student> {
    const branchId =
      req.user?.branchId || STUDENTS_CONSTANTS.DEFAULT_BRANCH_ID;
    return this.service.create(branchId, data);
  }
}
