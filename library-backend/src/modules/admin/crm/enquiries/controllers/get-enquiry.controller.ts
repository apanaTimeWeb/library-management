import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetEnquiryService } from '@/modules/admin/crm/enquiries/services/get-enquiry.service';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Admin CRM Enquiries')
@ApiBearerAuth()
@Controller('api/admin/crm/enquiries')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class GetEnquiryController {
  constructor(private readonly getEnquiryService: GetEnquiryService) {}

  // SLA: FAST
  @Get(':id')
  @AuthRoles('superadmin', 'admin')
  @ApiOperation({ summary: 'Get a single CRM enquiry by ID' })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.getEnquiryService.findOne(id);
  }
}
