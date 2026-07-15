import { Module } from '@nestjs/common';
import { SuperadminSeatsService } from './seats.service';
import { SuperadminSeatsController } from './seats.controller';

@Module({
  providers: [SuperadminSeatsService],
  controllers: [SuperadminSeatsController],
})
export class SuperadminSeatsModule {}
