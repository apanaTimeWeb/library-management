import { PartialType } from '@nestjs/mapped-types';
import { PaymentsCreatePaymentDto } from './create-payment.dto';

export class PaymentsUpdatePaymentDto extends PartialType(CreatePaymentDto) {}
