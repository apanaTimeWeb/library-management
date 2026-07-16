import { PartialType } from '@nestjs/mapped-types';
import { ShiftMigrationsCreateShiftMigrationDto } from './create-shift-migration.dto';

export class ShiftMigrationsUpdateShiftMigrationDto extends PartialType(CreateShiftMigrationDto) {}
