import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holiday } from '@/core/entities/holiday.entity';

import { HolidaysCreateController } from '@/modules/manager/settings/holidays/controllers/holidays-create.controller';
import { HolidaysUpdateController } from '@/modules/manager/settings/holidays/controllers/holidays-update.controller';
import { HolidaysDeleteController } from '@/modules/manager/settings/holidays/controllers/holidays-delete.controller';
import { HolidaysGetAllController } from '@/modules/manager/settings/holidays/controllers/holidays-get-all.controller';
import { HolidaysGetController } from '@/modules/manager/settings/holidays/controllers/holidays-get.controller';

import { HolidaysCreateService } from '@/modules/manager/settings/holidays/services/holidays-create.service';
import { HolidaysUpdateService } from '@/modules/manager/settings/holidays/services/holidays-update.service';
import { HolidaysDeleteService } from '@/modules/manager/settings/holidays/services/holidays-delete.service';
import { HolidaysGetAllService } from '@/modules/manager/settings/holidays/services/holidays-get-all.service';
import { HolidaysGetService } from '@/modules/manager/settings/holidays/services/holidays-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Holiday])],
  controllers: [
    HolidaysCreateController,
    HolidaysUpdateController,
    HolidaysDeleteController,
    HolidaysGetAllController,
    HolidaysGetController,
  ],
  providers: [
    HolidaysCreateService,
    HolidaysUpdateService,
    HolidaysDeleteService,
    HolidaysGetAllService,
    HolidaysGetService,
  ],
  exports: [HolidaysGetService],
})
export class ManagerHolidaysModule {}
