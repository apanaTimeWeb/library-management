import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentSlotDto } from './create-student-slot.dto';

export class UpdateStudentSlotDto extends PartialType(CreateStudentSlotDto) {}
