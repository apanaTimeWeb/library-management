import { Module } from '@nestjs/common';
import { AdminAttendanceService } from './attendance.service';
import { AdminAttendanceController } from './attendance.controller';

@Module({
  providers: [AdminAttendanceService],
  controllers: [AdminAttendanceController]
})
export class AdminAttendanceModule {}
