import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AddFollowUpService } from '../services/add-follow-up.service';
import { AddFollowUpDto } from '../dtos/add-follow-up.dto';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';

@ApiTags('Admin CRM Enquiries')
@ApiBearerAuth()
@Controller('api/admin/crm/enquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AddFollowUpController {
  constructor(private readonly addFollowUpService: AddFollowUpService) {}

  @Post(':id/follow-ups')
  @Roles('superadmin', 'admin')
  @ApiOperation({ summary: 'Add a follow-up to an enquiry' })
  async addFollowUp(
    @Param('id') id: string,
    @Body() followUpDto: AddFollowUpDto,
  ) {
    return this.addFollowUpService.addFollowUp(id, followUpDto);
  }
}
