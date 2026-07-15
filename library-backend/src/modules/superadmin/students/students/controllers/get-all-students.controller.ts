import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetAllStudentsService } from '@/modules/superadmin/students/students/services/get-all-students.service';
import { StudentListItem } from '@/modules/superadmin/students/students/interfaces/students.interfaces';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { STUDENTS_CONSTANTS } from '../constants/students.constants';
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
      req.user?.branchId || STUDENTS_CONSTANTS.DEFAULT_BRANCH_ID;
    return this.service.findAll(branchId);
  }
}
