import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '@/core/entities/subscription.entity';

import { SubscriptionsCreateSubscriptionController } from './controllers/create-subscription.controller';
import { SubscriptionsUpdateSubscriptionController } from './controllers/update-subscription.controller';
import { SubscriptionsDeleteSubscriptionController } from './controllers/delete-subscription.controller';
import { SubscriptionsGetAllController } from './controllers/get-all-subscriptions.controller';
import { SubscriptionsGetSubscriptionController } from './controllers/get-subscription.controller';

import { SubscriptionsCreateSubscriptionService } from './services/create-subscription.service';
import { SubscriptionsUpdateSubscriptionService } from './services/update-subscription.service';
import { SubscriptionsDeleteSubscriptionService } from './services/delete-subscription.service';
import { SubscriptionsGetAllService } from './services/get-all-subscriptions.service';
import { SubscriptionsGetSubscriptionService } from './services/get-subscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscriptionsCreateSubscriptionController, SubscriptionsUpdateSubscriptionController, SubscriptionsDeleteSubscriptionController, SubscriptionsGetAllController, SubscriptionsGetSubscriptionController, ],
  providers: [SubscriptionsCreateSubscriptionService, SubscriptionsUpdateSubscriptionService, SubscriptionsDeleteSubscriptionService, SubscriptionsGetAllService, SubscriptionsGetSubscriptionService, ],
  exports: [SubscriptionsGetSubscriptionService],
})
export class SubscriptionsAdminModule {}
