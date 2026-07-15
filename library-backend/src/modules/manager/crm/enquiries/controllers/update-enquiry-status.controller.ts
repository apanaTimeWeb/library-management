import { Controller, Patch, Param, Body, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateEnquiryStatusService } from '@/modules/manager/crm/enquiries/services/update-enquiry-status.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { UpdateEnquiryStatusDto } from '@/modules/manager/crm/enquiries/dto/update-enquiry-status.dto';
import { ENQUIRIES_CONSTANTS } from '@/modules/manager/crm/enquiries/constants/enquiries.constants';

@ApiTags('CRM Enquiries')
@ApiBearerAuth()
@Controller('api/manager/crm/enquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UpdateEnquiryStatusController {
  constructor(private readonly updateEnquiryStatusService: UpdateEnquiryStatusService) {}

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update status of an enquiry' })
  async updateStatus(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true })) data: UpdateEnquiryStatusDto,
    @Req() req: any,
  ) {
    const branchId = req.user?.branchId || ENQUIRIES_CONSTANTS.DEFAULT_BRANCH_ID;
    return this.updateEnquiryStatusService.updateStatus(id, branchId, data);
  }
}
