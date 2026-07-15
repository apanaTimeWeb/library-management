import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateStudentService } from '@/modules/superadmin/students/students/services/create-student.service';
import { CreateStudentDto } from '@/modules/superadmin/students/students/dto/create-student.dto';
import { STUDENTS_CONSTANTS } from '../constants/students.constants';
import { Student } from '@/core/entities/student.entity';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Superadmin Students')
@ApiBearerAuth()
@Controller('api/superadmin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CreateStudentController {
  constructor(private readonly service: CreateStudentService) {}

  // SLA: FAST
  @Post()
  @Roles('superadmin', 'admin', 'manager')
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
