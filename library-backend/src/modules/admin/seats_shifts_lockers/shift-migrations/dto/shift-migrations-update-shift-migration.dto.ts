import { PartialType } from '@nestjs/mapped-types';
import { ShiftMigrationsCreateShiftMigrationDto } from './shift-migrations-create-shift-migration.dto';

export class ShiftMigrationsUpdateShiftMigrationDto extends PartialType(ShiftMigrationsCreateShiftMigrationDto) {}
