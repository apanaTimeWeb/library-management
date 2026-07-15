import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { GetAllStudentsService } from '@/modules/manager/students/students/services/get-all-students.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { STUDENT_CONSTANTS } from '@/modules/manager/students/students/constants/students.constants';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponse } from '../interfaces/pagination.interface';
import { StudentListItem } from '@/modules/manager/students/students/interfaces/students.interfaces';

@Controller('api/manager/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetAllStudentsController {
  constructor(private readonly getAllStudentsService: GetAllStudentsService) {}

  // SLA: FAST
  @Get()
  async getAllStudents(
    @Req() req: any,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<StudentListItem>> {
    const branchId = req.user?.branchId || STUDENT_CONSTANTS.DEFAULT_BRANCH_ID;
    return this.getAllStudentsService.findAll(branchId, paginationDto);
  }
}
