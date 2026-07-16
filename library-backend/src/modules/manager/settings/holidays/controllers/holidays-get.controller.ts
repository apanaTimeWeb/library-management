import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { HolidaysGetService } from '@/modules/manager/settings/holidays/services/holidays-get.service';

@ApiTags('Holidays')
@Controller('api/v1/manager/holidays')
export class HolidaysGetController {
  constructor(private readonly service: HolidaysGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
