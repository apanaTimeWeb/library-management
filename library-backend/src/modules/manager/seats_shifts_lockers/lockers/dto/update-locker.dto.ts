import { PartialType } from '@nestjs/mapped-types';
import { CreateLockerDto } from '@/modules/manager/seats_shifts_lockers/lockers/dto/create-locker.dto';

export class UpdateLockerDto extends PartialType(CreateLockerDto) {}
