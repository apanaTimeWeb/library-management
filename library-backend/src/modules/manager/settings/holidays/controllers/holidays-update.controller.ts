import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { HolidaysUpdateService } from '@/modules/manager/settings/holidays/services/holidays-update.service';
import { UpdateHolidayDto } from '@/modules/manager/settings/holidays/dto/update-holiday.dto';

@ApiTags('Holidays')
@Controller('api/v1/manager/holidays')
export class HolidaysUpdateController {
  constructor(private readonly service: HolidaysUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateHolidayDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
