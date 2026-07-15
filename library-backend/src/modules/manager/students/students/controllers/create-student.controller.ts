import { Controller, Post, Body, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateStudentService } from '../services/create-student.service';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';
import { CreateStudentDto } from '../dto/create-student.dto';

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
