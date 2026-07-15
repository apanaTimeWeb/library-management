import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetAllEnquiriesService } from '../services/get-all-enquiries.service';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { ENQUIRIES_CONSTANTS } from '../constants/enquiries.constants';

@ApiTags('CRM Enquiries')
@ApiBearerAuth()
@Controller('api/manager/crm/enquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetAllEnquiriesController {
  constructor(private readonly getAllEnquiriesService: GetAllEnquiriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all CRM enquiries (branch-scoped)' })
  async findAll(@Req() req: any) {
    const branchId = req.user?.branchId || ENQUIRIES_CONSTANTS.DEFAULT_BRANCH_ID;
    return this.getAllEnquiriesService.findAll(branchId);
  }
}
