import { Module } from '@nestjs/common';
import { SuperadminShiftsService } from './shifts.service';
import { SuperadminShiftsController } from './shifts.controller';

@Module({
  providers: [SuperadminShiftsService],
  controllers: [SuperadminShiftsController]
})
export class SuperadminShiftsModule {}
