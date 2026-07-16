import { PartialType } from '@nestjs/mapped-types';
import { SeatsCreateSeatDto } from './seats-create-seat.dto';

export class SeatsUpdateSeatDto extends PartialType(SeatsCreateSeatDto) {}
