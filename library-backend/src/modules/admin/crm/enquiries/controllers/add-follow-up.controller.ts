import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AddFollowUpService } from '@/modules/admin/crm/enquiries/services/add-follow-up.service';
import { AddFollowUpDto } from '@/modules/admin/crm/enquiries/dto/add-follow-up.dto';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Admin CRM Enquiries')
@ApiBearerAuth()
@Controller('api/admin/crm/enquiries')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
export class AddFollowUpController {
  constructor(private readonly addFollowUpService: AddFollowUpService) {}

  // SLA: FAST
  @Post(':id/follow-ups')
  @AuthRoles('superadmin', 'admin')
  @ApiOperation({ summary: 'Add a follow-up to an enquiry' })
  async addFollowUp(
    @Param('id') id: string,
    @Body() followUpDto: AddFollowUpDto,
  ): Promise<any> {
    return this.addFollowUpService.addFollowUp(id, followUpDto);
  }
}
