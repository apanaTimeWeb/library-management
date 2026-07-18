import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '@/core/entities/subscription.entity';

import { SubscriptionsCreateSubscriptionController } from './controllers/subscriptions-create-subscription.controller';
import { SubscriptionsUpdateSubscriptionController } from './controllers/subscriptions-update-subscription.controller';
import { SubscriptionsDeleteSubscriptionController } from './controllers/subscriptions-delete-subscription.controller';
import { SubscriptionsGetAllController } from './controllers/subscriptions-get-all-subscriptions.controller';
import { SubscriptionsGetSubscriptionController } from './controllers/subscriptions-get-subscription.controller';

import { SubscriptionsCreateSubscriptionService } from './services/subscriptions-create-subscription.service';
import { SubscriptionsUpdateSubscriptionService } from './services/subscriptions-update-subscription.service';
import { SubscriptionsDeleteSubscriptionService } from './services/subscriptions-delete-subscription.service';
import { SubscriptionsGetAllService } from './services/subscriptions-get-all-subscriptions.service';
import { SubscriptionsGetSubscriptionService } from './services/subscriptions-get-subscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscriptionsCreateSubscriptionController, SubscriptionsUpdateSubscriptionController, SubscriptionsDeleteSubscriptionController, SubscriptionsGetAllController, SubscriptionsGetSubscriptionController, ],
  providers: [SubscriptionsCreateSubscriptionService, SubscriptionsUpdateSubscriptionService, SubscriptionsDeleteSubscriptionService, SubscriptionsGetAllService, SubscriptionsGetSubscriptionService, ],
  exports: [SubscriptionsGetSubscriptionService],
})
export class SubscriptionsAdminModule {}
