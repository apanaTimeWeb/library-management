import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetStudentService } from '@/modules/superadmin/students/students/services/get-student.service';
import { StudentDetail } from '@/modules/superadmin/students/students/interfaces/students.interfaces';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';

@ApiTags('Superadmin Students')
@ApiBearerAuth()
@Controller('api/superadmin/students')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class GetStudentController {
  constructor(private readonly service: GetStudentService) {}

  // SLA: FAST
  @Get(':id')
  @AuthRoles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Get student by ID' })
  async getStudentById(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<StudentDetail> {
    return this.service.findOne(id, req.user?.branchId);
  }
}
