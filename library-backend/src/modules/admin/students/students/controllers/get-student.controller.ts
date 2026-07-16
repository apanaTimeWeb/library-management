import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetStudentService } from '@/modules/admin/students/students/services/get-student.service';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { StudentDetailItem } from '@/modules/admin/students/students/interfaces/students.interfaces';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('api/admin/students')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class GetStudentController {
  constructor(private readonly getStudentService: GetStudentService) {}

  // SLA: FAST
  @Get(':id')
  @AuthRoles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Get student by ID or SmartID' })
  async getStudentById(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<StudentDetailItem> {
    return this.getStudentService.findOne(id, req.user?.branchId);
  }
}
