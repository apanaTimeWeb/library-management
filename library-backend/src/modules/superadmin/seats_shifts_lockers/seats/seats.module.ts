import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from '@/core/entities/seat.entity';

import { CreateSeatController } from './controllers/create-seat.controller';
import { UpdateSeatController } from './controllers/update-seat.controller';
import { DeleteSeatController } from './controllers/delete-seat.controller';
import { GetAllSeatsController } from './controllers/get-all-seats.controller';
import { GetSeatController } from './controllers/get-seat.controller';

import { CreateSeatService } from './services/create-seat.service';
import { UpdateSeatService } from './services/update-seat.service';
import { DeleteSeatService } from './services/delete-seat.service';
import { GetAllSeatsService } from './services/get-all-seats.service';
import { GetSeatService } from './services/get-seat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  controllers: [
    CreateSeatController,
    UpdateSeatController,
    DeleteSeatController,
    GetAllSeatsController,
    GetSeatController,
  ],
  providers: [
    CreateSeatService,
    UpdateSeatService,
    DeleteSeatService,
    GetAllSeatsService,
    GetSeatService,
  ],
  exports: [GetSeatService],
})
export class SuperadminSeatsModule {}
