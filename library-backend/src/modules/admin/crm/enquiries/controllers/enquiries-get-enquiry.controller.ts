import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EnquiriesGetEnquiryService } from '@/modules/admin/crm/enquiries/services/enquiries-get-enquiry.service';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';

@ApiTags('Admin CRM Enquiries')
@ApiBearerAuth()
@Controller('admin/crm/enquiries')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class EnquiriesGetEnquiryController {
  constructor(private readonly getEnquiryService: EnquiriesGetEnquiryService) {}

  // SLA: FAST
  @Get(':id')
  @AuthRoles('superadmin', 'admin')
  @ApiOperation({ summary: 'Get a single CRM enquiry by ID' })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.getEnquiryService.findOne(id);
  }
}
