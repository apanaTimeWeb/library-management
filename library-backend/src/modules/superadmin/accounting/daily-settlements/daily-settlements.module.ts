import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailySettlement } from '@/core/entities/daily-settlement.entity';

import { CreateDailySettlementController } from './controllers/create-daily-settlement.controller';
import { UpdateDailySettlementController } from './controllers/update-daily-settlement.controller';
import { DeleteDailySettlementController } from './controllers/delete-daily-settlement.controller';
import { GetAllDailySettlementsController } from './controllers/get-all-daily-settlements.controller';
import { GetDailySettlementController } from './controllers/get-daily-settlement.controller';

import { CreateDailySettlementService } from './services/create-daily-settlement.service';
import { UpdateDailySettlementService } from './services/update-daily-settlement.service';
import { DeleteDailySettlementService } from './services/delete-daily-settlement.service';
import { GetAllDailySettlementsService } from './services/get-all-daily-settlements.service';
import { GetDailySettlementService } from './services/get-daily-settlement.service';

@Module({
  imports: [TypeOrmModule.forFeature([DailySettlement])],
  controllers: [
    CreateDailySettlementController,
    UpdateDailySettlementController,
    DeleteDailySettlementController,
    GetAllDailySettlementsController,
    GetDailySettlementController,
  ],
  providers: [
    CreateDailySettlementService,
    UpdateDailySettlementService,
    DeleteDailySettlementService,
    GetAllDailySettlementsService,
    GetDailySettlementService,
  ],
  exports: [GetDailySettlementService],
})
export class SuperadminDailySettlementsModule {}
