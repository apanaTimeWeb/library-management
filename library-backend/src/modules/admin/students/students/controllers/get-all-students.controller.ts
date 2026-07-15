import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetAllStudentsService } from '@/modules/admin/students/students/services/get-all-students.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { ADMIN_STUDENTS_CONSTANTS } from '@/modules/admin/students/students/constants/students.constants';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/pagination.interface';
import { StudentListItem } from '@/modules/admin/students/students/interfaces/students.interfaces';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('api/admin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetAllStudentsController {
  constructor(private readonly getAllStudentsService: GetAllStudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  async getAllStudents(
    @Req() req: any,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<StudentListItem>> {
    const branchId =
      req.user?.branchId || ADMIN_STUDENTS_CONSTANTS.TESTING_BRANCH_ID;
    return this.getAllStudentsService.findAll(branchId, paginationDto);
  }
}
