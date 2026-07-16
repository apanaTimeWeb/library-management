import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { HolidaysDeleteService } from '@/modules/manager/settings/holidays/services/holidays-delete.service';

@ApiTags('Holidays')
@Controller('api/v1/manager/holidays')
export class HolidaysDeleteController {
  constructor(private readonly service: HolidaysDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
