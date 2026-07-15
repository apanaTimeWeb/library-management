import { Controller, Patch, Param, Body, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { UpdateStudentService } from '../services/update-student.service';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';
import { UpdateStudentDto } from '../dto/update-student.dto';

@Controller('api/manager/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UpdateStudentController {
  constructor(private readonly updateStudentService: UpdateStudentService) {}

  @Patch(':id')
  @Roles('superadmin', 'admin', 'manager')
  async updateStudent(
    @Param('id') id: string, 
    @Body(new ValidationPipe({ whitelist: true })) data: UpdateStudentDto, 
    @Req() req: any
  ) {
    return this.updateStudentService.update(id, req.user?.branchId, data);
  }
}
