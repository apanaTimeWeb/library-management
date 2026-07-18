import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { WaitlistsUpdateService } from '@/modules/manager/crm/waitlists/services/waitlists-update.service';
import { UpdateWaitlistDto } from '@/modules/manager/crm/waitlists/dto/update-waitlist.dto';

@ApiTags('Waitlists')
@Controller('api/v1/manager/waitlists')
export class WaitlistsUpdateController {
  constructor(private readonly service: WaitlistsUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateWaitlistDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
