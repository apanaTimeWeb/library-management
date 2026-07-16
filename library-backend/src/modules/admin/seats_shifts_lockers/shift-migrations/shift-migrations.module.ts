import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftMigration } from '@/core/entities/shift-migration.entity';

import { ShiftMigrationsCreateShiftMigrationController } from './controllers/shift-migrations-create-shift-migration.controller';
import { ShiftMigrationsUpdateShiftMigrationController } from './controllers/shift-migrations-update-shift-migration.controller';
import { ShiftMigrationsDeleteShiftMigrationController } from './controllers/shift-migrations-delete-shift-migration.controller';
import { ShiftMigrationsGetAllController } from './controllers/shift-migrations-get-all-shift-migrations.controller';
import { ShiftMigrationsGetShiftMigrationController } from './controllers/shift-migrations-get-shift-migration.controller';

import { ShiftMigrationsCreateShiftMigrationService } from './services/shift-migrations-create-shift-migration.service';
import { ShiftMigrationsUpdateShiftMigrationService } from './services/shift-migrations-update-shift-migration.service';
import { ShiftMigrationsDeleteShiftMigrationService } from './services/shift-migrations-delete-shift-migration.service';
import { ShiftMigrationsGetAllService } from './services/shift-migrations-get-all-shift-migrations.service';
import { ShiftMigrationsGetShiftMigrationService } from './services/shift-migrations-get-shift-migration.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftMigration])],
  controllers: [ShiftMigrationsCreateShiftMigrationController, ShiftMigrationsUpdateShiftMigrationController, ShiftMigrationsDeleteShiftMigrationController, ShiftMigrationsGetAllController, ShiftMigrationsGetShiftMigrationController, ],
  providers: [ShiftMigrationsCreateShiftMigrationService, ShiftMigrationsUpdateShiftMigrationService, ShiftMigrationsDeleteShiftMigrationService, ShiftMigrationsGetAllService, ShiftMigrationsGetShiftMigrationService, ],
  exports: [ShiftMigrationsGetShiftMigrationService],
})
export class ShiftMigrationsAdminModule {}
