import { PartialType } from '@nestjs/mapped-types';
import { AttendanceCreateDto } from './attendance-create-attendance.dto';

export class AttendanceUpdateDto extends PartialType(AttendanceCreateDto) {}
