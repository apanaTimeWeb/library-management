import { Module } from '@nestjs/common';
import { SuperadminSubscriptionsService } from './subscriptions.service';
import { SuperadminSubscriptionsController } from './subscriptions.controller';

@Module({
  providers: [SuperadminSubscriptionsService],
  controllers: [SuperadminSubscriptionsController]
})
export class SuperadminSubscriptionsModule {}
