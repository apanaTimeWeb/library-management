import { Module } from '@nestjs/common';
import { AdminSeatsService } from './seats.service';
import { AdminSeatsController } from './seats.controller';

@Module({
  providers: [AdminSeatsService],
  controllers: [AdminSeatsController],
})
export class AdminSeatsModule {}
