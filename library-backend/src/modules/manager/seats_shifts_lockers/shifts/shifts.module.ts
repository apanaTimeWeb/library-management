import { Module } from '@nestjs/common';
import { ManagerShiftsService } from './shifts.service';
import { ManagerShiftsController } from './shifts.controller';

@Module({
  providers: [ManagerShiftsService],
  controllers: [ManagerShiftsController],
})
export class ManagerShiftsModule {}
