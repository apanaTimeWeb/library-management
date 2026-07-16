import { PartialType } from '@nestjs/mapped-types';
import { SeatsCreateSeatDto } from './create-seat.dto';

export class SeatsUpdateSeatDto extends PartialType(CreateSeatDto) {}
