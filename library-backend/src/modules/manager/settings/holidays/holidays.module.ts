import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holiday } from '@/core/entities/holiday.entity';

import { CreateHolidayController } from './controllers/create-holiday.controller';
import { UpdateHolidayController } from './controllers/update-holiday.controller';
import { DeleteHolidayController } from './controllers/delete-holiday.controller';
import { GetAllHolidaiesController } from './controllers/get-all-holidays.controller';
import { GetHolidayController } from './controllers/get-holiday.controller';

import { CreateHolidayService } from './services/create-holiday.service';
import { UpdateHolidayService } from './services/update-holiday.service';
import { DeleteHolidayService } from './services/delete-holiday.service';
import { GetAllHolidaiesService } from './services/get-all-holidays.service';
import { GetHolidayService } from './services/get-holiday.service';

@Module({
  imports: [TypeOrmModule.forFeature([Holiday])],
  controllers: [
    CreateHolidayController,
    UpdateHolidayController,
    DeleteHolidayController,
    GetAllHolidaiesController,
    GetHolidayController,
  ],
  providers: [
    CreateHolidayService,
    UpdateHolidayService,
    DeleteHolidayService,
    GetAllHolidaiesService,
    GetHolidayService,
  ],
  exports: [GetHolidayService],
})
export class ManagerHolidaysModule {}
