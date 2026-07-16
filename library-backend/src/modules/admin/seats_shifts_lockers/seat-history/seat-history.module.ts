import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatHistory } from '@/core/entities/seat-history.entity';

import { SeatHistoryCreateController } from './controllers/create-seat-history.controller';
import { SeatHistoryUpdateController } from './controllers/update-seat-history.controller';
import { SeatHistoryDeleteController } from './controllers/delete-seat-history.controller';
import { SeatHistoryGetAllSeatHistoriesController } from './controllers/get-all-seat-history.controller';
import { SeatHistoryGetController } from './controllers/get-seat-history.controller';

import { SeatHistoryCreateService } from './services/create-seat-history.service';
import { SeatHistoryUpdateService } from './services/update-seat-history.service';
import { SeatHistoryDeleteService } from './services/delete-seat-history.service';
import { SeatHistoryGetAllSeatHistoriesService } from './services/get-all-seat-history.service';
import { SeatHistoryGetService } from './services/get-seat-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeatHistory])],
  controllers: [SeatHistoryCreateController, SeatHistoryUpdateController, SeatHistoryDeleteController, SeatHistoryGetAllSeatHistoriesController, SeatHistoryGetController, ],
  providers: [SeatHistoryCreateService, SeatHistoryUpdateService, SeatHistoryDeleteService, SeatHistoryGetAllSeatHistoriesService, SeatHistoryGetService, ],
  exports: [SeatHistoryGetService],
})
export class SeatHistoryAdminModule {}
