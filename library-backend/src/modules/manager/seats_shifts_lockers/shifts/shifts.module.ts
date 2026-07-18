import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from '@/core/entities/shift.entity';

import { ShiftsCreateController } from '@/modules/manager/seats_shifts_lockers/shifts/controllers/shifts-create.controller';
import { ShiftsUpdateController } from '@/modules/manager/seats_shifts_lockers/shifts/controllers/shifts-update.controller';
import { ShiftsDeleteController } from '@/modules/manager/seats_shifts_lockers/shifts/controllers/shifts-delete.controller';
import { ShiftsGetAllController } from '@/modules/manager/seats_shifts_lockers/shifts/controllers/shifts-get-all.controller';
import { ShiftsGetController } from '@/modules/manager/seats_shifts_lockers/shifts/controllers/shifts-get.controller';

import { ShiftsCreateService } from '@/modules/manager/seats_shifts_lockers/shifts/services/shifts-create.service';
import { ShiftsUpdateService } from '@/modules/manager/seats_shifts_lockers/shifts/services/shifts-update.service';
import { ShiftsDeleteService } from '@/modules/manager/seats_shifts_lockers/shifts/services/shifts-delete.service';
import { ShiftsGetAllService } from '@/modules/manager/seats_shifts_lockers/shifts/services/shifts-get-all.service';
import { ShiftsGetService } from '@/modules/manager/seats_shifts_lockers/shifts/services/shifts-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shift])],
  controllers: [
    ShiftsCreateController,
    ShiftsUpdateController,
    ShiftsDeleteController,
    ShiftsGetAllController,
    ShiftsGetController,
  ],
  providers: [
    ShiftsCreateService,
    ShiftsUpdateService,
    ShiftsDeleteService,
    ShiftsGetAllService,
    ShiftsGetService,
  ],
  exports: [ShiftsGetService],
})
export class ManagerShiftsModule {}
