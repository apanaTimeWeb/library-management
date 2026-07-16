import { PartialType } from '@nestjs/mapped-types';
import { StudentSlotsCreateStudentSlotDto } from './create-student-slot.dto';

export class StudentSlotsUpdateStudentSlotDto extends PartialType(CreateStudentSlotDto) {}
