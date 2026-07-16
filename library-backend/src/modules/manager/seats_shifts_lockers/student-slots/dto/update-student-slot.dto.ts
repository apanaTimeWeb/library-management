import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentSlotDto } from '@/modules/manager/seats_shifts_lockers/student-slots/dto/create-student-slot.dto';

export class UpdateStudentSlotDto extends PartialType(CreateStudentSlotDto) {}
