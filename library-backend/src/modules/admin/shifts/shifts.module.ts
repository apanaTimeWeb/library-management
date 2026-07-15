import { Module } from '@nestjs/common';
import { AdminShiftsService } from './shifts.service';
import { AdminShiftsController } from './shifts.controller';

@Module({
  providers: [AdminShiftsService],
  controllers: [AdminShiftsController]
})
export class AdminShiftsModule {}
