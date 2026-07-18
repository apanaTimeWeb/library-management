import { PartialType } from '@nestjs/mapped-types';
import { SeatHistoryCreateDto } from './seat-history-create-seat-history.dto';

export class SeatHistoryUpdateDto extends PartialType(SeatHistoryCreateDto) {}
