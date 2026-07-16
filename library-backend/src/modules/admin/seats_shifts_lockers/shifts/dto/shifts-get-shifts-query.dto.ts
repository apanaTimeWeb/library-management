import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SHIFTS_CONSTANTS } from '../constants/shifts.constants';

export class ShiftsGetShiftsQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = SHIFTS_CONSTANTS.DEFAULT_PAGE;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = SHIFTS_CONSTANTS.DEFAULT_LIMIT;

  @IsOptional()
  @IsString()
  search?: string;
}
