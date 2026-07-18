import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { HolidaysCreateService } from '@/modules/manager/settings/holidays/services/holidays-create.service';
import { CreateHolidayDto } from '@/modules/manager/settings/holidays/dto/create-holiday.dto';

@ApiTags('Holidays')
@Controller('api/v1/manager/holidays')
export class HolidaysCreateController {
  constructor(private readonly service: HolidaysCreateService) {}

  @Post()
  async handle(@Body() dto: CreateHolidayDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
