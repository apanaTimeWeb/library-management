import {
  Controller,
  Post,
  Param,
  Body,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AddFollowUpService } from '@/modules/manager/crm/enquiries/services/add-follow-up.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { AddFollowUpDto } from '@/modules/manager/crm/enquiries/dto/add-follow-up.dto';
import { ENQUIRIES_CONSTANTS } from '@/modules/manager/crm/enquiries/constants/enquiries.constants';

@ApiTags('CRM Enquiries')
@ApiBearerAuth()
@Controller('api/manager/crm/enquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AddFollowUpController {
  constructor(private readonly addFollowUpService: AddFollowUpService) {}

  // SLA: FAST
  @Post(':id/follow-ups')
  @ApiOperation({ summary: 'Add a follow-up to an enquiry' })
  async addFollowUp(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true })) data: AddFollowUpDto,
    @Req() req: any,
  ): Promise<any> {
    const branchId =
      req.user?.branchId || ENQUIRIES_CONSTANTS.DEFAULT_BRANCH_ID;
    return this.addFollowUpService.addFollowUp(id, branchId, data);
  }
}
