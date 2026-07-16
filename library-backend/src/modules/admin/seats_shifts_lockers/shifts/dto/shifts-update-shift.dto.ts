import { PartialType } from '@nestjs/mapped-types';
import { ShiftsCreateShiftDto } from './create-shift.dto';

export class ShiftsUpdateShiftDto extends PartialType(CreateShiftDto) {}
