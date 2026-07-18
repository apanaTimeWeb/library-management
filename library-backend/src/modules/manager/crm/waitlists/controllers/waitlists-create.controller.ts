import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { WaitlistsCreateService } from '@/modules/manager/crm/waitlists/services/waitlists-create.service';
import { CreateWaitlistDto } from '@/modules/manager/crm/waitlists/dto/create-waitlist.dto';

@ApiTags('Waitlists')
@Controller('api/v1/manager/waitlists')
export class WaitlistsCreateController {
  constructor(private readonly service: WaitlistsCreateService) {}

  @Post()
  async handle(@Body() dto: CreateWaitlistDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
