import { Controller, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateStudentService } from '@/modules/admin/students/students/services/update-student.service';
import { UpdateStudentDto } from '@/modules/admin/students/students/dto/update-student.dto';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('api/admin/students')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class UpdateStudentController {
  constructor(private readonly updateStudentService: UpdateStudentService) {}

  // SLA: FAST
  @Patch(':id')
  @AuthRoles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Update a student' })
  async updateStudent(
    @Param('id') id: string,
    @Body() data: UpdateStudentDto,
    @Req() req: any,
  ): Promise<any> {
    return this.updateStudentService.update(id, req.user?.branchId, data);
  }
}
