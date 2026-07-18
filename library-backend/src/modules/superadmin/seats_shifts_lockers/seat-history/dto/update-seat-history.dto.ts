import { PartialType } from '@nestjs/mapped-types';
import { CreateSeatHistoryDto } from './create-seat-history.dto';

export class UpdateSeatHistoryDto extends PartialType(CreateSeatHistoryDto) {}
