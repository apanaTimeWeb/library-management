import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetAllStudentsService } from '../services/get-all-students.service';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { STUDENT_CONSTANTS } from '../constants/students.constants';

@Controller('api/manager/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetAllStudentsController {
  constructor(private readonly getAllStudentsService: GetAllStudentsService) {}

  @Get()
  async getAllStudents(@Req() req: any) {
    const branchId = req.user?.branchId || STUDENT_CONSTANTS.DEFAULT_BRANCH_ID;
    return this.getAllStudentsService.findAll(branchId);
  }
}
