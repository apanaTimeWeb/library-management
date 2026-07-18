import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StudentsGetAllService } from '@/modules/admin/students/students/services/students-get-all-students.service';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { ADMIN_STUDENTS_CONSTANTS } from '@/modules/admin/students/students/constants/students.constants';
import { StudentsPaginationDto } from '../dto/students-pagination.dto';
import { StudentsPaginatedResponse } from '../interfaces/students-pagination.interface';
import { StudentsStudentListItem } from '@/modules/admin/students/students/interfaces/students-students.interfaces';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('admin/students')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class StudentsGetAllController {
  constructor(private readonly getAllService: StudentsGetAllService) {}

  // SLA: FAST
  @Get()
  @ApiOperation({ summary: 'Get all students' })
  async getAllStudents(
    @Req() req: any,
    @Query() paginationDto: StudentsPaginationDto,
  ): Promise<StudentsPaginatedResponse<StudentsStudentListItem>> {
    const branchId =
      req.user?.branchId || ADMIN_STUDENTS_CONSTANTS.TESTING_BRANCH_ID;
    return this.getAllService.findAll(branchId, paginationDto);
  }
}
