import { PartialType } from '@nestjs/mapped-types';
import { CreateShiftMigrationDto } from '@/modules/manager/seats_shifts_lockers/shift-migrations/dto/create-shift-migration.dto';

export class UpdateShiftMigrationDto extends PartialType(CreateShiftMigrationDto) {}
