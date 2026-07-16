import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from '@/core/entities/attendance.entity';

import { CreateAttendanceController } from './controllers/create-attendance.controller';
import { UpdateAttendanceController } from './controllers/update-attendance.controller';
import { DeleteAttendanceController } from './controllers/delete-attendance.controller';
import { GetAllAttendancesController } from './controllers/get-all-attendance.controller';
import { GetAttendanceController } from './controllers/get-attendance.controller';

import { CreateAttendanceService } from './services/create-attendance.service';
import { UpdateAttendanceService } from './services/update-attendance.service';
import { DeleteAttendanceService } from './services/delete-attendance.service';
import { GetAllAttendancesService } from './services/get-all-attendance.service';
import { GetAttendanceService } from './services/get-attendance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  controllers: [
    CreateAttendanceController,
    UpdateAttendanceController,
    DeleteAttendanceController,
    GetAllAttendancesController,
    GetAttendanceController,
  ],
  providers: [
    CreateAttendanceService,
    UpdateAttendanceService,
    DeleteAttendanceService,
    GetAllAttendancesService,
    GetAttendanceService,
  ],
  exports: [GetAttendanceService],
})
export class AdminAttendanceModule {}
