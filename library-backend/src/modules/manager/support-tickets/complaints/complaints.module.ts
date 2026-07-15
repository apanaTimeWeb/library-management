import { Module } from '@nestjs/common';
import { ManagerComplaintsService } from './complaints.service';
import { ManagerComplaintsController } from './complaints.controller';

@Module({
  providers: [ManagerComplaintsService],
  controllers: [ManagerComplaintsController],
})
export class ManagerComplaintsModule {}
