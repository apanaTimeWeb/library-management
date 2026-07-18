import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from '@/core/entities/shift.entity';

import { ShiftsCreateShiftController } from './controllers/shifts-create-shift.controller';
import { ShiftsUpdateShiftController } from './controllers/shifts-update-shift.controller';
import { ShiftsDeleteShiftController } from './controllers/shifts-delete-shift.controller';
import { ShiftsGetAllController } from './controllers/shifts-get-all-shifts.controller';
import { ShiftsGetShiftController } from './controllers/shifts-get-shift.controller';

import { ShiftsCreateShiftService } from './services/shifts-create-shift.service';
import { ShiftsUpdateShiftService } from './services/shifts-update-shift.service';
import { ShiftsDeleteShiftService } from './services/shifts-delete-shift.service';
import { ShiftsGetAllService } from './services/shifts-get-all-shifts.service';
import { ShiftsGetShiftService } from './services/shifts-get-shift.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shift])],
  controllers: [ShiftsCreateShiftController, ShiftsUpdateShiftController, ShiftsDeleteShiftController, ShiftsGetAllController, ShiftsGetShiftController, ],
  providers: [ShiftsCreateShiftService, ShiftsUpdateShiftService, ShiftsDeleteShiftService, ShiftsGetAllService, ShiftsGetShiftService, ],
  exports: [ShiftsGetShiftService],
})
export class ShiftsAdminModule {}
