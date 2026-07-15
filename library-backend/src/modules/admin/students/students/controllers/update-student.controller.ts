import { Controller, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateStudentService } from '../services/update-student.service';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('api/admin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UpdateStudentController {
  constructor(private readonly updateStudentService: UpdateStudentService) {}

  @Patch(':id')
  @Roles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Update a student' })
  async updateStudent(@Param('id') id: string, @Body() data: UpdateStudentDto, @Req() req: any): Promise<any> {
    return this.updateStudentService.update(id, req.user?.branchId, data);
  }
}
