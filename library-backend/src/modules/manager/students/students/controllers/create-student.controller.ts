import { Controller, Post, Body, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateStudentService } from '@/modules/manager/students/students/services/create-student.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';
import { CreateStudentDto } from '@/modules/manager/students/students/dto/create-student.dto';

@Controller('api/manager/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CreateStudentController {
  constructor(private readonly createStudentService: CreateStudentService) {}

  @Post()
  @Roles('superadmin', 'admin', 'manager')
  async createStudent(
    @Body(new ValidationPipe({ whitelist: true })) data: CreateStudentDto, 
    @Req() req: any
  ) {
    return this.createStudentService.create(req.user?.branchId, data);
  }
}
