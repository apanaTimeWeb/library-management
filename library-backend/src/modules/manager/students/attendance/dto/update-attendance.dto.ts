import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceDto } from '@/modules/manager/students/attendance/dto/create-attendance.dto';

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {}
