import { PartialType } from '@nestjs/mapped-types';
import { SubscriptionsCreateSubscriptionDto } from './subscriptions-create-subscription.dto';

export class SubscriptionsUpdateSubscriptionDto extends PartialType(SubscriptionsCreateSubscriptionDto) {}
