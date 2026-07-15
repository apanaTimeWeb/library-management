import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { GetStudentService } from '../services/get-student.service';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';

@Controller('api/manager/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetStudentController {
  constructor(private readonly getStudentService: GetStudentService) {}

  @Get(':id')
  @Roles('superadmin', 'admin', 'manager')
  async getStudentById(@Param('id') id: string, @Req() req: any) {
    return this.getStudentService.findOne(id, req.user?.branchId);
  }
}
