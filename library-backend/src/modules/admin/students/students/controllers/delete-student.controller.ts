import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DeleteStudentService } from '@/modules/admin/students/students/services/delete-student.service';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('api/admin/students')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class DeleteStudentController {
  constructor(private readonly deleteStudentService: DeleteStudentService) {}

  // SLA: FAST
  @Delete(':id')
  @AuthRoles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Delete (suspend) a student' })
  async deleteStudent(@Param('id') id: string, @Req() req: any): Promise<any> {
    return this.deleteStudentService.remove(id, req.user?.branchId);
  }
}
