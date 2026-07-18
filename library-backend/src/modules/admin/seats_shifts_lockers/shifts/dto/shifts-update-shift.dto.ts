import { PartialType } from '@nestjs/mapped-types';
import { ShiftsCreateShiftDto } from './shifts-create-shift.dto';

export class ShiftsUpdateShiftDto extends PartialType(ShiftsCreateShiftDto) {}
