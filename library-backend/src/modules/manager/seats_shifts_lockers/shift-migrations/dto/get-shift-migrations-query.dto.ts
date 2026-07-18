import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SHIFT_MIGRATIONS_CONSTANTS } from '@/modules/manager/seats_shifts_lockers/shift-migrations/constants/shift-migrations.constants';

export class GetShiftMigrationsQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = SHIFT_MIGRATIONS_CONSTANTS.DEFAULT_PAGE;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = SHIFT_MIGRATIONS_CONSTANTS.DEFAULT_LIMIT;

  @IsOptional()
  @IsString()
  search?: string;
}
