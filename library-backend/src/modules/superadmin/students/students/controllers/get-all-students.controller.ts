import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetAllStudentsService } from '../services/get-all-students.service';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';

@ApiTags('Superadmin Students')
@ApiBearerAuth()
@Controller('api/superadmin/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetAllStudentsController {
  constructor(private readonly service: GetAllStudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  async getAllStudents(@Req() req: any) {
    const branchId = req.user?.branchId || '8a0c079e-1fca-476b-8390-58c5b8c29d08';
    return this.service.findAll(branchId);
  }
}
