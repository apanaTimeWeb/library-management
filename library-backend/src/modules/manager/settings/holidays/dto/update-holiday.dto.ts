import { PartialType } from '@nestjs/mapped-types';
import { CreateHolidayDto } from '@/modules/manager/settings/holidays/dto/create-holiday.dto';

export class UpdateHolidayDto extends PartialType(CreateHolidayDto) {}
