import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateEnquiryStatusService } from '@/modules/admin/crm/enquiries/services/update-enquiry-status.service';
import { UpdateEnquiryStatusDto } from '@/modules/admin/crm/enquiries/dto/update-enquiry-status.dto';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Admin CRM Enquiries')
@ApiBearerAuth()
@Controller('api/admin/crm/enquiries')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class UpdateEnquiryStatusController {
  constructor(
    private readonly updateEnquiryStatusService: UpdateEnquiryStatusService,
  ) {}

  // SLA: FAST
  @Patch(':id/status')
  @AuthRoles('superadmin', 'admin')
  @ApiOperation({ summary: 'Update status of an enquiry' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateEnquiryStatusDto,
  ): Promise<any> {
    return this.updateEnquiryStatusService.updateStatus(id, updateDto);
  }
}
