import { Module } from '@nestjs/common';
import { AdminComplaintsService } from './complaints.service';
import { AdminComplaintsController } from './complaints.controller';

@Module({
  providers: [AdminComplaintsService],
  controllers: [AdminComplaintsController],
})
export class AdminComplaintsModule {}
