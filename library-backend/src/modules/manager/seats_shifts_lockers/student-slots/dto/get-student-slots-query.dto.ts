import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { STUDENT_SLOTS_CONSTANTS } from '@/modules/manager/seats_shifts_lockers/student-slots/constants/student-slots.constants';

export class GetStudentSlotsQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = STUDENT_SLOTS_CONSTANTS.DEFAULT_PAGE;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = STUDENT_SLOTS_CONSTANTS.DEFAULT_LIMIT;

  @IsOptional()
  @IsString()
  search?: string;
}
