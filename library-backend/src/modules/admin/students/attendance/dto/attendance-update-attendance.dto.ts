import { PartialType } from '@nestjs/mapped-types';
import { AttendanceCreateDto } from './create-attendance.dto';

export class AttendanceUpdateDto extends PartialType(CreateDto) {}
