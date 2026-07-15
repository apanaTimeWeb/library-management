import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetAllEnquiriesService } from '@/modules/manager/crm/enquiries/services/get-all-enquiries.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { ENQUIRIES_CONSTANTS } from '@/modules/manager/crm/enquiries/constants/enquiries.constants';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('CRM Enquiries')
@ApiBearerAuth()
@Controller('api/manager/crm/enquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetAllEnquiriesController {
  constructor(
    private readonly getAllEnquiriesService: GetAllEnquiriesService,
  ) {}

  // SLA: FAST
  @Get()
  @ApiOperation({ summary: 'Get all CRM enquiries (branch-scoped)' })
  async findAll(@Req() req: any, @Query() query: PaginationDto): Promise<any> {
    const branchId =
      req.user?.branchId || ENQUIRIES_CONSTANTS.DEFAULT_BRANCH_ID;
    return this.getAllEnquiriesService.findAll(branchId, query);
  }
}
