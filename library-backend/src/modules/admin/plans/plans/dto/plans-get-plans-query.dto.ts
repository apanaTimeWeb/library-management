import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PLANS_CONSTANTS } from '../constants/plans.constants';

export class PlansGetPlansQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = PLANS_CONSTANTS.DEFAULT_PAGE;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = PLANS_CONSTANTS.DEFAULT_LIMIT;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
