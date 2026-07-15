import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetEnquiryService } from '@/modules/manager/crm/enquiries/services/get-enquiry.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { ENQUIRIES_CONSTANTS } from '@/modules/manager/crm/enquiries/constants/enquiries.constants';

@ApiTags('CRM Enquiries')
@ApiBearerAuth()
@Controller('api/manager/crm/enquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetEnquiryController {
  constructor(private readonly getEnquiryService: GetEnquiryService) {}

  // SLA: FAST
  @Get(':id')
  @ApiOperation({ summary: 'Get a single CRM enquiry by ID' })
  async findOne(@Param('id') id: string, @Req() req: any): Promise<any> {
    const branchId =
      req.user?.branchId || ENQUIRIES_CONSTANTS.DEFAULT_BRANCH_ID;
    return this.getEnquiryService.findOne(id, branchId);
  }
}
