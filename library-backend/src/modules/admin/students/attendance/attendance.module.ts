import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from '@/core/entities/attendance.entity';

import { AttendanceCreateController } from './controllers/create-attendance.controller';
import { AttendanceUpdateController } from './controllers/update-attendance.controller';
import { AttendanceDeleteController } from './controllers/delete-attendance.controller';
import { AttendanceGetAllAttendancesController } from './controllers/get-all-attendance.controller';
import { AttendanceGetController } from './controllers/get-attendance.controller';

import { AttendanceCreateService } from './services/create-attendance.service';
import { AttendanceUpdateService } from './services/update-attendance.service';
import { AttendanceDeleteService } from './services/delete-attendance.service';
import { AttendanceGetAllAttendancesService } from './services/get-all-attendance.service';
import { AttendanceGetService } from './services/get-attendance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  controllers: [AttendanceCreateController, AttendanceUpdateController, AttendanceDeleteController, AttendanceGetAllAttendancesController, AttendanceGetController, ],
  providers: [AttendanceCreateService, AttendanceUpdateService, AttendanceDeleteService, AttendanceGetAllAttendancesService, AttendanceGetService, ],
  exports: [AttendanceGetService],
})
export class AttendanceAdminModule {}
