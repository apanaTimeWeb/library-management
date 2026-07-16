import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from '@/core/entities/attendance.entity';

import { AttendanceCreateController } from '@/modules/manager/students/attendance/controllers/attendance-create.controller';
import { AttendanceUpdateController } from '@/modules/manager/students/attendance/controllers/attendance-update.controller';
import { AttendanceDeleteController } from '@/modules/manager/students/attendance/controllers/attendance-delete.controller';
import { AttendanceGetAllController } from '@/modules/manager/students/attendance/controllers/attendance-get-all.controller';
import { AttendanceGetController } from '@/modules/manager/students/attendance/controllers/attendance-get.controller';

import { AttendanceCreateService } from '@/modules/manager/students/attendance/services/attendance-create.service';
import { AttendanceUpdateService } from '@/modules/manager/students/attendance/services/attendance-update.service';
import { AttendanceDeleteService } from '@/modules/manager/students/attendance/services/attendance-delete.service';
import { AttendanceGetAllService } from '@/modules/manager/students/attendance/services/attendance-get-all.service';
import { AttendanceGetService } from '@/modules/manager/students/attendance/services/attendance-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  controllers: [
    AttendanceCreateController,
    AttendanceUpdateController,
    AttendanceDeleteController,
    AttendanceGetAllController,
    AttendanceGetController,
  ],
  providers: [
    AttendanceCreateService,
    AttendanceUpdateService,
    AttendanceDeleteService,
    AttendanceGetAllService,
    AttendanceGetService,
  ],
  exports: [AttendanceGetService],
})
export class ManagerAttendanceModule {}
