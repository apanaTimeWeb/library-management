import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DeleteStudentService } from '@/modules/superadmin/students/students/services/delete-student.service';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { STUDENTS_CONSTANTS } from '../constants/students.constants';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';

@ApiTags('Superadmin Students')
@ApiBearerAuth()
@Controller('api/superadmin/students')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class DeleteStudentController {
  constructor(private readonly service: DeleteStudentService) {}

  // SLA: FAST
  @Delete(':id')
  @AuthRoles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Delete/Suspend student' })
  async deleteStudent(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<{ message: string }> {
    const branchId =
      req.user?.branchId || STUDENTS_CONSTANTS.DEFAULT_BRANCH_ID;
    return this.service.remove(id, branchId);
  }
}
