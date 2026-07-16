import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { WaitlistsGetService } from '@/modules/manager/crm/waitlists/services/waitlists-get.service';

@ApiTags('Waitlists')
@Controller('api/v1/manager/waitlists')
export class WaitlistsGetController {
  constructor(private readonly service: WaitlistsGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
