import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DeleteStudentService } from '@/modules/superadmin/students/students/services/delete-student.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Superadmin Students')
@ApiBearerAuth()
@Controller('api/superadmin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeleteStudentController {
  constructor(private readonly service: DeleteStudentService) {}

  @Delete(':id')
  @Roles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Delete/Suspend student' })
  async deleteStudent(@Param('id') id: string, @Req() req: any): Promise<{ message: string }> {
    const branchId = req.user?.branchId || '8a0c079e-1fca-476b-8390-58c5b8c29d08';
    return this.service.remove(id, branchId);
  }
}
