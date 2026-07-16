import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from '@/core/entities/seat.entity';

import { SeatsCreateController } from '@/modules/manager/seats_shifts_lockers/seats/controllers/seats-create.controller';
import { SeatsUpdateController } from '@/modules/manager/seats_shifts_lockers/seats/controllers/seats-update.controller';
import { SeatsDeleteController } from '@/modules/manager/seats_shifts_lockers/seats/controllers/seats-delete.controller';
import { SeatsGetAllController } from '@/modules/manager/seats_shifts_lockers/seats/controllers/seats-get-all.controller';
import { SeatsGetController } from '@/modules/manager/seats_shifts_lockers/seats/controllers/seats-get.controller';

import { SeatsCreateService } from '@/modules/manager/seats_shifts_lockers/seats/services/seats-create.service';
import { SeatsUpdateService } from '@/modules/manager/seats_shifts_lockers/seats/services/seats-update.service';
import { SeatsDeleteService } from '@/modules/manager/seats_shifts_lockers/seats/services/seats-delete.service';
import { SeatsGetAllService } from '@/modules/manager/seats_shifts_lockers/seats/services/seats-get-all.service';
import { SeatsGetService } from '@/modules/manager/seats_shifts_lockers/seats/services/seats-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  controllers: [
    SeatsCreateController,
    SeatsUpdateController,
    SeatsDeleteController,
    SeatsGetAllController,
    SeatsGetController,
  ],
  providers: [
    SeatsCreateService,
    SeatsUpdateService,
    SeatsDeleteService,
    SeatsGetAllService,
    SeatsGetService,
  ],
  exports: [SeatsGetService],
})
export class ManagerSeatsModule {}
