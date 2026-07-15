import { Module } from '@nestjs/common';
import { AdminSubscriptionsService } from './subscriptions.service';
import { AdminSubscriptionsController } from './subscriptions.controller';

@Module({
  providers: [AdminSubscriptionsService],
  controllers: [AdminSubscriptionsController],
})
export class AdminSubscriptionsModule {}
