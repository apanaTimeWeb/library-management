import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatHistory } from '@/core/entities/seat-history.entity';

import { SeatHistoryCreateController } from './controllers/seat-history-create-seat-history.controller';
import { SeatHistoryUpdateController } from './controllers/seat-history-update-seat-history.controller';
import { SeatHistoryDeleteController } from './controllers/seat-history-delete-seat-history.controller';
import { SeatHistoryGetAllSeatHistoriesController } from './controllers/seat-history-get-all-seat-history.controller';
import { SeatHistoryGetController } from './controllers/seat-history-get-seat-history.controller';

import { SeatHistoryCreateService } from './services/seat-history-create-seat-history.service';
import { SeatHistoryUpdateService } from './services/seat-history-update-seat-history.service';
import { SeatHistoryDeleteService } from './services/seat-history-delete-seat-history.service';
import { SeatHistoryGetAllSeatHistoriesService } from './services/seat-history-get-all-seat-history.service';
import { SeatHistoryGetService } from './services/seat-history-get-seat-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeatHistory])],
  controllers: [SeatHistoryCreateController, SeatHistoryUpdateController, SeatHistoryDeleteController, SeatHistoryGetAllSeatHistoriesController, SeatHistoryGetController, ],
  providers: [SeatHistoryCreateService, SeatHistoryUpdateService, SeatHistoryDeleteService, SeatHistoryGetAllSeatHistoriesService, SeatHistoryGetService, ],
  exports: [SeatHistoryGetService],
})
export class SeatHistoryAdminModule {}
