import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetAllStudentsService } from '../services/get-all-students.service';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { ADMIN_STUDENTS_CONSTANTS } from '../constants/students.constants';

@ApiTags('Admin Students')
@ApiBearerAuth()
@Controller('api/admin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetAllStudentsController {
  constructor(private readonly getAllStudentsService: GetAllStudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  async getAllStudents(@Req() req: any): Promise<any[]> {
    const branchId = req.user?.branchId || ADMIN_STUDENTS_CONSTANTS.TESTING_BRANCH_ID;
    return this.getAllStudentsService.findAll(branchId);
  }
}
