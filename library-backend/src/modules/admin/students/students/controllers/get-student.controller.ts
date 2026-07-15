import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetStudentService } from '@/modules/admin/students/students/services/get-student.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { StudentDetailItem } from '@/modules/admin/students/students/interfaces/students.interfaces';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('api/admin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetStudentController {
  constructor(private readonly getStudentService: GetStudentService) {}

  // SLA: FAST
  @Get(':id')
  @Roles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Get student by ID or SmartID' })
  async getStudentById(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<StudentDetailItem> {
    return this.getStudentService.findOne(id, req.user?.branchId);
  }
}
