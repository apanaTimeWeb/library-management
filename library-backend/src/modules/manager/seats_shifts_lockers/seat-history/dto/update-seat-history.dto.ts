import { PartialType } from '@nestjs/mapped-types';
import { CreateSeatHistoryDto } from '@/modules/manager/seats_shifts_lockers/seat-history/dto/create-seat-history.dto';

export class UpdateSeatHistoryDto extends PartialType(CreateSeatHistoryDto) {}
