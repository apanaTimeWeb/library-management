import { Module } from '@nestjs/common';
import { SuperadminPaymentsService } from './payments.service';
import { SuperadminPaymentsController } from './payments.controller';

@Module({
  providers: [SuperadminPaymentsService],
  controllers: [SuperadminPaymentsController],
})
export class SuperadminPaymentsModule {}
