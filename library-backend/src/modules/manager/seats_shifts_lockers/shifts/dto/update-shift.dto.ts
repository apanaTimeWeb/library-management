import { PartialType } from '@nestjs/mapped-types';
import { CreateShiftDto } from '@/modules/manager/seats_shifts_lockers/shifts/dto/create-shift.dto';

export class UpdateShiftDto extends PartialType(CreateShiftDto) {}
