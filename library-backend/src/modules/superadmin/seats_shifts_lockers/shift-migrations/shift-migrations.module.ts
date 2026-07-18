import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftMigration } from '@/core/entities/shift-migration.entity';

import { CreateShiftMigrationController } from './controllers/create-shift-migration.controller';
import { UpdateShiftMigrationController } from './controllers/update-shift-migration.controller';
import { DeleteShiftMigrationController } from './controllers/delete-shift-migration.controller';
import { GetAllShiftMigrationsController } from './controllers/get-all-shift-migrations.controller';
import { GetShiftMigrationController } from './controllers/get-shift-migration.controller';

import { CreateShiftMigrationService } from './services/create-shift-migration.service';
import { UpdateShiftMigrationService } from './services/update-shift-migration.service';
import { DeleteShiftMigrationService } from './services/delete-shift-migration.service';
import { GetAllShiftMigrationsService } from './services/get-all-shift-migrations.service';
import { GetShiftMigrationService } from './services/get-shift-migration.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftMigration])],
  controllers: [
    CreateShiftMigrationController,
    UpdateShiftMigrationController,
    DeleteShiftMigrationController,
    GetAllShiftMigrationsController,
    GetShiftMigrationController,
  ],
  providers: [
    CreateShiftMigrationService,
    UpdateShiftMigrationService,
    DeleteShiftMigrationService,
    GetAllShiftMigrationsService,
    GetShiftMigrationService,
  ],
  exports: [GetShiftMigrationService],
})
export class SuperadminShiftMigrationsModule {}
