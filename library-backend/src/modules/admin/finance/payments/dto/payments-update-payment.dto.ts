import { PartialType } from '@nestjs/mapped-types';
import { PaymentsCreatePaymentDto } from './payments-create-payment.dto';

export class PaymentsUpdatePaymentDto extends PartialType(PaymentsCreatePaymentDto) {}
