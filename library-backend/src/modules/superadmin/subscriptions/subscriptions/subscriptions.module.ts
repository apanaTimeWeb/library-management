import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '@/core/entities/subscription.entity';

import { CreateSubscriptionController } from './controllers/create-subscription.controller';
import { UpdateSubscriptionController } from './controllers/update-subscription.controller';
import { DeleteSubscriptionController } from './controllers/delete-subscription.controller';
import { GetAllSubscriptionsController } from './controllers/get-all-subscriptions.controller';
import { GetSubscriptionController } from './controllers/get-subscription.controller';

import { CreateSubscriptionService } from './services/create-subscription.service';
import { UpdateSubscriptionService } from './services/update-subscription.service';
import { DeleteSubscriptionService } from './services/delete-subscription.service';
import { GetAllSubscriptionsService } from './services/get-all-subscriptions.service';
import { GetSubscriptionService } from './services/get-subscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  controllers: [
    CreateSubscriptionController,
    UpdateSubscriptionController,
    DeleteSubscriptionController,
    GetAllSubscriptionsController,
    GetSubscriptionController,
  ],
  providers: [
    CreateSubscriptionService,
    UpdateSubscriptionService,
    DeleteSubscriptionService,
    GetAllSubscriptionsService,
    GetSubscriptionService,
  ],
  exports: [GetSubscriptionService],
})
export class SuperadminSubscriptionsModule {}
