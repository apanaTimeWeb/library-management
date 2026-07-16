import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { WaitlistsDeleteService } from '@/modules/manager/crm/waitlists/services/waitlists-delete.service';

@ApiTags('Waitlists')
@Controller('api/v1/manager/waitlists')
export class WaitlistsDeleteController {
  constructor(private readonly service: WaitlistsDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
