import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetAllStudentsService } from '@/modules/superadmin/students/students/services/get-all-students.service';
import { StudentListItem } from '@/modules/superadmin/students/students/interfaces/students.interfaces';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';

@ApiTags('Superadmin Students')
@ApiBearerAuth()
@Controller('api/superadmin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetAllStudentsController {
  constructor(private readonly service: GetAllStudentsService) {}

  // SLA: FAST
  @Get()
  @ApiOperation({ summary: 'Get all students' })
  async getAllStudents(@Req() req: any): Promise<StudentListItem[]> {
    const branchId =
      req.user?.branchId || '8a0c079e-1fca-476b-8390-58c5b8c29d08';
    return this.service.findAll(branchId);
  }
}
