import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from '@/core/entities/attendance.entity';

import { AttendanceCreateController } from './controllers/attendance-create-attendance.controller';
import { AttendanceUpdateController } from './controllers/attendance-update-attendance.controller';
import { AttendanceDeleteController } from './controllers/attendance-delete-attendance.controller';
import { AttendanceGetAllAttendancesController } from './controllers/attendance-get-all-attendance.controller';
import { AttendanceGetController } from './controllers/attendance-get-attendance.controller';

import { AttendanceCreateService } from './services/attendance-create-attendance.service';
import { AttendanceUpdateService } from './services/attendance-update-attendance.service';
import { AttendanceDeleteService } from './services/attendance-delete-attendance.service';
import { AttendanceGetAllAttendancesService } from './services/attendance-get-all-attendance.service';
import { AttendanceGetService } from './services/attendance-get-attendance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  controllers: [AttendanceCreateController, AttendanceUpdateController, AttendanceDeleteController, AttendanceGetAllAttendancesController, AttendanceGetController, ],
  providers: [AttendanceCreateService, AttendanceUpdateService, AttendanceDeleteService, AttendanceGetAllAttendancesService, AttendanceGetService, ],
  exports: [AttendanceGetService],
})
export class AttendanceAdminModule {}
