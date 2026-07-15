import { Module } from '@nestjs/common';
import { AdminPlansService } from './plans.service';
import { AdminPlansController } from './plans.controller';

@Module({
  providers: [AdminPlansService],
  controllers: [AdminPlansController]
})
export class AdminPlansModule {}
