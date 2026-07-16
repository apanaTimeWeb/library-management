import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateStudentService } from '@/modules/admin/students/students/services/create-student.service';
import { CreateStudentDto } from '@/modules/admin/students/students/dto/create-student.dto';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { Student } from '@/core/entities/student.entity';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('api/admin/students')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class CreateStudentController {
  constructor(private readonly createStudentService: CreateStudentService) {}

  // SLA: FAST
  @Post()
  @AuthRoles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Create a new student' })
  async createStudent(
    @Body() data: CreateStudentDto,
    @Req() req: any,
  ): Promise<Student> {
    return this.createStudentService.create(req.user?.branchId, data);
  }
}
