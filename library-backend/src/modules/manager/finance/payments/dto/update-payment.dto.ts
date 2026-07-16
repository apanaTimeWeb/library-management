import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from '@/modules/manager/finance/payments/dto/create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
