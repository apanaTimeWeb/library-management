import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetStudentService } from '@/modules/superadmin/students/students/services/get-student.service';
import { StudentDetail } from '@/modules/superadmin/students/students/interfaces/students.interfaces';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Superadmin Students')
@ApiBearerAuth()
@Controller('api/superadmin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetStudentController {
  constructor(private readonly service: GetStudentService) {}

  // SLA: FAST
  @Get(':id')
  @Roles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Get student by ID' })
  async getStudentById(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<StudentDetail> {
    return this.service.findOne(id, req.user?.branchId);
  }
}
