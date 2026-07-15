import { Module } from '@nestjs/common';
import { SuperadminComplaintsService } from './complaints.service';
import { SuperadminComplaintsController } from './complaints.controller';

@Module({
  providers: [SuperadminComplaintsService],
  controllers: [SuperadminComplaintsController]
})
export class SuperadminComplaintsModule {}
