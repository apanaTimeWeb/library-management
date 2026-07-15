import { Module } from '@nestjs/common';
import { ManagerAttendanceService } from './attendance.service';
import { ManagerAttendanceController } from './attendance.controller';

@Module({
  providers: [ManagerAttendanceService],
  controllers: [ManagerAttendanceController],
})
export class ManagerAttendanceModule {}
