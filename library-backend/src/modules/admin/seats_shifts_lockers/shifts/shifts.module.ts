import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from '@/core/entities/shift.entity';

import { ShiftsCreateShiftController } from './controllers/create-shift.controller';
import { ShiftsUpdateShiftController } from './controllers/update-shift.controller';
import { ShiftsDeleteShiftController } from './controllers/delete-shift.controller';
import { ShiftsGetAllController } from './controllers/get-all-shifts.controller';
import { ShiftsGetShiftController } from './controllers/get-shift.controller';

import { ShiftsCreateShiftService } from './services/create-shift.service';
import { ShiftsUpdateShiftService } from './services/update-shift.service';
import { ShiftsDeleteShiftService } from './services/delete-shift.service';
import { ShiftsGetAllService } from './services/get-all-shifts.service';
import { ShiftsGetShiftService } from './services/get-shift.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shift])],
  controllers: [ShiftsCreateShiftController, ShiftsUpdateShiftController, ShiftsDeleteShiftController, ShiftsGetAllController, ShiftsGetShiftController, ],
  providers: [ShiftsCreateShiftService, ShiftsUpdateShiftService, ShiftsDeleteShiftService, ShiftsGetAllService, ShiftsGetShiftService, ],
  exports: [ShiftsGetShiftService],
})
export class ShiftsAdminModule {}
