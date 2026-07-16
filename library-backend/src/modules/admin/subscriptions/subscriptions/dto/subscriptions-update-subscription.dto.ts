import { PartialType } from '@nestjs/mapped-types';
import { SubscriptionsCreateSubscriptionDto } from './create-subscription.dto';

export class SubscriptionsUpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {}
