import { Module } from '@nestjs/common';
import { ManagerSeatsService } from './seats.service';
import { ManagerSeatsController } from './seats.controller';

@Module({
  providers: [ManagerSeatsService],
  controllers: [ManagerSeatsController]
})
export class ManagerSeatsModule {}
