import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateEnquiryStatusService } from '@/modules/admin/crm/enquiries/services/update-enquiry-status.service';
import { UpdateEnquiryStatusDto } from '@/modules/admin/crm/enquiries/dto/update-enquiry-status.dto';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Admin CRM Enquiries')
@ApiBearerAuth()
@Controller('api/admin/crm/enquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UpdateEnquiryStatusController {
  constructor(
    private readonly updateEnquiryStatusService: UpdateEnquiryStatusService,
  ) {}

  @Patch(':id/status')
  @Roles('superadmin', 'admin')
  @ApiOperation({ summary: 'Update status of an enquiry' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateEnquiryStatusDto,
  ) {
    return this.updateEnquiryStatusService.updateStatus(id, updateDto);
  }
}
