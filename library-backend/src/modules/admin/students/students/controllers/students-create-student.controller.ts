import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StudentsCreateStudentService } from '@/modules/admin/students/students/services/students-create-student.service';
import { StudentsCreateStudentDto } from '@/modules/admin/students/students/dto/students-create-student.dto';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { Student } from '@/core/entities/student.entity';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('api/admin/students')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class StudentsCreateStudentController {
  constructor(private readonly createStudentService: StudentsCreateStudentService) {}

  // SLA: FAST
  @Post()
  @AuthRoles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Create a new student' })
  async createStudent(
    @Body() data: StudentsCreateStudentDto,
    @Req() req: any,
  ): Promise<Student> {
    return this.createStudentService.create(req.user?.branchId, data);
  }
}
