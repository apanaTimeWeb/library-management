import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from '@/core/entities/shift.entity';

import { CreateShiftController } from './controllers/create-shift.controller';
import { UpdateShiftController } from './controllers/update-shift.controller';
import { DeleteShiftController } from './controllers/delete-shift.controller';
import { GetAllShiftsController } from './controllers/get-all-shifts.controller';
import { GetShiftController } from './controllers/get-shift.controller';

import { CreateShiftService } from './services/create-shift.service';
import { UpdateShiftService } from './services/update-shift.service';
import { DeleteShiftService } from './services/delete-shift.service';
import { GetAllShiftsService } from './services/get-all-shifts.service';
import { GetShiftService } from './services/get-shift.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shift])],
  controllers: [
    CreateShiftController,
    UpdateShiftController,
    DeleteShiftController,
    GetAllShiftsController,
    GetShiftController,
  ],
  providers: [
    CreateShiftService,
    UpdateShiftService,
    DeleteShiftService,
    GetAllShiftsService,
    GetShiftService,
  ],
  exports: [GetShiftService],
})
export class AdminShiftsModule {}
