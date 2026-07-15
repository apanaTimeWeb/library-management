import { Module } from '@nestjs/common';
import { SuperadminSystemHealthController } from './system-health.controller';
import { SuperadminSystemHealthService } from './system-health.service';

@Module({
  controllers: [SuperadminSystemHealthController],
  providers: [SuperadminSystemHealthService],
})
export class SuperadminSystemHealthModule {}
