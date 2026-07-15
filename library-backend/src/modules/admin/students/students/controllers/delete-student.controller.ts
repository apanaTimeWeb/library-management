import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DeleteStudentService } from '../services/delete-student.service';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('api/admin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeleteStudentController {
  constructor(private readonly deleteStudentService: DeleteStudentService) {}

  @Delete(':id')
  @Roles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Delete (suspend) a student' })
  async deleteStudent(@Param('id') id: string, @Req() req: any): Promise<any> {
    return this.deleteStudentService.remove(id, req.user?.branchId);
  }
}
