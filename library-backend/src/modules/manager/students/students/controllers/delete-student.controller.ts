import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { DeleteStudentService } from '@/modules/manager/students/students/services/delete-student.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@Controller('api/manager/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeleteStudentController {
  constructor(private readonly deleteStudentService: DeleteStudentService) {}

  @Delete(':id')
  @Roles('superadmin', 'admin', 'manager')
  async deleteStudent(@Param('id') id: string, @Req() req: any) {
    return this.deleteStudentService.remove(id, req.user?.branchId);
  }
}
