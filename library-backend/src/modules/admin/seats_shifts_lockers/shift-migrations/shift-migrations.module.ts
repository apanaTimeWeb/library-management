import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftMigration } from '@/core/entities/shift-migration.entity';

import { ShiftMigrationsCreateShiftMigrationController } from './controllers/create-shift-migration.controller';
import { ShiftMigrationsUpdateShiftMigrationController } from './controllers/update-shift-migration.controller';
import { ShiftMigrationsDeleteShiftMigrationController } from './controllers/delete-shift-migration.controller';
import { ShiftMigrationsGetAllController } from './controllers/get-all-shift-migrations.controller';
import { ShiftMigrationsGetShiftMigrationController } from './controllers/get-shift-migration.controller';

import { ShiftMigrationsCreateShiftMigrationService } from './services/create-shift-migration.service';
import { ShiftMigrationsUpdateShiftMigrationService } from './services/update-shift-migration.service';
import { ShiftMigrationsDeleteShiftMigrationService } from './services/delete-shift-migration.service';
import { ShiftMigrationsGetAllService } from './services/get-all-shift-migrations.service';
import { ShiftMigrationsGetShiftMigrationService } from './services/get-shift-migration.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftMigration])],
  controllers: [ShiftMigrationsCreateShiftMigrationController, ShiftMigrationsUpdateShiftMigrationController, ShiftMigrationsDeleteShiftMigrationController, ShiftMigrationsGetAllController, ShiftMigrationsGetShiftMigrationController, ],
  providers: [ShiftMigrationsCreateShiftMigrationService, ShiftMigrationsUpdateShiftMigrationService, ShiftMigrationsDeleteShiftMigrationService, ShiftMigrationsGetAllService, ShiftMigrationsGetShiftMigrationService, ],
  exports: [ShiftMigrationsGetShiftMigrationService],
})
export class ShiftMigrationsAdminModule {}
