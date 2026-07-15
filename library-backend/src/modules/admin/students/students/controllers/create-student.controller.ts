import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateStudentService } from '@/modules/admin/students/students/services/create-student.service';
import { CreateStudentDto } from '@/modules/admin/students/students/dto/create-student.dto';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';
import { Student } from '@/core/entities/student.entity';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('api/admin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CreateStudentController {
  constructor(private readonly createStudentService: CreateStudentService) {}

  @Post()
  @Roles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Create a new student' })
  async createStudent(
    @Body() data: CreateStudentDto,
    @Req() req: any,
  ): Promise<Student> {
    return this.createStudentService.create(req.user?.branchId, data);
  }
}
