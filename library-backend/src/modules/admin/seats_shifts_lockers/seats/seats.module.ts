import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from '@/core/entities/seat.entity';

import { SeatsCreateSeatController } from './controllers/seats-create-seat.controller';
import { SeatsUpdateSeatController } from './controllers/seats-update-seat.controller';
import { SeatsDeleteSeatController } from './controllers/seats-delete-seat.controller';
import { SeatsGetAllController } from './controllers/seats-get-all-seats.controller';
import { SeatsGetSeatController } from './controllers/seats-get-seat.controller';

import { SeatsCreateSeatService } from './services/seats-create-seat.service';
import { SeatsUpdateSeatService } from './services/seats-update-seat.service';
import { SeatsDeleteSeatService } from './services/seats-delete-seat.service';
import { SeatsGetAllService } from './services/seats-get-all-seats.service';
import { SeatsGetSeatService } from './services/seats-get-seat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  controllers: [SeatsCreateSeatController, SeatsUpdateSeatController, SeatsDeleteSeatController, SeatsGetAllController, SeatsGetSeatController, ],
  providers: [SeatsCreateSeatService, SeatsUpdateSeatService, SeatsDeleteSeatService, SeatsGetAllService, SeatsGetSeatService, ],
  exports: [SeatsGetSeatService],
})
export class SeatsAdminModule {}
