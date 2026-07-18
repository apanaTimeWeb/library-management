import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EnquiriesUpdateEnquiryStatusService } from '@/modules/admin/crm/enquiries/services/enquiries-update-enquiry-status.service';
import { EnquiriesUpdateEnquiryStatusDto } from '@/modules/admin/crm/enquiries/dto/enquiries-update-enquiry-status.dto';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';

@ApiTags('Admin CRM Enquiries')
@ApiBearerAuth()
@Controller('admin/crm/enquiries')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class EnquiriesUpdateEnquiryStatusController {
  constructor(
    private readonly updateEnquiryStatusService: EnquiriesUpdateEnquiryStatusService,
  ) {}

  // SLA: FAST
  @Patch(':id/status')
  @AuthRoles('superadmin', 'admin')
  @ApiOperation({ summary: 'Update status of an enquiry' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateDto: EnquiriesUpdateEnquiryStatusDto,
  ): Promise<any> {
    return this.updateEnquiryStatusService.updateStatus(id, updateDto);
  }
}
