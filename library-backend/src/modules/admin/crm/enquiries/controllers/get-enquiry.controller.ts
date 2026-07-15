import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetEnquiryService } from '../services/get-enquiry.service';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';

@ApiTags('Admin CRM Enquiries')
@ApiBearerAuth()
@Controller('api/admin/crm/enquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetEnquiryController {
  constructor(private readonly getEnquiryService: GetEnquiryService) {}

  @Get(':id')
  @Roles('superadmin', 'admin')
  @ApiOperation({ summary: 'Get a single CRM enquiry by ID' })
  async findOne(@Param('id') id: string) {
    return this.getEnquiryService.findOne(id);
  }
}
