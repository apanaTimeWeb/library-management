import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { GetStudentService } from '@/modules/manager/students/students/services/get-student.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@Controller('api/manager/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetStudentController {
  constructor(private readonly getStudentService: GetStudentService) {}

  // SLA: FAST
  @Get(':id')
  @Roles('superadmin', 'admin', 'manager')
  async getStudentById(@Param('id') id: string, @Req() req: any): Promise<any> {
    return this.getStudentService.findOne(id, req.user?.branchId);
  }
}
