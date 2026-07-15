import { Controller, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateStudentService } from '../services/update-student.service';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { Student } from '../../../../../core/entities/student.entity';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';

@ApiTags('Superadmin Students')
@ApiBearerAuth()
@Controller('api/superadmin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UpdateStudentController {
  constructor(private readonly service: UpdateStudentService) {}

  @Patch(':id')
  @Roles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Update student' })
  async updateStudent(@Param('id') id: string, @Body() data: UpdateStudentDto, @Req() req: any): Promise<Student> {
    const branchId = req.user?.branchId || '8a0c079e-1fca-476b-8390-58c5b8c29d08';
    return this.service.update(id, branchId, data);
  }
}
