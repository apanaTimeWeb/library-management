import { PartialType } from '@nestjs/mapped-types';
import { CreateSeatDto } from '@/modules/manager/seats_shifts_lockers/seats/dto/create-seat.dto';

export class UpdateSeatDto extends PartialType(CreateSeatDto) {}
