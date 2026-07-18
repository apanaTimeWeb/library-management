import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftMigration } from '@/core/entities/shift-migration.entity';

import { ShiftMigrationsCreateController } from '@/modules/manager/seats_shifts_lockers/shift-migrations/controllers/shift-migrations-create.controller';
import { ShiftMigrationsUpdateController } from '@/modules/manager/seats_shifts_lockers/shift-migrations/controllers/shift-migrations-update.controller';
import { ShiftMigrationsDeleteController } from '@/modules/manager/seats_shifts_lockers/shift-migrations/controllers/shift-migrations-delete.controller';
import { ShiftMigrationsGetAllController } from '@/modules/manager/seats_shifts_lockers/shift-migrations/controllers/shift-migrations-get-all.controller';
import { ShiftMigrationsGetController } from '@/modules/manager/seats_shifts_lockers/shift-migrations/controllers/shift-migrations-get.controller';

import { ShiftMigrationsCreateService } from '@/modules/manager/seats_shifts_lockers/shift-migrations/services/shift-migrations-create.service';
import { ShiftMigrationsUpdateService } from '@/modules/manager/seats_shifts_lockers/shift-migrations/services/shift-migrations-update.service';
import { ShiftMigrationsDeleteService } from '@/modules/manager/seats_shifts_lockers/shift-migrations/services/shift-migrations-delete.service';
import { ShiftMigrationsGetAllService } from '@/modules/manager/seats_shifts_lockers/shift-migrations/services/shift-migrations-get-all.service';
import { ShiftMigrationsGetService } from '@/modules/manager/seats_shifts_lockers/shift-migrations/services/shift-migrations-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftMigration])],
  controllers: [
    ShiftMigrationsCreateController,
    ShiftMigrationsUpdateController,
    ShiftMigrationsDeleteController,
    ShiftMigrationsGetAllController,
    ShiftMigrationsGetController,
  ],
  providers: [
    ShiftMigrationsCreateService,
    ShiftMigrationsUpdateService,
    ShiftMigrationsDeleteService,
    ShiftMigrationsGetAllService,
    ShiftMigrationsGetService,
  ],
  exports: [ShiftMigrationsGetService],
})
export class ManagerShiftMigrationsModule {}
