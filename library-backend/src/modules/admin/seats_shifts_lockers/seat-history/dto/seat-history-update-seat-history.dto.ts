import { PartialType } from '@nestjs/mapped-types';
import { SeatHistoryCreateDto } from './create-seat-history.dto';

export class SeatHistoryUpdateDto extends PartialType(CreateDto) {}
