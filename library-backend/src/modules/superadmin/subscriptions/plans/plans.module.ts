import { Module } from '@nestjs/common';
import { SuperadminPlansService } from './plans.service';
import { SuperadminPlansController } from './plans.controller';

@Module({
  providers: [SuperadminPlansService],
  controllers: [SuperadminPlansController],
})
export class SuperadminPlansModule {}
