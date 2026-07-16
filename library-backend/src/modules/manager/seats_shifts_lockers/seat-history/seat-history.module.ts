import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatHistory } from '@/core/entities/seat-history.entity';

import { SeatHistoryCreateController } from '@/modules/manager/seats_shifts_lockers/seat-history/controllers/seat-history-create.controller';
import { SeatHistoryUpdateController } from '@/modules/manager/seats_shifts_lockers/seat-history/controllers/seat-history-update.controller';
import { SeatHistoryDeleteController } from '@/modules/manager/seats_shifts_lockers/seat-history/controllers/seat-history-delete.controller';
import { SeatHistoryGetAllController } from '@/modules/manager/seats_shifts_lockers/seat-history/controllers/seat-history-get-all.controller';
import { SeatHistoryGetController } from '@/modules/manager/seats_shifts_lockers/seat-history/controllers/seat-history-get.controller';

import { SeatHistoryCreateService } from '@/modules/manager/seats_shifts_lockers/seat-history/services/seat-history-create.service';
import { SeatHistoryUpdateService } from '@/modules/manager/seats_shifts_lockers/seat-history/services/seat-history-update.service';
import { SeatHistoryDeleteService } from '@/modules/manager/seats_shifts_lockers/seat-history/services/seat-history-delete.service';
import { SeatHistoryGetAllService } from '@/modules/manager/seats_shifts_lockers/seat-history/services/seat-history-get-all.service';
import { SeatHistoryGetService } from '@/modules/manager/seats_shifts_lockers/seat-history/services/seat-history-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeatHistory])],
  controllers: [
    SeatHistoryCreateController,
    SeatHistoryUpdateController,
    SeatHistoryDeleteController,
    SeatHistoryGetAllController,
    SeatHistoryGetController,
  ],
  providers: [
    SeatHistoryCreateService,
    SeatHistoryUpdateService,
    SeatHistoryDeleteService,
    SeatHistoryGetAllService,
    SeatHistoryGetService,
  ],
  exports: [SeatHistoryGetService],
})
export class ManagerSeatHistoryModule {}
