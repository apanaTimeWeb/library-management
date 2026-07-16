import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { HOLIDAYS_CONSTANTS } from '@/modules/manager/settings/holidays/constants/holidays.constants';

export class GetHolidaiesQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = HOLIDAYS_CONSTANTS.DEFAULT_PAGE;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = HOLIDAYS_CONSTANTS.DEFAULT_LIMIT;

  @IsOptional()
  @IsString()
  search?: string;
}
