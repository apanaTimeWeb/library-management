import { PartialType } from '@nestjs/mapped-types';
import { CreateShiftMigrationDto } from './create-shift-migration.dto';

export class UpdateShiftMigrationDto extends PartialType(CreateShiftMigrationDto) {}
