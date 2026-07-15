import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetAllEnquiriesService } from '@/modules/admin/crm/enquiries/services/get-all-enquiries.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Admin CRM Enquiries')
@ApiBearerAuth()
@Controller('api/admin/crm/enquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetAllEnquiriesController {
  constructor(private readonly getAllEnquiriesService: GetAllEnquiriesService) {}

  @Get()
  @Roles('superadmin', 'admin')
  @ApiOperation({ summary: 'Get all CRM enquiries' })
  async findAll(): Promise<any[]> {
    return this.getAllEnquiriesService.findAll();
  }
}
