import { PartialType } from '@nestjs/mapped-types';
import { StudentSlotsCreateStudentSlotDto } from './student-slots-create-student-slot.dto';

export class StudentSlotsUpdateStudentSlotDto extends PartialType(StudentSlotsCreateStudentSlotDto) {}
