import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatHistory } from '@/core/entities/seat-history.entity';

import { CreateSeatHistoryController } from './controllers/create-seat-history.controller';
import { UpdateSeatHistoryController } from './controllers/update-seat-history.controller';
import { DeleteSeatHistoryController } from './controllers/delete-seat-history.controller';
import { GetAllSeatHistoriesController } from './controllers/get-all-seat-history.controller';
import { GetSeatHistoryController } from './controllers/get-seat-history.controller';

import { CreateSeatHistoryService } from './services/create-seat-history.service';
import { UpdateSeatHistoryService } from './services/update-seat-history.service';
import { DeleteSeatHistoryService } from './services/delete-seat-history.service';
import { GetAllSeatHistoriesService } from './services/get-all-seat-history.service';
import { GetSeatHistoryService } from './services/get-seat-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeatHistory])],
  controllers: [
    CreateSeatHistoryController,
    UpdateSeatHistoryController,
    DeleteSeatHistoryController,
    GetAllSeatHistoriesController,
    GetSeatHistoryController,
  ],
  providers: [
    CreateSeatHistoryService,
    UpdateSeatHistoryService,
    DeleteSeatHistoryService,
    GetAllSeatHistoriesService,
    GetSeatHistoryService,
  ],
  exports: [GetSeatHistoryService],
})
export class SuperadminSeatHistoryModule {}
