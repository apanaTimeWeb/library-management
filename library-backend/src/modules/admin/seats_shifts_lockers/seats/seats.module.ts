import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from '@/core/entities/seat.entity';

import { SeatsCreateSeatController } from './controllers/create-seat.controller';
import { SeatsUpdateSeatController } from './controllers/update-seat.controller';
import { SeatsDeleteSeatController } from './controllers/delete-seat.controller';
import { SeatsGetAllController } from './controllers/get-all-seats.controller';
import { SeatsGetSeatController } from './controllers/get-seat.controller';

import { SeatsCreateSeatService } from './services/create-seat.service';
import { SeatsUpdateSeatService } from './services/update-seat.service';
import { SeatsDeleteSeatService } from './services/delete-seat.service';
import { SeatsGetAllService } from './services/get-all-seats.service';
import { SeatsGetSeatService } from './services/get-seat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  controllers: [SeatsCreateSeatController, SeatsUpdateSeatController, SeatsDeleteSeatController, SeatsGetAllController, SeatsGetSeatController, ],
  providers: [SeatsCreateSeatService, SeatsUpdateSeatService, SeatsDeleteSeatService, SeatsGetAllService, SeatsGetSeatService, ],
  exports: [SeatsGetSeatService],
})
export class SeatsAdminModule {}
