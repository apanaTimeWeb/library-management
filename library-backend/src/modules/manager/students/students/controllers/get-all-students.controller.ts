import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetAllStudentsService } from '@/modules/manager/students/students/services/get-all-students.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { STUDENT_CONSTANTS } from '@/modules/manager/students/students/constants/students.constants';

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
