import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetEnquiryService } from '@/modules/admin/crm/enquiries/services/get-enquiry.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Admin CRM Enquiries')
@ApiBearerAuth()
@Controller('api/admin/crm/enquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetEnquiryController {
  constructor(private readonly getEnquiryService: GetEnquiryService) {}

  // SLA: FAST
  @Get(':id')
  @Roles('superadmin', 'admin')
  @ApiOperation({ summary: 'Get a single CRM enquiry by ID' })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.getEnquiryService.findOne(id);
  }
}
