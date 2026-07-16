import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { NOTICES_CONSTANTS } from '@/modules/manager/engagement/notices/constants/notices.constants';

export class GetNoticesQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = NOTICES_CONSTANTS.DEFAULT_PAGE;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = NOTICES_CONSTANTS.DEFAULT_LIMIT;

  @IsOptional()
  @IsString()
  search?: string;
}
