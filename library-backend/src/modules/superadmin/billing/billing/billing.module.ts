import { Module } from '@nestjs/common';
import { SuperadminBillingController } from './billing.controller';
import { SuperadminBillingService } from './billing.service';

@Module({
  controllers: [SuperadminBillingController],
  providers: [SuperadminBillingService],
})
export class SuperadminBillingModule {}
